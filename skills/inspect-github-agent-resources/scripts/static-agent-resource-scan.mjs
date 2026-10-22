import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { TextDecoder } from 'node:util';

const SCHEMA_VERSION = 'github-agent-resource-static-scan-v1';
const DEFAULT_LIMITS = Object.freeze({
  maxFiles: 500,
  maxTotalReadBytes: 32 * 1024 * 1024,
  maxHashFileBytes: 16 * 1024 * 1024,
  maxTextFileBytes: 2 * 1024 * 1024,
  maxFindings: 1000,
});
const HARD_LIMITS = Object.freeze({
  maxFiles: 5000,
  maxTotalReadBytes: 256 * 1024 * 1024,
  maxHashFileBytes: 64 * 1024 * 1024,
  maxTextFileBytes: 16 * 1024 * 1024,
  maxFindings: 5000,
});
const IGNORED_DIRECTORIES = new Set(['.git', 'node_modules', '.venv', '__pycache__']);
const LIFECYCLE_HOOKS = new Set([
  'preinstall', 'install', 'postinstall', 'prepublish', 'prepublishOnly',
  'prepare', 'prepack', 'postpack',
]);
const EXECUTABLE_EXTENSIONS = new Set([
  '.bat', '.cjs', '.cmd', '.exe', '.js', '.mjs', '.node', '.ps1', '.py',
  '.rb', '.sh', '.so', '.ts', '.wasm',
]);
const MANIFEST_NAMES = new Map([
  ['package.json', 'node-package'],
  ['package-lock.json', 'node-lock'],
  ['npm-shrinkwrap.json', 'node-lock'],
  ['pnpm-lock.yaml', 'node-lock'],
  ['yarn.lock', 'node-lock'],
  ['binding.gyp', 'native-build'],
  ['pyproject.toml', 'python-package'],
  ['setup.py', 'python-setup'],
  ['setup.cfg', 'python-setup'],
  ['requirements.txt', 'python-requirements'],
  ['pipfile', 'python-package'],
  ['pipfile.lock', 'python-lock'],
  ['poetry.lock', 'python-lock'],
  ['uv.lock', 'python-lock'],
  ['cargo.toml', 'rust-package'],
  ['cargo.lock', 'rust-lock'],
  ['go.mod', 'go-package'],
  ['go.sum', 'go-lock'],
  ['gemfile', 'ruby-package'],
  ['gemfile.lock', 'ruby-lock'],
  ['composer.json', 'php-package'],
  ['composer.lock', 'php-lock'],
  ['pom.xml', 'java-package'],
  ['build.gradle', 'java-build'],
  ['build.gradle.kts', 'java-build'],
  ['makefile', 'build'],
  ['cmakelists.txt', 'native-build'],
  ['dockerfile', 'container-build'],
  ['docker-compose.yml', 'container-build'],
  ['docker-compose.yaml', 'container-build'],
  ['.gitmodules', 'git-submodules'],
  ['.gitattributes', 'git-attributes'],
  ['.pre-commit-config.yaml', 'git-hook'],
  ['lefthook.yml', 'git-hook'],
  ['lefthook.yaml', 'git-hook'],
  ['plugin.json', 'plugin-manifest'],
  ['mcp.json', 'mcp-manifest'],
]);

class ScanError extends Error {
  constructor(message, exitCode = 2) {
    super(message);
    this.name = 'ScanError';
    this.exitCode = exitCode;
  }
}

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function toPosix(value) {
  return value.split(path.sep).join('/');
}

function compareText(left, right) {
  return left < right ? -1 : left > right ? 1 : 0;
}

function isDangerousFormatCodePoint(codePoint, index = 1) {
  if (codePoint === 0x061c || codePoint === 0x200e || codePoint === 0x200f) return true;
  if (codePoint >= 0x202a && codePoint <= 0x202e) return true;
  if (codePoint >= 0x2066 && codePoint <= 0x2069) return true;
  if ([0x00ad, 0x034f, 0x180e, 0x200b, 0x200c, 0x200d, 0x2060, 0x2061, 0x2062, 0x2063, 0x2064].includes(codePoint)) return true;
  if (codePoint === 0xfeff && index !== 0) return true;
  if (codePoint >= 0xfe00 && codePoint <= 0xfe0f) return true;
  if (codePoint >= 0xe0100 && codePoint <= 0xe01ef) return true;
  if (codePoint === 0xe0001 || (codePoint >= 0xe0020 && codePoint <= 0xe007f)) return true;
  if ((codePoint >= 0 && codePoint <= 0x08) || (codePoint >= 0x0b && codePoint <= 0x0c) || (codePoint >= 0x0e && codePoint <= 0x1f) || (codePoint >= 0x7f && codePoint <= 0x9f)) return true;
  return false;
}

function escapeDangerousText(value) {
  let output = '';
  let index = 0;
  for (const character of value) {
    const codePoint = character.codePointAt(0);
    output += isDangerousFormatCodePoint(codePoint, index)
      ? `\\u{${codePoint.toString(16).toUpperCase().padStart(4, '0')}}`
      : character;
    index += character.length;
  }
  return output;
}

function safeRelativePath(root, target) {
  return escapeDangerousText(toPosix(path.relative(root, target)) || '.');
}

function parsePositiveInteger(raw, label, ceiling) {
  if (!/^\d+$/.test(String(raw))) throw new ScanError(`${label} must be a positive integer.`);
  const value = Number(raw);
  if (!Number.isSafeInteger(value) || value < 1 || value > ceiling) {
    throw new ScanError(`${label} must be between 1 and ${ceiling}.`);
  }
  return value;
}

function parseArgs(argv) {
  const options = { root: null, pretty: false, ...DEFAULT_LIMITS };
  const mapping = new Map([
    ['--max-files', ['maxFiles', HARD_LIMITS.maxFiles]],
    ['--max-total-read-bytes', ['maxTotalReadBytes', HARD_LIMITS.maxTotalReadBytes]],
    ['--max-hash-file-bytes', ['maxHashFileBytes', HARD_LIMITS.maxHashFileBytes]],
    ['--max-text-file-bytes', ['maxTextFileBytes', HARD_LIMITS.maxTextFileBytes]],
    ['--max-findings', ['maxFindings', HARD_LIMITS.maxFindings]],
  ]);
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === '--root') {
      if (!argv[index + 1]) throw new ScanError('--root requires a directory path.');
      options.root = argv[index + 1];
      index += 1;
    } else if (argument === '--pretty') {
      options.pretty = true;
    } else if (mapping.has(argument)) {
      if (!argv[index + 1]) throw new ScanError(`${argument} requires a value.`);
      const [key, ceiling] = mapping.get(argument);
      options[key] = parsePositiveInteger(argv[index + 1], argument, ceiling);
      index += 1;
    } else {
      throw new ScanError('Unknown argument. Use the documented options.');
    }
  }
  if (!options.root) throw new ScanError('--root is required.');
  if (options.maxTextFileBytes > options.maxHashFileBytes) {
    throw new ScanError('--max-text-file-bytes cannot exceed --max-hash-file-bytes.');
  }
  return options;
}

function unicodeCategory(codePoint, index) {
  if (codePoint === 0x061c || codePoint === 0x200e || codePoint === 0x200f || (codePoint >= 0x202a && codePoint <= 0x202e) || (codePoint >= 0x2066 && codePoint <= 0x2069)) return 'unicode.bidi-control';
  if ([0x00ad, 0x034f, 0x180e, 0x200b, 0x200c, 0x200d, 0x2060, 0x2061, 0x2062, 0x2063, 0x2064].includes(codePoint) || (codePoint === 0xfeff && index !== 0)) return 'unicode.zero-width-format';
  if ((codePoint >= 0xfe00 && codePoint <= 0xfe0f) || (codePoint >= 0xe0100 && codePoint <= 0xe01ef)) return 'unicode.variation-selector';
  if (codePoint === 0xe0001 || (codePoint >= 0xe0020 && codePoint <= 0xe007f)) return 'unicode.tag';
  if ((codePoint >= 0 && codePoint <= 0x08) || (codePoint >= 0x0b && codePoint <= 0x0c) || (codePoint >= 0x0e && codePoint <= 0x1f) || (codePoint >= 0x7f && codePoint <= 0x9f)) return 'unicode.control';
  return null;
}

function collectUnicodeFindings(text, filePath) {
  const categories = new Map();
  let line = 1;
  let column = 1;
  let byteOffset = 0;
  let codeUnitIndex = 0;
  for (const character of text) {
    const codePoint = character.codePointAt(0);
    const category = unicodeCategory(codePoint, codeUnitIndex);
    if (category) {
      if (!categories.has(category)) categories.set(category, { count: 0, samples: [] });
      const record = categories.get(category);
      record.count += 1;
      if (record.samples.length < 32) {
        record.samples.push({
          codePoint: `U+${codePoint.toString(16).toUpperCase().padStart(4, '0')}`,
          line,
          column,
          byteOffset,
        });
      }
    }
    byteOffset += Buffer.byteLength(character, 'utf8');
    if (character === '\n') {
      line += 1;
      column = 1;
    } else {
      column += 1;
    }
    codeUnitIndex += character.length;
  }
  return [...categories.entries()].map(([type, record]) => ({
    type,
    path: filePath,
    count: record.count,
    samples: record.samples,
    samplesTruncated: record.count > record.samples.length,
  }));
}

function classifyBuffer(buffer, relativePath) {
  const first = buffer.subarray(0, 8);
  const extension = path.extname(relativePath).toLowerCase();
  if (first.length >= 2 && first[0] === 0x4d && first[1] === 0x5a) return { contentKind: 'native-binary', basis: 'pe-coff-magic' };
  if (first.length >= 4 && first[0] === 0x7f && first[1] === 0x45 && first[2] === 0x4c && first[3] === 0x46) return { contentKind: 'native-binary', basis: 'elf-magic' };
  if (first.length >= 4 && ['feedface', 'feedfacf', 'cefaedfe', 'cffaedfe', 'cafebabe'].includes(first.subarray(0, 4).toString('hex'))) return { contentKind: 'native-binary', basis: 'mach-o-or-java-magic' };
  if (first.length >= 4 && first.subarray(0, 4).toString('hex') === '0061736d') return { contentKind: 'native-binary', basis: 'wasm-magic' };
  if (first.length >= 4 && ['504b0304', '504b0506', '504b0708', '377abcaf', '52617221'].some((magic) => first.toString('hex').startsWith(magic))) return { contentKind: 'archive', basis: 'archive-magic' };
  if (first.length >= 3 && first.subarray(0, 3).toString('hex') === '1f8b08') return { contentKind: 'archive', basis: 'gzip-magic' };
  if (['.exe', '.dll', '.so', '.dylib', '.node', '.wasm'].includes(extension)) return { contentKind: 'native-binary', basis: 'executable-extension' };
  if (buffer.includes(0)) return { contentKind: 'generic-binary', basis: 'nul-byte' };
  try {
    new TextDecoder('utf-8', { fatal: true }).decode(buffer);
    return { contentKind: 'text', basis: 'strict-utf8' };
  } catch {
    return { contentKind: 'generic-binary', basis: 'invalid-utf8' };
  }
}

function manifestType(relativePath) {
  const normalized = toPosix(relativePath).toLowerCase();
  const base = path.basename(normalized);
  if (MANIFEST_NAMES.has(base)) return MANIFEST_NAMES.get(base);
  if (normalized.startsWith('.github/workflows/')) return 'github-workflow';
  if (normalized.startsWith('.husky/')) return 'git-hook';
  if (normalized.startsWith('.devcontainer/')) return 'devcontainer';
  if (/^(install|setup|bootstrap)(\.|$)/i.test(base)) return 'installer';
  return null;
}

function pathReferenceClassification(rawDestination, sourceRelative) {
  let destination = rawDestination.trim().replace(/^<|>$/g, '');
  try {
    destination = decodeURIComponent(destination);
  } catch {
    return 'invalid-percent-encoding';
  }
  if (/^(https?|mailto):/i.test(destination)) return 'external-reference';
  if (/^[a-z]:[\\/]/i.test(destination)) return 'windows-absolute';
  if (/^[a-z][a-z0-9+.-]*:/i.test(destination)) return 'active-or-unknown-scheme';
  if (/^\\\\/.test(destination)) return 'unc-absolute';
  if (/^\//.test(destination)) return 'posix-absolute';
  const withoutFragment = destination.split('#', 1)[0].split('?', 1)[0];
  if (!withoutFragment) return 'fragment-only';
  const base = path.posix.dirname(toPosix(sourceRelative));
  const resolved = path.posix.normalize(path.posix.join(base, withoutFragment.replace(/\\/g, '/')));
  if (resolved === '..' || resolved.startsWith('../')) return 'relative-escape';
  return 'local-reference';
}

function* collectMarkdownReferenceFindings(text, relativePath) {
  const patterns = [
    /!?\[[^\]]*\]\(([^)\s]+)(?:\s+['"][^'"]*['"])?\)/g,
    /^[ \t]*\[[^\]]+\]:[ \t]*(\S+)/gm,
    /<(\.{0,2}[\\/][^>]+|[a-zA-Z]:[\\/][^>]+|\\\\[^>]+)>/g,
  ];
  for (const pattern of patterns) {
    let cursor = 0;
    let line = 1;
    for (const match of text.matchAll(pattern)) {
      const destination = match[1];
      const classification = pathReferenceClassification(destination, relativePath);
      if (['local-reference', 'fragment-only', 'external-reference'].includes(classification)) continue;
      const index = match.index ?? 0;
      while (cursor < index) {
        if (text.charCodeAt(cursor) === 10) line += 1;
        cursor += 1;
      }
      yield {
        type: 'reference.path-review',
        path: relativePath,
        line,
        classification,
        destinationLength: destination.length,
        destinationSha256: sha256(destination),
      };
    }
  }
}

function collectHtmlCommentFinding(text, relativePath) {
  let count = 0;
  let cursor = 0;
  let line = 1;
  const lines = [];
  for (const match of text.matchAll(/<!--[\s\S]*?-->/g)) {
    count += 1;
    if (lines.length >= 32) continue;
    while (cursor < match.index) {
      if (text.charCodeAt(cursor) === 10) line += 1;
      cursor += 1;
    }
    lines.push(line);
  }
  if (count === 0) return [];
  return [{
    type: 'text.html-comment',
    path: relativePath,
    count,
    lines,
    samplesTruncated: count > lines.length,
  }];
}

function analyzePackageJson(text, relativePath) {
  const findings = [];
  try {
    const parsed = JSON.parse(text);
    const scripts = parsed && typeof parsed.scripts === 'object' && parsed.scripts ? parsed.scripts : {};
    for (const hook of [...LIFECYCLE_HOOKS].sort()) {
      if (typeof scripts[hook] !== 'string') continue;
      findings.push({
        type: 'manifest.lifecycle-hook',
        path: relativePath,
        hook,
        valueLength: scripts[hook].length,
        valueSha256: sha256(scripts[hook]),
      });
    }
    if (parsed && parsed.bin) findings.push({ type: 'manifest.binary-entrypoint', path: relativePath });
    if (parsed && parsed.gypfile === true) findings.push({ type: 'manifest.native-build', path: relativePath, indicator: 'gypfile' });
    const scriptValues = Object.values(scripts).filter((value) => typeof value === 'string').join('\n').toLowerCase();
    for (const token of ['node-gyp', 'prebuild-install', 'cmake-js']) {
      if (scriptValues.includes(token)) findings.push({ type: 'manifest.native-build', path: relativePath, indicator: token });
    }
  } catch {
    findings.push({ type: 'manifest.parse-error', path: relativePath, manifest: 'package.json' });
  }
  return findings;
}

function changedDuringRead(before, openedBefore, openedAfter, after) {
  return before.size !== openedBefore.size
    || openedBefore.size !== openedAfter.size
    || openedAfter.size !== after.size
    || openedBefore.mtimeMs !== openedAfter.mtimeMs
    || before.mtimeMs !== after.mtimeMs;
}

export function scanRoot(rootInput, requestedLimits = {}) {
  const root = path.resolve(rootInput);
  const limits = Object.fromEntries(
    Object.keys(DEFAULT_LIMITS).map((key) => [key, parsePositiveInteger(requestedLimits[key] ?? DEFAULT_LIMITS[key], key, HARD_LIMITS[key])]),
  );
  if (limits.maxTextFileBytes > limits.maxHashFileBytes) {
    throw new ScanError('maxTextFileBytes cannot exceed maxHashFileBytes.');
  }
  let rootStats;
  try {
    rootStats = fs.lstatSync(root);
  } catch {
    throw new ScanError('Root cannot be read.', 2);
  }
  if (rootStats.isSymbolicLink()) throw new ScanError('Root must not be a symbolic link or junction.', 2);
  if (!rootStats.isDirectory()) throw new ScanError('Root must be a directory.', 2);

  const findings = [];
  const manifests = [];
  const executionSurfaces = [];
  const files = [];
  const fingerprints = [];
  const coverage = {
    entriesSeen: 0,
    regularFiles: 0,
    filesHashed: 0,
    filesTextScanned: 0,
    bytesRead: 0,
    unhashedFiles: 0,
    unscannedTextCandidates: 0,
    findingsTruncated: false,
    stopReasons: [],
    ignoredDirectories: [],
  };
  let stopped = false;

  function pushFinding(finding) {
    if (stopped) return;
    findings.push(finding);
    if (findings.length >= limits.maxFindings) {
      coverage.findingsTruncated = true;
      if (!coverage.stopReasons.includes('max-findings')) coverage.stopReasons.push('max-findings');
      stopped = true;
    }
  }

  function processPath(target) {
    if (stopped) return;
    let stats;
    try {
      stats = fs.lstatSync(target);
    } catch {
      coverage.stopReasons.push(`lstat-error:${safeRelativePath(root, target)}`);
      stopped = true;
      return;
    }
    coverage.entriesSeen += 1;
    const relativeRaw = toPosix(path.relative(root, target));
    const relativeSafe = escapeDangerousText(relativeRaw);
    for (const finding of collectUnicodeFindings(relativeRaw, relativeSafe).map((item) => ({ ...item, type: `path.${item.type}` }))) pushFinding(finding);
    if (stopped) return;

    if (stats.isSymbolicLink()) {
      let targetText = '';
      try {
        targetText = fs.readlinkSync(target);
      } catch {
        coverage.stopReasons.push(`readlink-error:${relativeSafe}`);
        pushFinding({ type: 'filesystem.symlink-unreadable', path: relativeSafe });
        return;
      }
      const absoluteLink = path.isAbsolute(targetText);
      const lexicallyResolved = absoluteLink ? path.resolve(targetText) : path.resolve(path.dirname(target), targetText);
      const linkRelative = path.relative(root, lexicallyResolved);
      pushFinding({
        type: 'filesystem.symlink',
        path: relativeSafe,
        targetKind: absoluteLink ? 'absolute' : 'relative',
        targetEscapesRoot: linkRelative === '..' || linkRelative.startsWith(`..${path.sep}`) || path.isAbsolute(linkRelative),
        targetLength: targetText.length,
        targetSha256: sha256(targetText),
      });
      fingerprints.push(`symlink\0${relativeRaw}\0${targetText.length}\0${sha256(targetText)}`);
      return;
    }

    if (stats.isDirectory()) {
      const base = path.basename(target);
      if (IGNORED_DIRECTORIES.has(base)) {
        coverage.ignoredDirectories.push(relativeSafe);
        return;
      }
      let entries;
      try {
        entries = fs.readdirSync(target, { withFileTypes: true }).sort((left, right) => compareText(left.name, right.name));
      } catch {
        coverage.stopReasons.push(`readdir-error:${relativeSafe}`);
        stopped = true;
        return;
      }
      for (const entry of entries) {
        if (stopped) break;
        processPath(path.join(target, entry.name));
      }
      return;
    }

    if (!stats.isFile()) {
      coverage.stopReasons.push(`unsupported-entry:${relativeSafe}`);
      pushFinding({ type: 'filesystem.unsupported-entry', path: relativeSafe });
      return;
    }

    coverage.regularFiles += 1;
    if (coverage.regularFiles > limits.maxFiles) {
      coverage.stopReasons.push('max-files');
      stopped = true;
      return;
    }
    if (stats.size > limits.maxHashFileBytes) {
      coverage.unhashedFiles += 1;
      files.push({ path: relativeSafe, byteSize: stats.size, sha256: null, hashStatus: 'skipped:file-size-limit', contentKind: 'unknown', detectionBasis: 'not-read' });
      return;
    }
    if (coverage.bytesRead + stats.size > limits.maxTotalReadBytes) {
      coverage.stopReasons.push('max-total-read-bytes');
      stopped = true;
      return;
    }

    let descriptor;
    let buffer;
    try {
      descriptor = fs.openSync(target, 'r');
      const openedBefore = fs.fstatSync(descriptor);
      buffer = fs.readFileSync(descriptor);
      const openedAfter = fs.fstatSync(descriptor);
      fs.closeSync(descriptor);
      descriptor = undefined;
      const after = fs.lstatSync(target);
      if (changedDuringRead(stats, openedBefore, openedAfter, after)) {
        coverage.stopReasons.push(`scan-time-mutation:${relativeSafe}`);
        pushFinding({ type: 'filesystem.scan-time-mutation', path: relativeSafe });
        return;
      }
    } catch {
      if (descriptor !== undefined) {
        try { fs.closeSync(descriptor); } catch { /* preserve original read failure */ }
      }
      coverage.stopReasons.push(`read-error:${relativeSafe}`);
      return;
    }

    coverage.bytesRead += buffer.length;
    coverage.filesHashed += 1;
    const digest = sha256(buffer);
    const classification = classifyBuffer(buffer, relativeRaw);
    files.push({ path: relativeSafe, byteSize: buffer.length, sha256: digest, hashStatus: 'complete', contentKind: classification.contentKind, detectionBasis: classification.basis });
    fingerprints.push(`file\0${relativeRaw}\0${buffer.length}\0${digest}`);

    const manifest = manifestType(relativeRaw);
    if (manifest) manifests.push({ path: relativeSafe, kind: manifest });
    if (EXECUTABLE_EXTENSIONS.has(path.extname(relativeRaw).toLowerCase()) || ['github-workflow', 'git-hook', 'installer', 'container-build', 'native-build'].includes(manifest)) {
      executionSurfaces.push({ path: relativeSafe, kind: manifest || 'executable-extension' });
    }
    if (classification.contentKind === 'native-binary' || classification.contentKind === 'archive') {
      pushFinding({ type: `content.${classification.contentKind}`, path: relativeSafe, basis: classification.basis });
    }
    if (stopped) return;
    if (classification.contentKind !== 'text') return;
    if (buffer.length > limits.maxTextFileBytes) {
      coverage.unscannedTextCandidates += 1;
      return;
    }

    // Preserve the first BOM so offsets remain relative to the original bytes
    // and any subsequent BOM is inspected as an embedded format character.
    const text = new TextDecoder('utf-8', { fatal: true, ignoreBOM: true }).decode(buffer);
    coverage.filesTextScanned += 1;
    for (const finding of collectUnicodeFindings(text, relativeSafe)) pushFinding(finding);
    if (stopped) return;
    for (const finding of collectHtmlCommentFinding(text, relativeSafe)) pushFinding(finding);
    if (stopped) return;
    if (/\.(?:md|mdx|markdown)$/i.test(relativeRaw)) {
      for (const finding of collectMarkdownReferenceFindings(text, relativeSafe)) {
        pushFinding(finding);
        if (stopped) return;
      }
    }
    if (path.basename(relativeRaw).toLowerCase() === 'package.json') {
      // JSON.parse does not accept a leading UTF-8 BOM; inspection above does.
      for (const finding of analyzePackageJson(text.replace(/^\uFEFF/, ''), relativeSafe)) pushFinding(finding);
    }
    if (stopped) return;
    let traversalCount = 0;
    for (const match of text.matchAll(/(?:\.\.[\\/]|%2e%2e(?:%2f|%5c))/gi)) traversalCount += 1;
    if (traversalCount > 0) pushFinding({ type: 'text.path-escape-token-review', path: relativeSafe, count: traversalCount });
  }

  for (const entry of fs.readdirSync(root, { withFileTypes: true }).sort((left, right) => compareText(left.name, right.name))) {
    if (stopped) break;
    processPath(path.join(root, entry.name));
  }

  const hasCoverageGaps = stopped
    || coverage.stopReasons.length > 0
    || coverage.unhashedFiles > 0
    || coverage.unscannedTextCandidates > 0
    || coverage.findingsTruncated;
  const countsByType = {};
  for (const finding of findings) countsByType[finding.type] = (countsByType[finding.type] || 0) + 1;
  const resourceSetSha256 = hasCoverageGaps ? null : sha256([...fingerprints].sort().join('\n'));

  return {
    schemaVersion: SCHEMA_VERSION,
    scanStatus: hasCoverageGaps ? 'partial' : 'complete',
    contract: {
      networkUsed: false,
      processesSpawned: false,
      durableWritesPerformed: false,
      symlinkTargetsFollowed: false,
      output: 'stdout-json-only',
      safetyVerdictProduced: false,
    },
    root: { label: escapeDangerousText(path.basename(root)), absolutePathEmitted: false },
    limits,
    coverage,
    inventory: { resourceSetSha256, files: files.sort((left, right) => compareText(left.path, right.path)) },
    manifests: manifests.sort((left, right) => compareText(left.path, right.path)),
    executionSurfaces: executionSurfaces.sort((left, right) => compareText(left.path, right.path)),
    findings,
    summary: {
      countsByType,
      hasSymlinks: findings.some((finding) => finding.type === 'filesystem.symlink'),
      hasPathEscapes: findings.some((finding) => finding.type === 'reference.path-review' && finding.classification.includes('escape')),
      hasLifecycleHooks: findings.some((finding) => finding.type === 'manifest.lifecycle-hook'),
      hasNativeBinaries: findings.some((finding) => finding.type === 'content.native-binary'),
      hasHiddenUnicode: findings.some((finding) => finding.type.startsWith('unicode.') || finding.type.startsWith('path.unicode.')),
      hasCoverageGaps,
    },
    errors: [],
  };
}

export function main(argv = process.argv.slice(2), io = { write: (value) => process.stdout.write(value) }) {
  let pretty = argv.includes('--pretty');
  try {
    const options = parseArgs(argv);
    pretty = options.pretty;
    const result = scanRoot(options.root, options);
    io.write(`${JSON.stringify(result, null, pretty ? 2 : 0)}\n`);
    return result.scanStatus === 'complete' ? 0 : 1;
  } catch (error) {
    const exitCode = error instanceof ScanError ? error.exitCode : 1;
    const result = {
      schemaVersion: SCHEMA_VERSION,
      scanStatus: 'error',
      contract: {
        networkUsed: false,
        processesSpawned: false,
        durableWritesPerformed: false,
        symlinkTargetsFollowed: false,
        output: 'stdout-json-only',
        safetyVerdictProduced: false,
      },
      error: {
        type: error instanceof ScanError ? 'invalid-input' : 'scan-failure',
        message: error instanceof ScanError ? error.message : 'Scanner failed during bounded local inspection.',
      },
    };
    io.write(`${JSON.stringify(result, null, pretty ? 2 : 0)}\n`);
    return exitCode;
  }
}

const invokedPath = process.argv[1] ? path.basename(process.argv[1]) : '';
const modulePath = path.basename(new URL(import.meta.url).pathname);
if (invokedPath === modulePath) process.exitCode = main();

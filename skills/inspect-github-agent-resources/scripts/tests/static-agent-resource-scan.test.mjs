import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import { main, scanRoot } from '../static-agent-resource-scan.mjs';
import { makeFixture, removeFixture, isFixtureChild } from './fixture-utils.mjs';

const SCANNER_PATH = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../static-agent-resource-scan.mjs',
);

function write(root, relativePath, value) {
  const target = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, value);
}

function snapshot(root) {
  const output = {};
  function walk(current) {
    for (const entry of fs.readdirSync(current, { withFileTypes: true }).sort((left, right) => left.name.localeCompare(right.name))) {
      const target = path.join(current, entry.name);
      const relative = path.relative(root, target).split(path.sep).join('/');
      if (entry.isDirectory()) walk(target);
      else if (entry.isFile()) output[relative] = crypto.createHash('sha256').update(fs.readFileSync(target)).digest('hex');
      else if (entry.isSymbolicLink()) output[relative] = `link:${crypto.createHash('sha256').update(fs.readlinkSync(target)).digest('hex')}`;
    }
  }
  walk(root);
  return output;
}

function findingTypes(result) {
  return new Set(result.findings.map((finding) => finding.type));
}

test('clean scan is deterministic and read-only', (t) => {
  const root = makeFixture();
  t.after(() => removeFixture(root));
  write(root, 'SKILL.md', '---\nname: fixture\ndescription: Fixture skill.\n---\n\n# Fixture\n');
  write(root, 'agents/openai.yaml', 'interface:\n  default_prompt: "Use $fixture."\n');
  write(root, 'references/contract.md', '# Contract\n');
  const before = snapshot(root);
  const first = scanRoot(root);
  fs.utimesSync(path.join(root, 'references/contract.md'), new Date(), new Date(Date.now() + 1000));
  const second = scanRoot(root);
  assert.equal(first.scanStatus, 'complete');
  assert.equal(first.inventory.resourceSetSha256, second.inventory.resourceSetSha256);
  assert.deepEqual(snapshot(root), before);
  assert.equal(first.contract.durableWritesPerformed, false);
  assert.equal(first.contract.safetyVerdictProduced, false);
});

test('main emits one JSON document through the supplied stdout sink', (t) => {
  const root = makeFixture();
  t.after(() => removeFixture(root));
  write(root, 'SKILL.md', '---\nname: fixture\ndescription: Fixture.\n---\n');
  let output = '';
  const exitCode = main(['--root', root], { write: (value) => { output += value; } });
  assert.equal(exitCode, 0);
  const parsed = JSON.parse(output);
  assert.equal(parsed.schemaVersion, 'github-agent-resource-static-scan-v1');
  assert.equal(output.trim().split('\n').length, 1);
  assert.equal(Object.hasOwn(parsed.limits, 'root'), false);
  assert.equal(Object.hasOwn(parsed.limits, 'pretty'), false);
  assert.equal(output.includes(path.resolve(root)), false);
});

test('hidden Unicode and comments are detected without echoing surrounding content', (t) => {
  const root = makeFixture();
  t.after(() => removeFixture(root));
  const canary = 'SECRET-COMMAND-CANARY';
  write(root, 'README.md', `visible\u202E x\u200B y\uFE01 z\u{E0100}\u{E0020}\n<!-- ${canary} -->\n`);
  const result = scanRoot(root);
  const serialized = JSON.stringify(result);
  const types = findingTypes(result);
  assert.ok(types.has('unicode.bidi-control'));
  assert.ok(types.has('unicode.zero-width-format'));
  assert.ok(types.has('unicode.variation-selector'));
  assert.ok(types.has('unicode.tag'));
  assert.ok(types.has('text.html-comment'));
  assert.equal(serialized.includes(canary), false);
});

test('manifest hooks, path escapes, workflows, and binaries are inventoried with command redaction', (t) => {
  const root = makeFixture();
  t.after(() => removeFixture(root));
  const canary = 'MALICIOUS-COMMAND-CANARY';
  write(root, 'SKILL.md', '# Fixture\n[escape](../../secret.md)\n[encoded](%2e%2e%2fsecret)\n');
  write(root, 'package.json', JSON.stringify({ scripts: { postinstall: `${canary} && node-gyp rebuild`, prepare: 'prepare-value' }, bin: { fixture: 'run.js' } }));
  write(root, '.github/workflows/check.yml', 'name: check\n');
  write(root, 'setup.py', 'print("setup")\n');
  write(root, 'module.wasm', Buffer.from([0x00, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00]));
  const result = scanRoot(root);
  const serialized = JSON.stringify(result);
  const types = findingTypes(result);
  assert.ok(types.has('manifest.lifecycle-hook'));
  assert.ok(types.has('manifest.binary-entrypoint'));
  assert.ok(types.has('manifest.native-build'));
  assert.ok(types.has('reference.path-review'));
  assert.ok(types.has('content.native-binary'));
  assert.ok(result.executionSurfaces.some((surface) => surface.kind === 'github-workflow'));
  assert.ok(result.executionSurfaces.some((surface) => surface.kind === 'python-setup'));
  assert.equal(serialized.includes(canary), false);
});

test('coverage limits fail closed and suppress the resource-set hash', (t) => {
  const root = makeFixture();
  t.after(() => removeFixture(root));
  write(root, 'a.md', 'a');
  write(root, 'b.md', 'b');
  const result = scanRoot(root, { maxFiles: 1 });
  assert.equal(result.scanStatus, 'partial');
  assert.equal(result.inventory.resourceSetSha256, null);
  assert.ok(result.coverage.stopReasons.includes('max-files'));
});

test('symlink targets are not followed or echoed when the platform permits links', (t) => {
  const root = makeFixture();
  const outside = makeFixture();
  t.after(() => removeFixture(root));
  t.after(() => removeFixture(outside));
  const canary = 'OUTSIDE-SECRET-CANARY';
  write(outside, 'secret.txt', canary);
  try {
    fs.symlinkSync(outside, path.join(root, 'outside-link'), process.platform === 'win32' ? 'junction' : 'dir');
  } catch (error) {
    t.skip(`symlink unavailable: ${error.code || error.message}`);
    return;
  }
  const result = scanRoot(root);
  const linkFinding = result.findings.find((finding) => finding.type === 'filesystem.symlink');
  assert.ok(linkFinding);
  assert.equal(linkFinding.targetEscapesRoot, true);
  assert.equal(JSON.stringify(result).includes(canary), false);
});

test('production scanner imports only read-only built-ins and contains no mutation or dynamic execution calls', () => {
  const source = fs.readFileSync(SCANNER_PATH, 'utf8');
  const imports = [...source.matchAll(/from\s+['"](node:[^'"]+)['"]/g)].map((match) => match[1]).sort();
  assert.deepEqual(imports, ['node:crypto', 'node:fs', 'node:path', 'node:util']);
  assert.equal(/node:(?:http|https|net|tls|dgram|child_process|worker_threads|vm)/.test(source), false);
  assert.equal(/\b(?:eval|Function)\s*\(/.test(source), false);
  assert.equal(/\bimport\s*\(/.test(source), false);
  assert.equal(/fs\.(?:writeFile|appendFile|rm|unlink|rename|mkdir|copyFile|symlink|link|chmod|chown)/.test(source), false);
});

test('unreadable link metadata invalidates the fingerprint and CLI completion', (t) => {
  const root = makeFixture();
  t.after(() => removeFixture(root));
  write(root, 'link', 'synthetic link placeholder');
  const target = path.join(root, 'link');
  const lstat = fs.lstatSync;
  const readlink = fs.readlinkSync;
  t.mock.method(fs, 'lstatSync', (value, ...args) => value === target
    ? { isSymbolicLink: () => true } : lstat(value, ...args));
  t.mock.method(fs, 'readlinkSync', (value, ...args) => {
    if (value === target) throw Object.assign(new Error('synthetic failure'), { code: 'EACCES' });
    return readlink(value, ...args);
  });
  let output = '';
  const code = main(['--root', root], { write: value => { output += value; } });
  const result = JSON.parse(output);
  assert.equal(code, 1);
  assert.equal(result.scanStatus, 'partial');
  assert.equal(result.inventory.resourceSetSha256, null);
  assert.ok(result.coverage.stopReasons.includes('readlink-error:link'));
  assert.ok(findingTypes(result).has('filesystem.symlink-unreadable'));
  t.mock.restoreAll();
});

test('low finding budget stops reference hashing and reading later files', (t) => {
  const root = makeFixture();
  t.after(() => removeFixture(root));
  write(root, 'a.md', '[escape](../outside)\n'.repeat(8000));
  write(root, 'z.txt', 'later file');
  const original = crypto.createHash;
  let hashes = 0;
  t.mock.method(crypto, 'createHash', (...args) => { hashes += 1; return original(...args); });
  const result = scanRoot(root, { maxFindings: 1 });
  // One file digest and one reviewed destination, independent of the tail size.
  assert.equal(hashes, 2);
  assert.equal(result.findings.length, 1);
  assert.equal(result.coverage.filesHashed, 1);
  assert.equal(result.scanStatus, 'partial');
  assert.equal(result.coverage.findingsTruncated, true);
  assert.equal(result.inventory.resourceSetSha256, null);
  assert.ok(result.coverage.stopReasons.includes('max-findings'));
});

test('reference lines remain accurate across pattern passes', (t) => {
  const root = makeFixture();
  t.after(() => removeFixture(root));
  write(root, 'SKILL.md', 'heading\n[local](ok.md)\n[bad](../one)\n\n[x]: ../../two\n<../three>\n');
  const refs = scanRoot(root).findings.filter(item => item.type === 'reference.path-review');
  assert.deepEqual(refs.map(item => item.line), [3, 5, 6]);
});

test('BOM preserves original byte offsets and only the first BOM is exempt', (t) => {
  const root = makeFixture();
  t.after(() => removeFixture(root));
  write(root, 'a.md', Buffer.from('efbbbfe280ae', 'hex'));
  write(root, 'b.md', Buffer.from('efbbbfefbbbf41', 'hex'));
  const result = scanRoot(root);
  const bidi = result.findings.find(item => item.type === 'unicode.bidi-control');
  const embedded = result.findings.find(item => item.type === 'unicode.zero-width-format');
  assert.equal(bidi.samples[0].byteOffset, 3);
  assert.equal(embedded.samples[0].byteOffset, 3);
  assert.equal(embedded.count, 1);
  assert.equal(result.summary.hasHiddenUnicode, true);
});

test('leading BOM does not hide package lifecycle hooks', (t) => {
  const root = makeFixture();
  t.after(() => removeFixture(root));
  write(root, 'package.json', '\uFEFF{"scripts":{"postinstall":"synthetic"}}');
  const types = findingTypes(scanRoot(root));
  assert.ok(types.has('manifest.lifecycle-hook'));
  assert.equal(types.has('manifest.parse-error'), false);
});

test('malformed CLI input never echoes the root or unknown argument', () => {
  for (const args of [
    ['--root', '/PRIVATE-ROOT-CANARY', '/PRIVATE-ROOT-CANARY'],
    ['--root', '/PRIVATE-ROOT-CANARY', '--max-files', '/PRIVATE-ROOT-CANARY'],
    ['--unexpected=/PRIVATE-ROOT-CANARY'],
  ]) {
    let output = '';
    assert.equal(main(args, { write: value => { output += value; } }), 2);
    assert.equal(JSON.parse(output).scanStatus, 'error');
    assert.equal(output.includes('PRIVATE-ROOT-CANARY'), false);
  }
});

test('API rejects nonfinite, fractional, oversized and inconsistent limits', (t) => {
  const root = makeFixture();
  t.after(() => removeFixture(root));
  for (const value of [Infinity, NaN, -1, 0, 1.5, 5001]) {
    assert.throws(() => scanRoot(root, { maxFiles: value }));
  }
  assert.throws(() => scanRoot(root, { maxTextFileBytes: 10, maxHashFileBytes: 5 }));
});

test('Windows, URI and escaped references retain distinct classifications', (t) => {
  const root = makeFixture();
  t.after(() => removeFixture(root));
  write(root, 'SKILL.md', '[drive](C:/synthetic/file)\n[encoded](C%3A%5Csynthetic%5Cfile)\n[scheme](custom:thing)\n[escape](../outside)\n[web](https://example.invalid/)\n');
  const refs = scanRoot(root).findings.filter(item => item.type === 'reference.path-review');
  assert.deepEqual(refs.map(item => item.classification), ['windows-absolute', 'windows-absolute', 'active-or-unknown-scheme', 'relative-escape']);
});

test('inventory and fingerprint are independent of directory enumeration order', (t) => {
  const root = makeFixture();
  t.after(() => removeFixture(root));
  for (const name of ['z.md', 'B.md', 'a.md', 'é.md']) write(root, name, name);
  const before = scanRoot(root);
  const read = fs.readdirSync;
  t.mock.method(fs, 'readdirSync', (...args) => read(...args).reverse());
  const after = scanRoot(root);
  assert.deepEqual(after, before);
  assert.deepEqual(after.inventory.files.map(item => item.path), ['B.md', 'a.md', 'z.md', 'é.md']);
});

test('fixture containment handles filesystem roots without allowing siblings or parents', () => {
  for (const [paths, parent, child, outside] of [
    [path.posix, '/', '/fixture-owned', '/unrelated'],
    [path.posix, '/tmp', '/tmp/fixture-owned', '/tmp-other/fixture-owned'],
    [path.win32, 'C:\\', 'C:\\fixture-owned', 'D:\\fixture-owned'],
    [path.win32, 'C:\\temp', 'C:\\temp\\fixture-owned', 'C:\\temp-other\\fixture-owned'],
  ]) {
    assert.equal(isFixtureChild(parent, child, 'fixture-', paths), true);
    assert.equal(isFixtureChild(parent, parent, 'fixture-', paths), false);
    assert.equal(isFixtureChild(parent, outside, 'fixture-', paths), false);
  }
});

test('comment samples remain bounded while total counts and lines remain accurate', (t) => {
  const root = makeFixture();
  t.after(() => removeFixture(root));
  write(root, 'notes.txt', 'text\n<!-- synthetic -->\n'.repeat(1000));
  const comment = scanRoot(root).findings.find(item => item.type === 'text.html-comment');
  assert.equal(comment.count, 1000);
  assert.deepEqual(comment.lines, Array.from({ length: 32 }, (_, i) => 2 + i * 2));
  assert.equal(comment.samplesTruncated, true);
});

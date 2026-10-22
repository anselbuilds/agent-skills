import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { scanRoot } from './static-agent-resource-scan.mjs';

// Render names as inert text, even when a filename contains Markdown or HTML.
const display = value => String(value).replace(/[&<>\n\r|`\[\]*_\\]/g, char => `&#${char.codePointAt(0)};`);

export function compareResults(before, after) {
  const complete = before.scanStatus === 'complete' && after.scanStatus === 'complete';
  const oldFiles = new Map(before.inventory.files.map(file => [file.path, file]));
  const newFiles = new Map(after.inventory.files.map(file => [file.path, file]));
  const paths = [...new Set([...oldFiles.keys(), ...newFiles.keys()])].sort();
  const rows = [];
  for (const filePath of paths) {
    const left = oldFiles.get(filePath);
    const right = newFiles.get(filePath);
    let change;
    if (!left) change = complete ? 'added' : 'observed only after; before coverage incomplete';
    else if (!right) change = complete ? 'removed' : 'observed only before; after coverage incomplete';
    else if (!left.sha256 || !right.sha256) change = 'unverified hash';
    else if (left.sha256 !== right.sha256) change = 'changed';
    if (change) rows.push(`| ${display(filePath)} | ${change} |`);
  }
  const same = complete && before.inventory.resourceSetSha256 !== null
    && before.inventory.resourceSetSha256 === after.inventory.resourceSetSha256;
  const result = [
    '# Included snapshot comparison', '',
    `Before inventory: ${before.scanStatus}. After inventory: ${after.scanStatus}.`,
    complete ? (same ? 'Included fingerprints match.' : 'Included fingerprints differ.') : 'Coverage is incomplete; equality and absence cannot be established.',
    '', '| File | Observation |', '| --- | --- |',
    ...(rows.length ? rows : ['| (none) | No file-level change established |']), '',
    'Fingerprint differences can also reflect symlink metadata. Link targets are not inspected.',
    '', 'Excluded directories (before): ' + (before.coverage.ignoredDirectories.map(display).join(', ') || '(none observed)'),
    'Excluded directories (after): ' + (after.coverage.ignoredDirectories.map(display).join(', ') || '(none observed)'),
    'Coverage gaps (before): ' + (before.coverage.stopReasons.map(display).join(', ') || '(none recorded; inspect size/hash coverage too)'),
    'Coverage gaps (after): ' + (after.coverage.stopReasons.map(display).join(', ') || '(none recorded; inspect size/hash coverage too)'),
    '', 'This is an inventory comparison, not a security verdict. Review affected evidence, external advisories, and the deployment environment separately.',
  ];
  return { markdown: result.join('\n') + '\n', exitCode: complete ? 0 : 1 };
}

export function main(argv = process.argv.slice(2), write = value => process.stdout.write(value)) {
  try {
    if (argv.length !== 4 || argv[0] !== '--before' || argv[2] !== '--after') {
      write('Usage: node scripts/compare-snapshots.mjs --before <snapshot> --after <snapshot>\n');
      return 2;
    }
    const result = compareResults(scanRoot(argv[1]), scanRoot(argv[3]));
    write(result.markdown);
    return result.exitCode;
  } catch {
    write('Comparison failed: unable to complete the explicitly scoped local reads.\n');
    return 2;
  }
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  process.exitCode = main();
}

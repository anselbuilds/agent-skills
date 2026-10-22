import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

export function isFixtureChild(parent, target, prefix, paths = path) {
  const relative = paths.relative(paths.resolve(parent), paths.resolve(target));
  return relative !== '' && relative !== '..'
    && !relative.startsWith(`..${paths.sep}`) && !paths.isAbsolute(relative)
    && paths.basename(target).startsWith(prefix);
}

const owned = new Map();

export function makeFixture(prefix = 'inspect-github-agent-resources-') {
  const parent = path.resolve(os.tmpdir());
  const root = fs.mkdtempSync(path.join(parent, prefix));
  owned.set(root, { parent, prefix });
  return root;
}

export function removeFixture(root) {
  const absolute = path.resolve(root);
  const record = owned.get(absolute);
  assert.ok(record, 'Only fixtures created by this process may be removed.');
  assert.ok(isFixtureChild(record.parent, absolute, record.prefix));
  assert.equal(fs.lstatSync(absolute).isSymbolicLink(), false);
  fs.rmSync(absolute, { recursive: true, force: true });
  owned.delete(absolute);
}

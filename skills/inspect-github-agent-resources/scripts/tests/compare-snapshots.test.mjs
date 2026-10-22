import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { scanRoot } from '../static-agent-resource-scan.mjs';
import { compareResults, main } from '../compare-snapshots.mjs';
import { makeFixture, removeFixture } from './fixture-utils.mjs';

function fixture(t) {
  const root = makeFixture('agent-review-diff-');
  t.after(() => removeFixture(root));
  return root;
}

test('reports a changed hook without executing or echoing its contents', t => {
  const before = fixture(t), after = fixture(t);
  fs.writeFileSync(path.join(before, 'package.json'), '{}');
  fs.writeFileSync(path.join(after, 'package.json'), JSON.stringify({ scripts: { postinstall: 'PRIVATE-CANARY' } }));
  const result = compareResults(scanRoot(before), scanRoot(after));
  assert.match(result.markdown, /package.json \| changed/);
  assert.doesNotMatch(result.markdown, /PRIVATE-CANARY/);
  assert.equal(result.exitCode, 0);
});

test('partial inventory cannot turn unseen files into confirmed removals', t => {
  const before = fixture(t), after = fixture(t);
  for (const root of [before, after]) {
    fs.writeFileSync(path.join(root, 'a.md'), 'a');
    fs.writeFileSync(path.join(root, 'b.md'), 'b');
  }
  const result = compareResults(scanRoot(before), scanRoot(after, { maxFiles: 1 }));
  assert.equal(result.exitCode, 1);
  assert.match(result.markdown, /coverage incomplete/);
  assert.doesNotMatch(result.markdown, /\| removed \|/);
  assert.doesNotMatch(result.markdown, /fingerprints match/);
});

test('changed files in an excluded directory do not imply whole-tree equality', t => {
  const before = fixture(t), after = fixture(t);
  for (const [root, text] of [[before, 'old'], [after, 'new']]) {
    fs.mkdirSync(path.join(root, 'node_modules'));
    fs.writeFileSync(path.join(root, 'node_modules', 'ignored.js'), text);
  }
  const result = compareResults(scanRoot(before), scanRoot(after));
  assert.match(result.markdown, /Included fingerprints match/);
  assert.match(result.markdown.replace(/&#95;/g, '_'), /Excluded directories \(after\): node_modules/);
});

test('CLI requires both explicit scoped roots', () => {
  let output = '';
  assert.equal(main([], value => { output += value; }), 2);
  assert.match(output, /Usage/);
});

test('programmatic limits obey the same bounds as CLI', t => {
  const root = fixture(t);
  assert.throws(() => scanRoot(root, { maxFiles: Infinity }), /positive integer/);
  assert.throws(() => scanRoot(root, { maxFiles: 5001 }), /between/);
  assert.throws(() => scanRoot(root, { maxFiles: 0 }), /between/);
});

test('Windows absolute links are classified before URI schemes', t => {
  const root = fixture(t);
  fs.writeFileSync(path.join(root, 'SKILL.md'), '[file](C:/outside/example.md)');
  const finding = scanRoot(root).findings.find(item => item.type === 'reference.path-review');
  assert.equal(finding.classification, 'windows-absolute');
});

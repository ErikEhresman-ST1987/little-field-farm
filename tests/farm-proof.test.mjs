// Run from the repository root: node --test tests/farm-proof.test.mjs
// Dependency-free source/asset regression checks. Not a browser-rendering test.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = path => readFileSync(resolve(root, path), 'utf8');
const js = read('proof/main.js');
const html = read('proof/index.html');
const css = read('proof/style.css');

test('Pixi v8 app and scene remain connected', () => {
  assert.match(js, /pixi\.js@8\.14\.3/);
  assert.match(js, /new PIXI\.Application\(/);
  assert.match(html, /id="stage"/);
  assert.match(html, /main\.js\?v=/);
  assert.match(css, /touch-action:none/);
});

test('approved crop field is 12 beds in upper-left 4 by 3 layout', () => {
  const order = js.match(/const cropOrder = \[([\s\S]*?)\];/);
  assert.ok(order, 'crop order declaration');
  const names = [...order[1].matchAll(/'(kohlrabi|pineapple|chard|dragonfruit|cauliflower)'/g)].map(m => m[1]);
  assert.equal(names.length, 12);
  assert.equal(new Set(names).size, 5);
  assert.match(js, /const FIELD = \{ startX: 170, startY: 190, columns: 4,/);
});

test('all 25 growth assets are declared and exist', () => {
  const block = js.match(/const cropFiles = \{([\s\S]*?)\n\};/);
  assert.ok(block);
  const matches = [...block[1].matchAll(/'([^']+\.webp)'/g)].map(m => m[1]);
  assert.equal(matches.length, 25);
  assert.equal(new Set(matches).size, 25);
  for (const file of matches) assert.ok(existsSync(resolve(root, 'proof/assets', file)), file);
});

test('landscape and community artwork are present', () => {
  for (const file of ['landscape-new.webp', 'barn.webp', 'market-stall.webp', 'order-board.webp']) {
    assert.ok(existsSync(resolve(root, 'proof/assets', file)), file);
  }
  assert.match(js, /x: 1080, y: 780/);
  assert.match(js, /x: 1300, y: 840/);
  assert.match(js, /x: 1440, y: 830/);
});

test('camera boundaries and resilient optional art loading remain', () => {
  assert.match(js, /const DRAG_THRESHOLD = 8/);
  assert.match(js, /function clampCamera\(/);
  assert.match(js, /function zoom\(/);
  assert.match(js, /missingCropStages\.push\(name\)/);
  assert.match(js, /const assetWarnings =/);
  assert.match(js, /pointercancel/);
  assert.match(js, /lostpointercapture/);
});

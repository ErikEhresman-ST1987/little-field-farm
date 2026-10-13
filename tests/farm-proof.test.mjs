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

test('all twelve beds share the approved layout and empty artwork', () => {
  assert.match(js, /index < 12/);
  assert.match(js, /const FIELD = \{ startX: 170, startY: 190, columns: 4,/);
  assert.match(js, /crop-bed-empty\.webp/);
  assert.ok(existsSync(resolve(root, 'proof/assets/crop-bed-empty.webp')));
  assert.match(js, /activateBed\(index\)/);
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

test('market assets, stall interaction, and coin UI are wired', () => {
  for (const crop of ['kohlrabi', 'pineapple', 'chard', 'dragonfruit', 'cauliflower']) {
    assert.ok(existsSync(resolve(root, 'proof/assets', crop + '-harvest.webp')));
  }
  assert.match(js, /sellOne\\(farm, crop\\)/);
  assert.match(js, /building\\.file === 'market-stall\\.webp'/);
  assert.match(html, /id="market-panel"/);
  assert.match(html, /id="coin-balance"/);
});

test('selling preserves inventory accounting and migrates old saves', async () => {
  const source = read('proof/first-harvest.js');
  const module = await import('data:text/javascript;base64,' + Buffer.from(source).toString('base64'));
  const old = module.freshFarm();
  old.version = 2;
  delete old.coins;
  old.inventory.pineapple = 2;
  old.beds[3] = { crop: 'chard', plantedAt: 100 };
  const storage = { getItem: () => JSON.stringify(old) };
  const farm = module.loadFarm(storage);
  assert.equal(farm.version, 3);
  assert.equal(farm.coins, 0);
  assert.equal(farm.inventory.pineapple, 2);
  assert.equal(farm.beds[3].crop, 'chard');
  assert.equal(module.sellOne(farm, 'pineapple'), true);
  assert.equal(farm.inventory.pineapple, 1);
  assert.equal(farm.coins, module.SELL_PRICES.pineapple);
  assert.equal(module.sellOne(farm, 'pineapple'), true);
  assert.equal(module.sellOne(farm, 'pineapple'), false);
  assert.equal(farm.inventory.pineapple, 0);
  assert.equal(module.sellOne(farm, 'invalid'), false);
  assert.equal(module.validFarm(farm), true);
});

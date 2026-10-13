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
  assert.equal(farm.version, 5);
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

test('single customer order persists, rejects insufficient stock, and pays once', async () => {
  const source = read('proof/first-harvest.js');
  const game = await import('data:text/javascript;base64,' + Buffer.from(source).toString('base64'));
  const farm = game.freshFarm();
  assert.equal(farm.order.number, 0);
  const crop = farm.order.crop;
  const reward = farm.order.reward;
  assert.equal(game.fulfillOrder(farm), false);
  assert.equal(farm.coins, 0);
  farm.inventory[crop] = farm.order.quantity;
  assert.equal(game.fulfillOrder(farm), true);
  assert.equal(farm.coins, reward);
  assert.equal(farm.inventory[crop], 0);
  assert.equal(farm.order.number, 1);
  assert.equal(game.fulfillOrder(farm), false);
  assert.equal(game.validFarm(farm), true);
  const storage = { getItem: () => JSON.stringify(farm) };
  assert.deepEqual(game.loadFarm(storage), farm);
  assert.match(js, /building\.file === 'order-board\.webp'/);
  assert.match(html, /id="order-panel"/);
});

test('individual crop growth times, offline elapsed time, and unchanged saved beds', async () => {
  const source = read('proof/first-harvest.js');
  const game = await import('data:text/javascript;base64,' + Buffer.from(source).toString('base64'));
  assert.deepEqual(game.GROW_TIMES, { kohlrabi: 30000, chard: 45000, pineapple: 90000, cauliflower: 120000, dragonfruit: 180000 });
  const farm = game.freshFarm();
  for (const crop of game.CROPS) {
    assert.equal(game.plant(farm, 0, crop, 1000), true);
    const duration = game.growthTime(crop);
    assert.equal(game.stageAt(farm.beds[0], 1000), 0);
    assert.equal(game.stageAt(farm.beds[0], 1000 + duration - 1), 3);
    assert.equal(game.remainingGrowthMs(farm.beds[0], 1000 + duration - 1), 1);
    assert.equal(game.harvest(farm, 0, 1000 + duration - 1), false);
    assert.equal(game.stageAt(farm.beds[0], 1000 + duration), 4);
    assert.equal(game.harvest(farm, 0, 1000 + duration), true);
    assert.equal(farm.inventory[crop], 1);
  }
  const bed = { crop: 'dragonfruit', plantedAt: 1000 };
  farm.beds[2] = bed;
  const loaded = game.loadFarm({ getItem: () => JSON.stringify(farm) });
  assert.deepEqual(loaded.beds[2], bed);
  assert.equal(game.stageAt(loaded.beds[2], 181000), 4);
  assert.ok(js.includes('remainingGrowthMs(bed, Date.now())'));
  assert.ok(html.includes('main.js?v=crop-timing-1'));
  assert.ok(js.includes('first-harvest.js?v=crop-timing-1'));
});

test('bakery assets and UI remain connected', () => {
  for (const file of ['bakery.webp', 'pineapple-sunshine-cakes.webp', 'dragonfruit-dream-cupcakes.webp', 'purple-garden-pies.webp']) {
    assert.ok(existsSync(resolve(root, 'proof/assets', file)), file);
  }
  assert.match(html, /id="bakery-panel"/);
  assert.match(html, /main\.js\?v=bakery-1/);
  assert.match(js, /first-harvest\.js\?v=bakery-1/);
  assert.match(js, /building\.file === 'bakery\.webp'/);
  assert.match(js, /app\.ticker\.add/);
});
test('bakery queue is sequential, consumes ingredients, persists and pays correctly', async () => {
  const source = read('proof/first-harvest.js');
  const game = await import('data:text/javascript;base64,' + Buffer.from(source).toString('base64'));
  const old = game.freshFarm();
  old.version = 4;
  delete old.bakery;
  old.inventory.pineapple = 6;
  old.inventory.dragonfruit = 2;
  old.inventory.cauliflower = 1;
  old.inventory.kohlrabi = 1;
  old.coins = 62;
  old.order = game.makeOrder(3);
  old.beds[0] = { crop: 'chard', plantedAt: 1234 };
  const farm = game.loadFarm({ getItem: () => JSON.stringify(old) });
  assert.equal(farm.version, 5);
  assert.equal(farm.coins, 62);
  assert.deepEqual(farm.order, old.order);
  assert.deepEqual(farm.beds[0], old.beds[0]);
  assert.equal(game.enqueueBakery(farm, 'sunshine', 10000), true);
  assert.equal(game.enqueueBakery(farm, 'dream', 10000), true);
  assert.equal(game.enqueueBakery(farm, 'garden', 10000), true);
  assert.equal(game.enqueueBakery(farm, 'sunshine', 10000), false);
  assert.equal(farm.inventory.pineapple, 4);
  assert.equal(farm.inventory.dragonfruit, 0);
  assert.equal(farm.inventory.cauliflower, 0);
  assert.equal(farm.inventory.kohlrabi, 0);
  assert.deepEqual(farm.bakery.queue.map(j => [j.startedAt, j.endsAt]), [[10000,55000],[55000,145000],[145000,205000]]);
  assert.equal(game.bakeryReadyCount(farm, 54999), 0);
  assert.equal(game.collectBakery(farm, 54999), 0);
  assert.equal(game.collectBakery(farm, 55000), 1);
  assert.equal(farm.bakery.products.sunshine, 1);
  assert.equal(game.enqueueBakery(farm, 'sunshine', 60000), true);
  assert.equal(farm.bakery.queue[2].startedAt, 205000);
  const saved = game.loadFarm({ getItem: () => JSON.stringify(farm) });
  assert.deepEqual(saved, farm);
  assert.equal(game.collectBakery(saved, 300000), 3);
  assert.equal(saved.bakery.products.sunshine, 2);
  assert.equal(saved.bakery.products.dream, 1);
  assert.equal(saved.bakery.products.garden, 1);
  assert.equal(game.collectBakery(saved, 300000), 0);
  assert.equal(game.sellBakeryProduct(saved, 'dream'), true);
  assert.equal(saved.coins, 82);
  assert.equal(game.sellBakeryProduct(saved, 'dream'), false);
  assert.equal(game.validFarm(saved), true);
});

test('backup round-trip preserves all farm progress including active bakery jobs', async () => {
  const source = read('proof/first-harvest.js');
  const game = await import('data:text/javascript;base64,' + Buffer.from(source).toString('base64'));
  const farm = game.freshFarm();
  farm.coins = 128;
  farm.beds[2] = { crop: 'dragonfruit', plantedAt: 1000 };
  farm.inventory.pineapple = 4;
  farm.inventory.kohlrabi = 2;
  farm.order = game.makeOrder(7);
  assert.equal(game.enqueueBakery(farm, 'sunshine', 5000), true);
  farm.bakery.products.garden = 3;
  const backup = game.createFarmBackup(farm, '2026-10-12T20:00:00.000Z');
  const parsed = JSON.parse(backup);
  assert.equal(parsed.format, game.BACKUP_FORMAT);
  assert.equal(parsed.backupVersion, 1);
  assert.deepEqual(game.parseFarmBackup(backup), farm);
  let saved;
  const restored = game.restoreFarmBackup({ setItem: (key, value) => { saved = [key, value]; } }, backup);
  assert.deepEqual(restored, farm);
  assert.equal(saved[0], game.SAVE_KEY);
  assert.deepEqual(JSON.parse(saved[1]), farm);
  assert.notEqual(restored, farm);
});
test('invalid backup cannot overwrite existing save', async () => {
  const source = read('proof/first-harvest.js');
  const game = await import('data:text/javascript;base64,' + Buffer.from(source).toString('base64'));
  let writes = 0;
  const storage = { setItem: () => { writes++; } };
  const farm = game.freshFarm();
  for (const invalid of [
    'not json', '{}', JSON.stringify(farm),
    JSON.stringify({ format: game.BACKUP_FORMAT, backupVersion: 1, createdAt: '2026-10-12T20:00:00Z', farm: { ...farm, coins: -1 } }),
    JSON.stringify({ format: game.BACKUP_FORMAT, backupVersion: 2, createdAt: '2026-10-12T20:00:00Z', farm })
  ]) {
    assert.throws(() => game.restoreFarmBackup(storage, invalid));
  }
  assert.equal(writes, 0);
  const backup = game.createFarmBackup(farm);
  assert.throws(() => game.restoreFarmBackup({ setItem: () => { throw new Error('Storage full'); } }, backup), /Storage full/);
});
test('backup controls and cache versions are connected', () => {
  assert.match(html, /id="farm-data-panel"/);
  assert.match(html, /id="export-farm"/);
  assert.match(html, /id="import-farm-file"/);
  assert.match(html, /id="restore-farm"/);
  assert.match(html, /main\\.js\\?v=backup-1/);
  assert.match(js, /first-harvest\\.js\\?v=backup-1/);
  assert.match(js, /window\\.confirm/);
  assert.match(css, /#farm-data-panel/);
});

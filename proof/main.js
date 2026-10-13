import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@8.14.3/dist/pixi.min.mjs';
import { CROPS, GROW_MS, loadFarm, saveFarm, stageAt, plant, harvest, SELL_PRICES, sellOne } from './first-harvest.js';

const stageEl = document.getElementById('stage');
const status = document.getElementById('status');
const app = new PIXI.Application();
await app.init({ resizeTo: stageEl, background: '#203b2a', antialias: true, resolution: Math.min(devicePixelRatio || 1, 2), autoDensity: true });
stageEl.appendChild(app.canvas);

const WORLD_W = 1536, WORLD_H = 1024;
const world = new PIXI.Container();
app.stage.addChild(world);
const cropFiles = {
  kohlrabi: ['kohlrabi-planted.webp', 'Kohlrabi-stage1.webp', 'Kohlrabi-stage2.webp', 'Kohlrabi-stage3.webp', 'kohlrabi-mature-v2.webp'],
  pineapple: ['pineapple-planted.webp', 'pineapple-stage1.webp', 'pineapple-stage2.webp', 'pineapple-stage3.webp', 'pineapple-mature.webp'],
  chard: ['chard-planted.webp', 'chard-stage1.webp', 'chard-stage2.webp', 'chard-stage3.webp', 'chard-mature.webp'],
  dragonfruit: ['dragonfruit-planted.webp', 'dragonfruit-stage1.webp', 'dragonfruit-stage2.webp', 'dragonfruit-stage3.webp', 'dragonfruit-mature.webp'],
  cauliflower: ['cauliflower-planted.webp', 'cauliflower-stage1.webp', 'cauliflower-stage2.webp', 'cauliflower-stage3.webp', 'cauliflower-mature.webp']
};
// The landscape is essential; individual crop stages are optional to scene startup.
let background;
try {
  background = await PIXI.Assets.load('assets/landscape-new.webp');
} catch (error) {
  status.textContent = 'Farm landscape could not load. Reload to retry.';
  console.error('Required landscape failed to load', error);
  throw error;
}
const scene = new PIXI.Sprite(background);
scene.width = WORLD_W;
scene.height = WORLD_H;
world.addChild(scene);

const cropTextures = {};
const missingCropStages = [];
const cropEntries = Object.entries(cropFiles);
await Promise.all(cropEntries.map(async ([crop, files]) => {
  const stages = await Promise.all(files.map(async (name, index) => {
    try {
      return await PIXI.Assets.load('assets/' + name);
    } catch (error) {
      console.error('Crop asset failed:', crop, index, name, error);
      missingCropStages.push(name);
      return null;
    }
  }));
  // A missing stage uses the nearest available stage; a wholly missing
  // variety uses a shared visible placeholder so the other crops still work.
  const fallback = stages.find(Boolean) || PIXI.Texture.WHITE;
  cropTextures[crop] = stages.map(texture => texture || fallback);
}));

// All twelve beds use the same gameplay rules and approved shared empty-bed artwork.
const layout = new PIXI.Container();
world.addChild(layout);
const plots = [];
const farm = loadFarm(localStorage);
const inventoryEl = document.getElementById('inventory');
const cropPicker = document.getElementById('crop-picker');
const cropButtons = document.getElementById('crop-buttons');
const bedMessage = document.getElementById('bed-message');
let selectedBed = null;
const barnPanel = document.getElementById('barn-inventory');
const barnItems = document.getElementById('barn-items');
const harvestNames = {
  kohlrabi: 'Purple Kohlrabi', pineapple: 'Pineapple', chard: 'Rainbow Chard',
  dragonfruit: 'Dragon Fruit', cauliflower: 'Purple Cauliflower'
};
function renderBarnInventory() {
  for (const crop of CROPS) {
    const count = document.getElementById('barn-count-' + crop);
    if (count) count.textContent = 'In storage: ' + farm.inventory[crop];
  }
}
function openBarn() {
  closePicker();
  closeMarket();
  renderBarnInventory();
  barnPanel.hidden = false;
  document.getElementById('close-barn').focus();
}
function closeBarn() { barnPanel.hidden = true; }
for (const crop of CROPS) {
  const item = document.createElement('div');
  item.className = 'barn-item';
  const image = document.createElement('img');
  image.src = 'assets/' + crop + '-harvest.webp';
  image.alt = harvestNames[crop];
  image.loading = 'lazy';
  const name = document.createElement('span');
  name.className = 'crop-name';
  name.textContent = harvestNames[crop];
  const quantity = document.createElement('span');
  quantity.className = 'crop-count';
  quantity.id = 'barn-count-' + crop;
  item.append(image, name, quantity);
  barnItems.appendChild(item);
}
document.getElementById('open-barn').onclick = openBarn;
document.getElementById('close-barn').onclick = closeBarn;
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !barnPanel.hidden) closeBarn(); });
const marketPanel = document.getElementById('market-panel');
const marketItems = document.getElementById('market-items');
const marketMessage = document.getElementById('market-message');
const marketRows = new Map();
for (const crop of CROPS) {
  const item = document.createElement('div');
  item.className = 'market-item';
  const image = document.createElement('img');
  image.src = 'assets/' + crop + '-harvest.webp';
  image.alt = harvestNames[crop];
  const details = document.createElement('div');
  details.className = 'market-details';
  const name = document.createElement('strong');
  name.textContent = harvestNames[crop];
  const quantity = document.createElement('span');
  const price = document.createElement('span');
  price.textContent = 'Price: ' + SELL_PRICES[crop] + ' coins each';
  details.append(name, quantity, price);
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = 'Sell 1';
  button.onclick = () => {
    if (!sellOne(farm, crop)) {
      marketMessage.textContent = 'No ' + harvestNames[crop] + ' available to sell.';
      return;
    }
    saveProgress();
    refreshBeds();
    marketMessage.textContent = 'Sold 1 ' + harvestNames[crop] + ' for ' + SELL_PRICES[crop] + ' coins.';
  };
  item.append(image, details, button);
  marketItems.appendChild(item);
  marketRows.set(crop, { quantity, button });
}
function renderMarket() {
  document.getElementById('market-coins').textContent = 'Coins: ' + farm.coins;
  for (const crop of CROPS) {
    const row = marketRows.get(crop);
    row.quantity.textContent = 'In barn: ' + farm.inventory[crop];
    row.button.disabled = farm.inventory[crop] < 1;
  }
}
function closeMarket() { marketPanel.hidden = true; }
function openMarket() {
  closePicker();
  closeBarn();
  renderMarket();
  marketMessage.textContent = 'Sell harvested crops one at a time.';
  marketPanel.hidden = false;
  document.getElementById('close-market').focus();
}
document.getElementById('open-market').onclick = openMarket;
document.getElementById('close-market').onclick = closeMarket;
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !marketPanel.hidden) closeMarket(); });
function updateInventory() {
  inventoryEl.textContent = CROPS.map(c => c + ': ' + farm.inventory[c]).join(' · ');
  document.getElementById('coin-balance').textContent = 'Coins: ' + farm.coins;
  if (!marketPanel.hidden) renderMarket();
}
function closePicker() { cropPicker.hidden = true; selectedBed = null; }
function saveProgress() {
  try { saveFarm(localStorage, farm); }
  catch (error) { bedMessage.textContent = 'Save failed: storage unavailable. Keep this tab open.'; console.error(error); }
}
function refreshBeds() {
  for (let i = 0; i < plots.length; i++) {
    const bed = farm.beds[i];
    const plot = plots[i];
    plot.cropSprite.visible = !!bed;
    plot.emptySprite.visible = !bed;
    if (bed) plot.cropSprite.texture = cropTextures[bed.crop][stageAt(bed, Date.now())];
  }
  updateInventory();
  if (!barnPanel.hidden) renderBarnInventory();
}
function activateBed(index) {
  const bed = farm.beds[index];
  if (bed) {
    if (harvest(farm, index, Date.now())) {
      saveProgress();
      bedMessage.textContent = 'Bed ' + (index + 1) + ': harvest collected!';
      refreshBeds();
    } else {
      const seconds = Math.ceil(Math.max(0, GROW_MS - (Date.now() - bed.plantedAt)) / 1000);
      bedMessage.textContent = 'Bed ' + (index + 1) + ': ' + bed.crop + ' growing — about ' + seconds + ' seconds remaining.';
    }
  } else {
    selectedBed = index;
    closeBarn();
    closeMarket();
    cropPicker.hidden = false;
    bedMessage.textContent = 'Choose a crop for bed ' + (index + 1) + '.';
  }
}
for (const crop of CROPS) {
  const button = document.createElement('button');
  button.textContent = crop.charAt(0).toUpperCase() + crop.slice(1);
  button.onclick = () => {
    if (selectedBed !== null && plant(farm, selectedBed, crop, Date.now())) {
      const bedNumber = selectedBed + 1;
      saveProgress();
      refreshBeds();
      bedMessage.textContent = 'Bed ' + bedNumber + ': planted ' + crop + '. Ready in about 30 seconds.';
    }
    closePicker();
  };
  cropButtons.appendChild(button);
}
document.getElementById('close-picker').onclick = closePicker;

const FIELD = { startX: 170, startY: 190, columns: 4, gapX: 112, gapY: 118, spriteSize: 106 };
const emptyTexture = await PIXI.Assets.load('assets/crop-bed-empty.webp');
for (let index = 0; index < 12; index++) {
  const x = FIELD.startX + (index % FIELD.columns) * FIELD.gapX;
  const y = FIELD.startY + Math.floor(index / FIELD.columns) * FIELD.gapY;
  const emptySprite = new PIXI.Sprite(emptyTexture);
  const cropSprite = new PIXI.Sprite(cropTextures.kohlrabi[0]);
  for (const sprite of [emptySprite, cropSprite]) {
    sprite.anchor.set(.5, .79);
    sprite.position.set(x, y);
    sprite.width = FIELD.spriteSize;
    sprite.height = FIELD.spriteSize;
    sprite.eventMode = 'static';
    sprite.cursor = 'pointer';
    sprite.on('pointertap', () => { if (!moved) activateBed(index); });
    layout.addChild(sprite);
  }
  plots.push({ emptySprite, cropSprite });
}
refreshBeds();

// Approved visual placement study: community buildings in the lower-right.
// Load each asset independently so a missing building does not hide the farm.
const community = new PIXI.Container();
world.addChild(community);
const buildings = [
  { file: 'barn.webp', x: 1080, y: 780, width: 250 },
  { file: 'market-stall.webp', x: 1300, y: 840, width: 180 },
  { file: 'order-board.webp', x: 1440, y: 830, width: 105 }
];
const buildingFailures = [];
for (const building of buildings) {
  try {
    const texture = await PIXI.Assets.load('assets/' + building.file);
    const sprite = new PIXI.Sprite(texture);
    sprite.anchor.set(.5, 1);
    sprite.width = building.width;
    sprite.height = building.width * texture.height / texture.width;
    sprite.position.set(building.x, building.y);
    if (building.file === 'market-stall.webp') {
      sprite.eventMode = 'static';
      sprite.cursor = 'pointer';
      sprite.on('pointertap', () => { if (!moved) openMarket(); });
    }
    if (building.file === 'barn.webp') {
      sprite.eventMode = 'static';
      sprite.cursor = 'pointer';
      sprite.on('pointertap', () => { if (!moved) openBarn(); });
    }
    community.addChild(sprite);
  } catch (error) {
    console.error('Building artwork failed:', building.file, error);
    buildingFailures.push(building.file);
  }
}

// Camera and gesture handling: thresholded taps, bounded panning, and pinch zoom.
let scale = 1;
let moved = false; // Sticky until the next gesture, including Pixi's pointertap dispatch.
const DRAG_THRESHOLD = 8;
const pointers = new Map();
let pinchDistance = null;
let gestureStart = null;
let dragging = false;
const position = e => { const r = app.canvas.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
const fitScale = () => Math.min(stageEl.clientWidth / WORLD_W, stageEl.clientHeight / WORLD_H);
function clampCamera() {
  const w = stageEl.clientWidth, h = stageEl.clientHeight;
  const scaledW = WORLD_W * scale, scaledH = WORLD_H * scale;
  world.x = scaledW <= w ? (w - scaledW) / 2 : Math.max(w - scaledW, Math.min(0, world.x));
  world.y = scaledH <= h ? (h - scaledH) / 2 : Math.max(h - scaledH, Math.min(0, world.y));
}
function fit() {
  scale = fitScale();
  world.scale.set(scale);
  world.position.set((stageEl.clientWidth - WORLD_W * scale) / 2, (stageEl.clientHeight - WORLD_H * scale) / 2);
  clampCamera();
}
function zoom(factor, x, y) {
  const old = scale;
  scale = Math.max(fitScale(), Math.min(3, scale * factor));
  world.x = x - (x - world.x) * scale / old;
  world.y = y - (y - world.y) * scale / old;
  world.scale.set(scale);
  clampCamera();
}
stageEl.addEventListener('pointerdown', e => {
  const p = position(e);
  if (!pointers.size) {
    moved = false;
    dragging = false;
    gestureStart = p;
  } else {
    moved = true; // A multi-touch gesture must never activate a crop.
  }
  try { stageEl.setPointerCapture(e.pointerId); } catch (_) { /* Capture is optional. */ }
  pointers.set(e.pointerId, p);
  if (pointers.size === 2) {
    pinchDistance = distance(...pointers.values());
  }
});
stageEl.addEventListener('pointermove', e => {
  if (!pointers.has(e.pointerId)) return;
  const previous = pointers.get(e.pointerId), current = position(e);
  pointers.set(e.pointerId, current);
  if (pointers.size >= 2) {
    moved = true;
    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      const next = distance(a, b);
      if (pinchDistance && next > 0) zoom(next / pinchDistance, (a.x + b.x) / 2, (a.y + b.y) / 2);
      pinchDistance = next;
    }
  } else {
    if (!dragging && gestureStart && distance(current, gestureStart) >= DRAG_THRESHOLD) {
      dragging = true;
      moved = true;
    }
    if (dragging) {
      world.x += current.x - previous.x;
      world.y += current.y - previous.y;
      clampCamera();
    }
  }
});
function endPointer(e) {
  pointers.delete(e.pointerId);
  pinchDistance = null;
  if (pointers.size) {
    moved = true;
    gestureStart = null;
    dragging = false;
  } else {
    gestureStart = null;
    dragging = false;
  }
  // Do not reset moved here: Pixi pointertap may fire after pointerup.
}
stageEl.addEventListener('pointerup', endPointer);
stageEl.addEventListener('pointercancel', e => { moved = true; endPointer(e); });
stageEl.addEventListener('lostpointercapture', e => { if (pointers.has(e.pointerId)) { moved = true; endPointer(e); } });
stageEl.addEventListener('wheel', e => {
  e.preventDefault();
  const p = position(e);
  zoom(e.deltaY < 0 ? 1.08 : .92, p.x, p.y);
}, { passive: false });
document.getElementById('reset').onclick = fit;
setInterval(() => { if (farm.beds.some(Boolean)) refreshBeds(); }, 1000);
let previousViewport = { width: stageEl.clientWidth, height: stageEl.clientHeight };
window.addEventListener('resize', () => {
  const oldW = previousViewport.width;
  const oldH = previousViewport.height;
  const centerX = (oldW / 2 - world.x) / scale;
  const centerY = (oldH / 2 - world.y) / scale;
  scale = Math.max(fitScale(), scale);
  world.scale.set(scale);
  world.x = stageEl.clientWidth / 2 - centerX * scale;
  world.y = stageEl.clientHeight / 2 - centerY * scale;
  clampCamera();
  previousViewport = { width: stageEl.clientWidth, height: stageEl.clientHeight };
});
fit();
const assetWarnings = [
  ...(missingCropStages.length ? [missingCropStages.length + ' crop stage image(s) unavailable'] : []),
  ...(buildingFailures.length ? ['Building artwork unavailable: ' + buildingFailures.join(', ')] : [])
];
status.textContent = assetWarnings.length
  ? 'Farm loaded with missing artwork: ' + assetWarnings.join('; ') + '.'
  : 'All 12 beds: tap to plant, grow, and harvest. Drag to pan; pinch to zoom.';

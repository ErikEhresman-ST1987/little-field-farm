import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@8.14.3/dist/pixi.min.mjs';

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

// Layout increment: twelve crop beds in the approved grouped field area.
// These are visual interaction samples, not planted gameplay plots.
// Keep all five crop families and all five growth textures available.
const layout = new PIXI.Container();
world.addChild(layout);
const plots = [];
const cropOrder = [
  'kohlrabi', 'pineapple', 'chard', 'dragonfruit',
  'cauliflower', 'kohlrabi', 'pineapple', 'chard',
  'dragonfruit', 'cauliflower', 'kohlrabi', 'pineapple'
];
const FIELD = { startX: 170, startY: 190, columns: 4, gapX: 112, gapY: 118, spriteSize: 106 };
cropOrder.forEach((crop, index) => {
  const textures = cropTextures[crop];
  const sprite = new PIXI.Sprite(textures[0]);
  sprite.anchor.set(.5, .79);
  sprite.position.set(FIELD.startX + (index % FIELD.columns) * FIELD.gapX,
                      FIELD.startY + Math.floor(index / FIELD.columns) * FIELD.gapY);
  sprite.width = FIELD.spriteSize;
  sprite.height = FIELD.spriteSize;
  sprite.eventMode = 'static';
  sprite.cursor = 'pointer';
  const plot = { sprite, crop, state: 0 };
  sprite.on('pointertap', () => {
    if (moved) return;
    plot.state = (plot.state + 1) % textures.length;
    plot.sprite.texture = textures[plot.state];
  });
  layout.addChild(sprite);
  plots.push(plot);
});

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
document.getElementById('cycle').onclick = () => plots.forEach(p => { p.state = (p.state + 1) % cropTextures[p.crop].length; p.sprite.texture = cropTextures[p.crop][p.state]; });
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
  : '12 crop beds and community buildings placed. Tap a bed to advance growth; drag to pan; pinch to zoom.';

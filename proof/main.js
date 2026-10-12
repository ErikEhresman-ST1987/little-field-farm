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
let cropTextures;
try {
  const background = await PIXI.Assets.load('assets/landscape-new.webp');
  cropTextures = Object.fromEntries(await Promise.all(Object.entries(cropFiles).map(async ([crop, files]) => [crop, await Promise.all(files.map(name => PIXI.Assets.load('assets/' + name)))])));
  const scene = new PIXI.Sprite(background);
  scene.width = WORLD_W;
  scene.height = WORLD_H;
  world.addChild(scene);
} catch (error) {
  status.textContent = 'Could not load the landscape or crop artwork.';
  throw error;
}

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

let scale = 1, moved = false;
const pointers = new Map();
let pinchDistance = null;
const position = e => { const r = app.canvas.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
function fit() {
  const w = stageEl.clientWidth, h = stageEl.clientHeight;
  scale = Math.min(w / WORLD_W, h / WORLD_H);
  world.scale.set(scale);
  world.position.set((w - WORLD_W * scale) / 2, (h - WORLD_H * scale) / 2);
}
function zoom(factor, x, y) {
  const old = scale;
  scale = Math.max(.25, Math.min(3, scale * factor));
  world.x = x - (x - world.x) * scale / old;
  world.y = y - (y - world.y) * scale / old;
  world.scale.set(scale);
}
function distance(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }
stageEl.addEventListener('pointerdown', e => {
  stageEl.setPointerCapture(e.pointerId);
  pointers.set(e.pointerId, position(e));
  if (pointers.size === 1) moved = false;
  if (pointers.size === 2) pinchDistance = distance(...pointers.values());
});
stageEl.addEventListener('pointermove', e => {
  if (!pointers.has(e.pointerId)) return;
  const previous = pointers.get(e.pointerId), current = position(e);
  pointers.set(e.pointerId, current);
  if (pointers.size === 2) {
    const [a, b] = [...pointers.values()];
    const next = distance(a, b);
    if (pinchDistance) zoom(next / pinchDistance, (a.x + b.x) / 2, (a.y + b.y) / 2);
    pinchDistance = next;
    moved = true;
  } else if (pointers.size === 1) {
    const dx = current.x - previous.x, dy = current.y - previous.y;
    if (Math.hypot(dx, dy) > 1) moved = true;
    world.x += dx;
    world.y += dy;
  }
});
function endPointer(e) {
  pointers.delete(e.pointerId);
  pinchDistance = null;
  if (!pointers.size) setTimeout(() => { moved = false; }, 100);
}
stageEl.addEventListener('pointerup', endPointer);
stageEl.addEventListener('pointercancel', endPointer);
stageEl.addEventListener('wheel', e => { e.preventDefault(); const p = position(e); zoom(e.deltaY < 0 ? 1.08 : .92, p.x, p.y); }, { passive: false });
document.getElementById('reset').onclick = fit;
document.getElementById('cycle').onclick = () => plots.forEach(p => { p.state = (p.state + 1) % cropTextures[p.crop].length; p.sprite.texture = cropTextures[p.crop][p.state]; });
window.addEventListener('resize', fit);
fit();
status.textContent = '12 crop beds · 5 crop varieties. Tap a bed to advance its growth stage. Drag to pan; pinch to zoom.';

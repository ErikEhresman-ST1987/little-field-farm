import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@8.14.3/dist/pixi.min.mjs';

const stageEl = document.getElementById('stage');
const status = document.getElementById('status');
const app = new PIXI.Application();
await app.init({ resizeTo: stageEl, background: '#203b2a', antialias: true, resolution: Math.min(devicePixelRatio || 1, 2), autoDensity: true });
stageEl.appendChild(app.canvas);

const WORLD_W = 1536, WORLD_H = 1024;
const world = new PIXI.Container();
app.stage.addChild(world);
const cropNames = ['empty', 'growing', 'mature'];
let cropTextures;
try {
  const background = await PIXI.Assets.load('assets/landscape.webp');
  cropTextures = await Promise.all(cropNames.map(name => PIXI.Assets.load('assets/kohlrabi-' + name + '.webp')));
  const scene = new PIXI.Sprite(background);
  scene.width = WORLD_W;
  scene.height = WORLD_H;
  world.addChild(scene);
} catch (error) {
  status.textContent = 'Could not load the landscape or kohlrabi artwork.';
  throw error;
}

// Ranch Rush-inspired layout study: organize the WORKING grassland into
// dedicated functional zones, rather than scattering objects across the view.
// The colored pads are intentionally temporary placeholders, not approved art.
const layout = new PIXI.Container();
world.addChild(layout);
const zones = [
  { label: 'FIELDS', x: 340, y: 515, w: 540, h: 270, color: 0x9d6c37 },
  { label: 'ANIMAL PASTURE', x: 910, y: 495, w: 365, h: 250, color: 0x4e7d49 },
  { label: 'PRODUCTION', x: 930, y: 785, w: 325, h: 140, color: 0x94714c }
];
function label(text, x, y, size = 24) {
  const t = new PIXI.Text({ text, style: { fontFamily: 'Arial, sans-serif', fontSize: size, fontWeight: 'bold', fill: '#fff9e2', stroke: { color: '#34462c', width: 5 }, align: 'center' } });
  t.anchor.set(.5);
  t.position.set(x, y);
  layout.addChild(t);
}
zones.forEach(z => {
  const pad = new PIXI.Graphics().roundRect(z.x, z.y, z.w, z.h, 24).fill({ color: z.color, alpha: .28 }).roundRect(z.x, z.y, z.w, z.h, 24).stroke({ color: 0xffedb7, width: 4, alpha: .8 });
  layout.addChild(pad);
  label(z.label, z.x + z.w / 2, z.y + 26, 22);
});
label('🐄   🐐   🐓', 1090, 615, 48);
label('Bakery   •   Creamery', 1092, 857, 24);

const plots = [];
const positions = [[475, 665], [625, 665], [775, 665]];
positions.forEach((point, i) => {
  const sprite = new PIXI.Sprite(cropTextures[i]);
  sprite.anchor.set(.5, .79);
  sprite.position.set(...point);
  sprite.width = 145;
  sprite.height = 145;
  sprite.eventMode = 'static';
  sprite.cursor = 'pointer';
  sprite.on('pointertap', () => {
    if (moved) return;
    const plot = plots[i];
    plot.state = (plot.state + 1) % 3;
    plot.sprite.texture = cropTextures[plot.state];
  });
  layout.addChild(sprite);
  plots.push({ sprite, state: i });
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
document.getElementById('cycle').onclick = () => plots.forEach(p => { p.state = (p.state + 1) % 3; p.sprite.texture = cropTextures[p.state]; });
window.addEventListener('resize', fit);
fit();
status.textContent = 'Layout study: fields left, animals right, production below. Tap crops; drag and pinch to inspect.';

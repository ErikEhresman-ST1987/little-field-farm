// First Harvest: twelve independently planted beds, with migration of the original first bed.
export const CROPS = ['kohlrabi', 'pineapple', 'chard', 'dragonfruit', 'cauliflower'];
export const GROW_TIMES = Object.freeze({ kohlrabi: 30000, chard: 45000, pineapple: 90000, cauliflower: 120000, dragonfruit: 180000 });
export const GROW_MS = 30000; // Legacy constant; use growthTime(crop) for individual crops.
export function growthTime(crop) { return GROW_TIMES[crop] ?? GROW_MS; }
export function remainingGrowthMs(bed, now) { return bed ? Math.max(0, growthTime(bed.crop) - Math.max(0, now - bed.plantedAt)) : 0; }
export const PLOT_COUNT = 12;
// Temporary prices until the farm economy is balanced.
export const SELL_PRICES = Object.freeze({ kohlrabi: 3, pineapple: 5, chard: 3, dragonfruit: 7, cauliflower: 5 });
export const ORDER_CROPS = Object.freeze(['kohlrabi', 'pineapple', 'chard', 'dragonfruit', 'cauliflower']);
export const ORDER_REWARD_BONUS = 2;
export function makeOrder(number) {
  if (!Number.isSafeInteger(number) || number < 0) return null;
  const crop = ORDER_CROPS[number % ORDER_CROPS.length];
  return { number, crop, quantity: 2, reward: SELL_PRICES[crop] * 2 + ORDER_REWARD_BONUS };
}
export function fulfillOrder(farm) {
  const order = farm.order;
  if (!order || !Number.isSafeInteger(farm.inventory[order.crop]) || farm.inventory[order.crop] < order.quantity
      || !Number.isSafeInteger(farm.coins) || farm.coins > Number.MAX_SAFE_INTEGER - order.reward) return false;
  farm.inventory[order.crop] -= order.quantity;
  farm.coins += order.reward;
  farm.order = makeOrder(order.number + 1);
  return true;
}

export const BAKERY_RECIPES = Object.freeze({
  sunshine: Object.freeze({ name: 'Pineapple Sunshine Cakes', ingredients: Object.freeze({ pineapple: 2 }), duration: 45000, price: 14, image: 'pineapple-sunshine-cakes.webp' }),
  dream: Object.freeze({ name: 'Dragon Fruit Dream Cupcakes', ingredients: Object.freeze({ dragonfruit: 2 }), duration: 90000, price: 20, image: 'dragonfruit-dream-cupcakes.webp' }),
  garden: Object.freeze({ name: 'Purple Garden Pies', ingredients: Object.freeze({ cauliflower: 1, kohlrabi: 1 }), duration: 60000, price: 14, image: 'purple-garden-pies.webp' })
});
export const BAKERY_CAPACITY = 3;
export const BAKERY_PRODUCTS = Object.freeze(Object.keys(BAKERY_RECIPES));
export function emptyBakery() {
  return { queue: [], products: Object.fromEntries(BAKERY_PRODUCTS.map(id => [id, 0])) };
}
const validBakery = bakery => !!bakery && Array.isArray(bakery.queue) && bakery.queue.length <= BAKERY_CAPACITY
  && bakery.queue.every(job => !!BAKERY_RECIPES[job.recipe] && Number.isFinite(job.startedAt) && job.startedAt >= 0
    && Number.isFinite(job.endsAt) && job.endsAt >= job.startedAt && job.endsAt - job.startedAt === BAKERY_RECIPES[job.recipe].duration)
  && bakery.queue.every((job, i) => i === 0 || job.startedAt === bakery.queue[i - 1].endsAt)
  && !!bakery.products && BAKERY_PRODUCTS.every(id => Number.isSafeInteger(bakery.products[id]) && bakery.products[id] >= 0);
export function enqueueBakery(farm, recipe, now) {
  const details = BAKERY_RECIPES[recipe];
  if (!details || !validBakery(farm.bakery) || farm.bakery.queue.length >= BAKERY_CAPACITY || !Number.isFinite(now) || now < 0) return false;
  if (!Object.entries(details.ingredients).every(([crop, amount]) => Number.isSafeInteger(farm.inventory[crop]) && farm.inventory[crop] >= amount)) return false;
  const queue = farm.bakery.queue;
  const startedAt = queue.length ? Math.max(now, queue[queue.length - 1].endsAt) : now;
  const endsAt = startedAt + details.duration;
  if (!Number.isSafeInteger(endsAt)) return false;
  for (const [crop, amount] of Object.entries(details.ingredients)) farm.inventory[crop] -= amount;
  queue.push({ recipe, startedAt, endsAt });
  return true;
}
export function bakeryReadyCount(farm, now) {
  if (!validBakery(farm.bakery) || !Number.isFinite(now)) return 0;
  return farm.bakery.queue.filter(job => job.endsAt <= now).length;
}
export function collectBakery(farm, now) {
  if (!validBakery(farm.bakery) || !Number.isFinite(now)) return 0;
  const ready = bakeryReadyCount(farm, now);
  if (!ready) return 0;
  const completed = farm.bakery.queue.slice(0, ready);
  for (const id of BAKERY_PRODUCTS) {
    const count = completed.filter(job => job.recipe === id).length;
    if (farm.bakery.products[id] > Number.MAX_SAFE_INTEGER - count) return 0;
  }
  for (const job of completed) farm.bakery.products[job.recipe]++;
  farm.bakery.queue.splice(0, ready);
  return ready;
}
export function sellBakeryProduct(farm, id) {
  const recipe = BAKERY_RECIPES[id];
  if (!recipe || !Number.isSafeInteger(farm.bakery.products[id]) || farm.bakery.products[id] < 1
      || !Number.isSafeInteger(farm.coins) || farm.coins > Number.MAX_SAFE_INTEGER - recipe.price) return false;
  farm.bakery.products[id]--;
  farm.coins += recipe.price;
  return true;
}

export const SAVE_KEY = 'littleFieldFarm.firstHarvest.v1'; // Preserve existing saved progress.
export function freshFarm() { return { version: 5, coins: 0, order: makeOrder(0), bakery: emptyBakery(), beds: Array(PLOT_COUNT).fill(null), inventory: Object.fromEntries(CROPS.map(c => [c, 0])) }; }
const validBed = bed => bed === null || (!!bed && CROPS.includes(bed.crop) && Number.isFinite(bed.plantedAt) && bed.plantedAt >= 0);
const validInventory = inventory => !!inventory && CROPS.every(c => Number.isSafeInteger(inventory[c]) && inventory[c] >= 0);
export function validFarm(value) {
  return !!value && value.version === 5 && validBakery(value.bakery) && value.order && Number.isSafeInteger(value.order.number) && value.order.number >= 0 && JSON.stringify(value.order) === JSON.stringify(makeOrder(value.order.number)) && Number.isSafeInteger(value.coins) && value.coins >= 0 && Array.isArray(value.beds) && value.beds.length === PLOT_COUNT
    && value.beds.every(validBed) && validInventory(value.inventory);
}
export function loadFarm(storage) {
  try {
    const saved = JSON.parse(storage.getItem(SAVE_KEY));
    if (validFarm(saved)) return saved;
    if (saved && saved.version === 4 && saved.order && Number.isSafeInteger(saved.order.number) && saved.order.number >= 0
        && JSON.stringify(saved.order) === JSON.stringify(makeOrder(saved.order.number)) && Number.isSafeInteger(saved.coins) && saved.coins >= 0
        && Array.isArray(saved.beds) && saved.beds.length === PLOT_COUNT && saved.beds.every(validBed) && validInventory(saved.inventory)) {
      return { ...saved, version: 5, bakery: emptyBakery() };
    }
    if (saved && saved.version === 3 && Number.isSafeInteger(saved.coins) && saved.coins >= 0
        && Array.isArray(saved.beds) && saved.beds.length === PLOT_COUNT && saved.beds.every(validBed) && validInventory(saved.inventory)) {
      return { ...saved, version: 5, bakery: emptyBakery(), order: makeOrder(0) };
    }
    if (saved && saved.version === 2 && Array.isArray(saved.beds) && saved.beds.length === PLOT_COUNT
        && saved.beds.every(validBed) && validInventory(saved.inventory)) {
      return { ...saved, version: 5, bakery: emptyBakery(), coins: 0, order: makeOrder(0) };
    }
    if (saved && saved.version === 1 && validBed(saved.bed) && validInventory(saved.inventory)) {
      const upgraded = freshFarm();
      upgraded.beds[0] = saved.bed;
      upgraded.inventory = { ...saved.inventory };
      return upgraded;
    }
  } catch (error) { console.warn('Farm save could not be read:', error); }
  return freshFarm();
}
export function saveFarm(storage, farm) { storage.setItem(SAVE_KEY, JSON.stringify(farm)); }

export const BACKUP_FORMAT = 'little-field-farm-backup';
export const BACKUP_VERSION = 1;
export function createFarmBackup(farm, createdAt = new Date().toISOString()) {
  if (!validFarm(farm) || !Number.isFinite(Date.parse(createdAt))) throw new Error('Farm data is not valid for backup.');
  return JSON.stringify({ format: BACKUP_FORMAT, backupVersion: BACKUP_VERSION, createdAt, farm: structuredClone(farm) }, null, 2);
}
export function parseFarmBackup(text) {
  if (typeof text !== 'string' || text.length > 2_000_000) throw new Error('Backup file is missing or too large.');
  let data;
  try { data = JSON.parse(text); } catch { throw new Error('This file is not valid JSON.'); }
  if (!data || data.format !== BACKUP_FORMAT || data.backupVersion !== BACKUP_VERSION
      || typeof data.createdAt !== 'string' || !Number.isFinite(Date.parse(data.createdAt))
      || !validFarm(data.farm)) throw new Error('This is not a compatible Little Field Farm backup.');
  return structuredClone(data.farm);
}
export function restoreFarmBackup(storage, text) {
  const restored = parseFarmBackup(text);
  // Validate before touching the existing save. A failed storage write does not change the live farm.
  saveFarm(storage, restored);
  return restored;
}

export function stageAt(bed, now) {
  if (!bed) return -1;
  const elapsed = Math.max(0, now - bed.plantedAt);
  return Math.min(4, Math.floor(elapsed / growthTime(bed.crop) * 4));
}
export function plant(farm, index, crop, now) {
  if (!Number.isInteger(index) || index < 0 || index >= PLOT_COUNT || farm.beds[index] || !CROPS.includes(crop) || !Number.isFinite(now) || now < 0) return false;
  farm.beds[index] = { crop, plantedAt: now }; return true;
}
export function harvest(farm, index, now) {
  if (!Number.isInteger(index) || index < 0 || index >= PLOT_COUNT || !farm.beds[index] || stageAt(farm.beds[index], now) < 4) return false;
  farm.inventory[farm.beds[index].crop] += 1;
  farm.beds[index] = null; return true;
}

export function sellOne(farm, crop) {
  const price = SELL_PRICES[crop];
  if (!Number.isSafeInteger(price) || !Number.isSafeInteger(farm.inventory[crop]) || farm.inventory[crop] < 1
      || !Number.isSafeInteger(farm.coins) || farm.coins > Number.MAX_SAFE_INTEGER - price) return false;
  farm.inventory[crop] -= 1;
  farm.coins += price;
  return true;
}

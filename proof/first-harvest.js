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
  garden: Object.freeze({ name: 'Purple Garden Pies', ingredients: Object.freeze({ cauliflower: 1, kohlrabi: 1 }), duration: 60000, price: 14, image: 'purple-garden-pies.webp' }),
  tartlets: Object.freeze({ name: 'Golden Sunrise Tartlets', ingredients: Object.freeze({ egg: 2, pineapple: 1 }), duration: 75000, price: 15, image: 'golden-sunrise-tartlets.webp' })
});
export const BAKERY_CAPACITY = 3;
export const BAKERY_PRODUCTS = Object.freeze(Object.keys(BAKERY_RECIPES));
export const INVENTORY_ITEMS = Object.freeze([...CROPS, ...BAKERY_PRODUCTS, 'egg']);
export function emptyInventory() { return Object.fromEntries(INVENTORY_ITEMS.map(id => [id, 0])); }
export function emptyBakery() {
  return { queue: [] };
}
const validBakery = bakery => !!bakery && Array.isArray(bakery.queue) && bakery.queue.length <= BAKERY_CAPACITY
  && bakery.queue.every(job => !!BAKERY_RECIPES[job.recipe] && Number.isFinite(job.startedAt) && job.startedAt >= 0
    && Number.isFinite(job.endsAt) && job.endsAt >= job.startedAt && job.endsAt - job.startedAt === BAKERY_RECIPES[job.recipe].duration)
  && bakery.queue.every((job, i) => i === 0 || job.startedAt === bakery.queue[i - 1].endsAt)
;
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
    if (farm.inventory[id] > Number.MAX_SAFE_INTEGER - count) return 0;
  }
  for (const job of completed) farm.inventory[job.recipe]++;
  farm.bakery.queue.splice(0, ready);
  return ready;
}
export function sellBakeryProduct(farm, id) {
  const recipe = BAKERY_RECIPES[id];
  if (!recipe || !Number.isSafeInteger(farm.inventory[id]) || farm.inventory[id] < 1
      || !Number.isSafeInteger(farm.coins) || farm.coins > Number.MAX_SAFE_INTEGER - recipe.price) return false;
  farm.inventory[id]--;
  farm.coins += recipe.price;
  return true;
}

export const CHICKEN_DURATION = 60000;
export const EGG_BATCH = 3;
export const EGG_PRICE = 2;
export const emptyChicken = () => ({ startedAt: null });
const validChicken = chicken => !!chicken && (chicken.startedAt === null || (Number.isSafeInteger(chicken.startedAt) && chicken.startedAt >= 0));
export function chickenState(farm, now) {
  if (!validChicken(farm.chicken)) return 'invalid';
  if (farm.chicken.startedAt === null) return 'hungry';
  return now >= farm.chicken.startedAt + CHICKEN_DURATION ? 'ready' : 'producing';
}
export function feedChickens(farm, now) {
  if (!Number.isSafeInteger(now) || now < 0 || chickenState(farm, now) !== 'hungry' || !Number.isSafeInteger(farm.inventory.chard) || farm.inventory.chard < 1) return false;
  farm.inventory.chard--;
  farm.chicken.startedAt = now;
  return true;
}
export function collectEggs(farm, now) {
  if (chickenState(farm, now) !== 'ready' || !Number.isSafeInteger(farm.inventory.egg) || farm.inventory.egg > Number.MAX_SAFE_INTEGER - EGG_BATCH) return false;
  farm.inventory.egg += EGG_BATCH;
  farm.chicken.startedAt = null;
  return true;
}
export function sellEgg(farm) {
  if (!Number.isSafeInteger(farm.inventory.egg) || farm.inventory.egg < 1 || !Number.isSafeInteger(farm.coins) || farm.coins > Number.MAX_SAFE_INTEGER - EGG_PRICE) return false;
  farm.inventory.egg--;
  farm.coins += EGG_PRICE;
  return true;
}

export const SAVE_KEY = 'littleFieldFarm.firstHarvest.v1'; // Preserve existing saved progress.
export function freshFarm() { return { version: 8, chicken: emptyChicken(), coins: 0, order: makeOrder(0), bakery: emptyBakery(), beds: Array(PLOT_COUNT).fill(null), inventory: emptyInventory() }; }
const validBed = bed => bed === null || (!!bed && CROPS.includes(bed.crop) && Number.isFinite(bed.plantedAt) && bed.plantedAt >= 0);
const validInventory = (inventory, ids = INVENTORY_ITEMS) => !!inventory && ids.every(c => Number.isSafeInteger(inventory[c]) && inventory[c] >= 0);
const validLegacyBakery = bakery => !!bakery && validBakery(bakery) && !!bakery.products && validInventory(bakery.products, ['sunshine', 'dream', 'garden']);
const validOrder = order => !!order && Number.isSafeInteger(order.number) && order.number >= 0 && JSON.stringify(order) === JSON.stringify(makeOrder(order.number));
const validCore = value => !!value && Number.isSafeInteger(value.coins) && value.coins >= 0 && Array.isArray(value.beds) && value.beds.length === PLOT_COUNT && value.beds.every(validBed);
function migrateFarm(saved) {
  if (validFarm(saved)) return saved;
  if (!saved) return null;
  if (saved.version === 2 && Array.isArray(saved.beds) && saved.beds.length === PLOT_COUNT && saved.beds.every(validBed) && validInventory(saved.inventory, CROPS)) {
    return migrateFarm({ ...saved, version: 3, coins: 0 });
  }
  if (!validCore(saved)) return null;
  if (saved.version === 7 && validCore(saved) && validOrder(saved.order) && validChicken(saved.chicken)
      && validBakery(saved.bakery) && validInventory(saved.inventory, [...CROPS, 'sunshine', 'dream', 'garden', 'egg'])) {
    const upgraded = { ...saved, version: 8, inventory: { ...saved.inventory, tartlets: 0 } };
    return validFarm(upgraded) ? upgraded : null;
  }
  if (saved.version === 6 && validCore(saved) && validOrder(saved.order) && validBakery(saved.bakery) && validInventory(saved.inventory, [...CROPS, 'sunshine', 'dream', 'garden'])) {
    const upgraded = { ...saved, version: 7, chicken: emptyChicken(), inventory: { ...saved.inventory, egg: 0 } };
    return migrateFarm(upgraded);
  }
  if (saved.version === 5 && validOrder(saved.order) && validLegacyBakery(saved.bakery) && validInventory(saved.inventory, CROPS)) {
    const migrated = { ...saved, version: 6, bakery: { queue: structuredClone(saved.bakery.queue) }, inventory: { ...saved.inventory, ...saved.bakery.products } };
    return migrateFarm(migrated);
  }
  if (saved.version === 4 && validOrder(saved.order) && validInventory(saved.inventory, CROPS)) {
    return migrateFarm({ ...saved, version: 5, bakery: { queue: [], products: Object.fromEntries(BAKERY_PRODUCTS.map(id => [id, 0])) } });
  }
  if (saved.version === 3 && validInventory(saved.inventory, CROPS)) return migrateFarm({ ...saved, version: 4, order: makeOrder(0) });
  return null;
}
export function validFarm(value) {
  return !!value && value.version === 8 && validChicken(value.chicken) && validCore(value) && validOrder(value.order)
    && validBakery(value.bakery) && validInventory(value.inventory);
}
export function loadFarm(storage) {
  try {
    const saved = JSON.parse(storage.getItem(SAVE_KEY));
    const migrated = migrateFarm(saved);
    if (migrated) return migrated;
    if (saved && saved.version === 1 && validBed(saved.bed) && validInventory(saved.inventory, CROPS)) {
      const upgraded = freshFarm();
      upgraded.beds[0] = saved.bed;
      Object.assign(upgraded.inventory, saved.inventory);
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
       ) throw new Error('This is not a compatible Little Field Farm backup.');
  const migrated = migrateFarm(data.farm);
  if (!migrated) throw new Error('This is not a compatible Little Field Farm backup.');
  return structuredClone(migrated);
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

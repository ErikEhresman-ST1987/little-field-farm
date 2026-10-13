// First Harvest: twelve independently planted beds, with migration of the original first bed.
export const CROPS = ['kohlrabi', 'pineapple', 'chard', 'dragonfruit', 'cauliflower'];
export const GROW_MS = 30000; // Provisional 30-second test cycle.
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
export const SAVE_KEY = 'littleFieldFarm.firstHarvest.v1'; // Preserve existing saved progress.
export function freshFarm() { return { version: 4, coins: 0, order: makeOrder(0), beds: Array(PLOT_COUNT).fill(null), inventory: Object.fromEntries(CROPS.map(c => [c, 0])) }; }
const validBed = bed => bed === null || (!!bed && CROPS.includes(bed.crop) && Number.isFinite(bed.plantedAt) && bed.plantedAt >= 0);
const validInventory = inventory => !!inventory && CROPS.every(c => Number.isSafeInteger(inventory[c]) && inventory[c] >= 0);
export function validFarm(value) {
  return !!value && value.version === 4 && value.order && Number.isSafeInteger(value.order.number) && value.order.number >= 0 && JSON.stringify(value.order) === JSON.stringify(makeOrder(value.order.number)) && Number.isSafeInteger(value.coins) && value.coins >= 0 && Array.isArray(value.beds) && value.beds.length === PLOT_COUNT
    && value.beds.every(validBed) && validInventory(value.inventory);
}
export function loadFarm(storage) {
  try {
    const saved = JSON.parse(storage.getItem(SAVE_KEY));
    if (validFarm(saved)) return saved;
    if (saved && saved.version === 3 && Number.isSafeInteger(saved.coins) && saved.coins >= 0
        && Array.isArray(saved.beds) && saved.beds.length === PLOT_COUNT && saved.beds.every(validBed) && validInventory(saved.inventory)) {
      return { ...saved, version: 4, order: makeOrder(0) };
    }
    if (saved && saved.version === 2 && Array.isArray(saved.beds) && saved.beds.length === PLOT_COUNT
        && saved.beds.every(validBed) && validInventory(saved.inventory)) {
      return { ...saved, version: 4, coins: 0, order: makeOrder(0) };
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
export function stageAt(bed, now) {
  if (!bed) return -1;
  const elapsed = Math.max(0, now - bed.plantedAt);
  return Math.min(4, Math.floor(elapsed / GROW_MS * 4));
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

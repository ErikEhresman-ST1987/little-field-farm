// First Harvest: independent, testable single-bed gameplay rules.
export const CROPS = ['kohlrabi', 'pineapple', 'chard', 'dragonfruit', 'cauliflower'];
export const GROW_MS = 30000; // Provisional 30-second test cycle.
export const SAVE_KEY = 'littleFieldFarm.firstHarvest.v1';
export function freshFarm() { return { version: 1, bed: null, inventory: Object.fromEntries(CROPS.map(c => [c, 0])) }; }
export function validFarm(value) {
  return !!value && value.version === 1 && value.inventory && CROPS.every(c => Number.isSafeInteger(value.inventory[c]) && value.inventory[c] >= 0)
    && (value.bed === null || (CROPS.includes(value.bed.crop) && Number.isFinite(value.bed.plantedAt) && value.bed.plantedAt >= 0));
}
export function loadFarm(storage) {
  try { const saved = JSON.parse(storage.getItem(SAVE_KEY)); return validFarm(saved) ? saved : freshFarm(); }
  catch { return freshFarm(); }
}
export function saveFarm(storage, farm) { storage.setItem(SAVE_KEY, JSON.stringify(farm)); }
export function stageAt(bed, now) {
  if (!bed) return -1;
  const elapsed = Math.max(0, now - bed.plantedAt);
  return Math.min(4, Math.floor(elapsed / GROW_MS * 4));
}
export function plant(farm, crop, now) {
  if (farm.bed || !CROPS.includes(crop) || !Number.isFinite(now)) return false;
  farm.bed = { crop, plantedAt: now }; return true;
}
export function harvest(farm, now) {
  if (!farm.bed || stageAt(farm.bed, now) < 4) return false;
  farm.inventory[farm.bed.crop] += 1;
  farm.bed = null; return true;
}

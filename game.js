(function () {
  "use strict";

  const SAVE_KEY = "littleFieldFarm.v1";
  const SHED_LEVELS = [
    { name: "Original Shed", capacity: 6, cost: 0 },
    { name: "Roomier Shed", capacity: 10, cost: 24 },
    { name: "Storage Loft", capacity: 16, cost: 70 },
    { name: "Farm Storehouse", capacity: 24, cost: 160 },
    { name: "Grand Storehouse", capacity: 32, cost: 280, supplyCost: 2 }
  ];
  const COOP_COST = 60;
  const EGG_TIME_MS = 60000;
  const EGGS_PER_BATCH = 2;
  const BAKERY_COST = 100;
  const BREAD_TIME_MS = 90000;
  const BAKERY_UPGRADE_COST = 160;
  const BAKERY_UPGRADE_SUPPLY_COST = 2;
  const PIE_TIME_MS = 120000;
  const LAND_EXPANSION = { name: "South Field", plotCount: 9, coinCost: 90, supplyCost: 1 };
  const COW_PASTURE_COST = 140;
  const COW_PASTURE_SUPPLY_COST = 2;
  const MILK_TIME_MS = 90000;
  const MILK_PER_BATCH = 2;
  const GOAT_MEADOW_COST = 190;
  const GOAT_MEADOW_SUPPLY_COST = 2;
  const GOAT_MILK_TIME_MS = 75000;
  const GOAT_MILK_PER_BATCH = 2;
  const CREAMERY_COST = 240;
  const CREAMERY_SUPPLY_COST = 3;
  const CHEESE_TIME_MS = 120000;
  const CREAMERY_UPGRADE_COST = 210;
  const CREAMERY_UPGRADE_SUPPLY_COST = 2;
  const BUTTER_TIME_MS = 100000;
  const CROPS = {
    carrot: { name: "Carrots", cost: 2, price: 5, growMs: 20000, storage: 1, color: "#ef8137" },
    wheat: { name: "Wheat", cost: 4, price: 10, growMs: 45000, storage: 1, color: "#e2b84f" },
    pumpkin: { name: "Pumpkin", cost: 7, price: 19, growMs: 90000, storage: 2, color: "#df6f2e" }
  };
  const PRODUCTS = {
    ...CROPS,
    egg: { name: "Eggs", price: 8, storage: 1, color: "#f3e7bd" },
    bread: { name: "Bread", price: 25, storage: 1, color: "#c9823d" },
    milk: { name: "Milk", price: 12, storage: 1, color: "#f5f4e9" },
    goatMilk: { name: "Goat Milk", price: 14, storage: 1, color: "#f7f0df" },
    cheese: { name: "Goat Cheese", price: 38, storage: 1, color: "#f2d56b" },
    pie: { name: "Pumpkin Pie", price: 50, storage: 1, color: "#d77a32" },
    butter: { name: "Butter", price: 32, storage: 1, color: "#f3d96b" }
  };
  const ORDERS = [
    { id: "carrot-basket", title: "Carrot Basket", requester: "Marta Hill", requesterType: "neighbor", reason: "My grandchildren are visiting, and carrot soup is their favorite.", needs: { carrot: 2 }, reward: 12 },
    { id: "pantry-basics", title: "Pantry Basics", requester: "Nora Finch", requesterType: "neighbor", reason: "I’m restocking the pantry before the family arrives.", needs: { carrot: 1, wheat: 1 }, reward: 18 },
    { id: "miller-bundle", title: "Miller’s Bundle", requester: "Millbrook Grocer", requesterType: "market", reason: "The grain shelf is nearly bare after a busy morning.", needs: { wheat: 2 }, reward: 24 },
    { id: "harvest-pair", title: "Harvest Pair", requester: "Saturday Market", requesterType: "market", reason: "Shoppers have been asking for a simple farm-fresh bundle.", needs: { carrot: 2, wheat: 1 }, reward: 24 },
    { id: "autumn-basket", title: "Autumn Basket", requester: "June Bell", requesterType: "neighbor", reason: "I’m putting together a welcoming basket for new neighbors.", needs: { carrot: 1, pumpkin: 1 }, reward: 29 },
    { id: "baker-supply", title: "Baker’s Supply", requester: "The Copper Kettle", requesterType: "restaurant", reason: "Tonight’s harvest supper needs a fresh seasonal side.", needs: { wheat: 1, pumpkin: 1 }, reward: 35 },
    { id: "pumpkin-porch", title: "Pumpkin Porch", requester: "Hollow Creek Market", requesterType: "market", reason: "Our autumn display needs two bright farm pumpkins.", needs: { pumpkin: 2 }, reward: 46 },
    { id: "breakfast-dozen", title: "Breakfast Basket", requester: "Sunrise Café", requesterType: "restaurant", reason: "The breakfast crowd used our last fresh eggs.", needs: { egg: 2 }, reward: 20, requiresCoop: true },
    { id: "country-breakfast", title: "Country Breakfast", requester: "Elias Green", requesterType: "neighbor", reason: "I promised the family a proper country breakfast tomorrow.", needs: { carrot: 1, egg: 2 }, reward: 26, requiresCoop: true },
    { id: "baker-eggs", title: "Baker’s Eggs", requester: "Hearth & Spoon", requesterType: "restaurant", reason: "We need eggs and grain for the afternoon baking.", needs: { wheat: 1, egg: 2 }, reward: 32, requiresCoop: true },
    { id: "autumn-kitchen", title: "Autumn Kitchen", requester: "The Copper Kettle", requesterType: "restaurant", reason: "Our seasonal menu needs something hearty from the farm.", needs: { pumpkin: 1, egg: 2 }, reward: 43, requiresCoop: true },
    { id: "fresh-loaf", title: "Fresh Loaf", requester: "Samuel Reed", requesterType: "neighbor", reason: "A warm loaf would make tonight’s supper complete.", needs: { bread: 1 }, reward: 30, requiresBakery: true },
    { id: "lunch-basket", title: "Lunch Basket", requester: "Marta Hill", requesterType: "neighbor", reason: "I’m packing a farm lunch for a day by the creek.", needs: { carrot: 1, bread: 1 }, reward: 36, requiresBakery: true },
    { id: "harvest-table", title: "Harvest Table", requester: "Hollow Creek Market", requesterType: "market", reason: "We’re featuring complete farm meals at this week’s stall.", needs: { pumpkin: 1, bread: 1 }, reward: 53, requiresBakery: true },
    { id: "two-loaves", title: "Two Loaves", requester: "Hearth & Spoon", requesterType: "restaurant", reason: "The dinner tables need two more fresh loaves tonight.", needs: { bread: 2 }, reward: 60, requiresBakery: true },
    { id: "morning-milk", title: "Morning Milk", requester: "Marta Hill", requesterType: "neighbor", reason: "The family would love fresh milk with breakfast tomorrow.", needs: { milk: 2 }, reward: 29, requiresCow: true },
    { id: "farm-breakfast", title: "Farm Breakfast", requester: "Sunrise Café", requesterType: "restaurant", reason: "We’re adding a complete farm breakfast to today’s chalkboard.", needs: { carrot: 1, egg: 1, milk: 1 }, reward: 31, requiresCoop: true, requiresCow: true },
    { id: "cafe-dairy", title: "Café Dairy", requester: "The Copper Kettle", requesterType: "restaurant", reason: "Fresh bread and milk will finish our afternoon service nicely.", needs: { bread: 1, milk: 1 }, reward: 44, requiresBakery: true, requiresCow: true },
    { id: "hillside-milk", title: "Hillside Milk", requester: "Nora Finch", requesterType: "neighbor", reason: "I’d love fresh goat milk for a family recipe.", needs: { goatMilk: 2 }, reward: 34, requiresGoat: true },
    { id: "cafe-goat-milk", title: "Café Goat Milk", requester: "Sunrise Café", requesterType: "restaurant", reason: "Our weekend breakfast special needs something from the goat meadow.", needs: { bread: 1, goatMilk: 1 }, reward: 47, requiresBakery: true, requiresGoat: true },
    { id: "cheese-board", title: "Cheese Board", requester: "Hearth & Spoon", requesterType: "restaurant", reason: "A small farmhouse cheese would complete tonight’s tasting board.", needs: { cheese: 1 }, reward: 46, requiresCreamery: true },
    { id: "market-cheese", title: "Market Cheese", requester: "Saturday Market", requesterType: "market", reason: "Shoppers have been asking for a locally made goat cheese.", needs: { cheese: 1, carrot: 1 }, reward: 53, requiresCreamery: true },
    { id: "picnic-preparations", title: "Picnic Preparations", requester: "Little Field Council", requesterType: "market", reason: "The town picnic needs a dependable basket of fresh produce.", needs: { carrot: 2, wheat: 1 }, reward: 26, supplyCrates: 1, special: true },
    { id: "harvest-window", title: "Harvest Window", requester: "Millbrook Grocer", requesterType: "market", reason: "Help us build a colorful window display for harvest week.", needs: { carrot: 1, wheat: 1, pumpkin: 1 }, reward: 41, supplyCrates: 1, special: true },
    { id: "breakfast-rush", title: "Breakfast Rush", requester: "Sunrise Café", requesterType: "restaurant", reason: "A visiting walking club has filled every breakfast table.", needs: { wheat: 1, egg: 2 }, reward: 28, supplyCrates: 1, special: true, requiresCoop: true },
    { id: "community-lunch", title: "Community Lunch", requester: "The Copper Kettle", requesterType: "restaurant", reason: "We’re preparing a thank-you lunch for local volunteers.", needs: { carrot: 1, egg: 1, bread: 1 }, reward: 44, supplyCrates: 1, special: true, requiresBakery: true },
    { id: "festival-table", title: "Festival Table", requester: "Saturday Market", requesterType: "market", reason: "The fall festival table needs a centerpiece and a fresh loaf.", needs: { pumpkin: 1, bread: 1 }, reward: 49, supplyCrates: 1, special: true, requiresBakery: true },
    { id: "community-breakfast", title: "Community Breakfast", requester: "Little Field Council", requesterType: "market", reason: "The community breakfast needs fresh milk and grain from a local farm.", needs: { wheat: 1, milk: 2 }, reward: 40, supplyCrates: 1, special: true, requiresCow: true },
    { id: "creamery-showcase", title: "Creamery Showcase", requester: "Hollow Creek Market", requesterType: "market", reason: "We’re featuring the valley’s newest farmhouse products this week.", needs: { goatMilk: 1, cheese: 1 }, reward: 61, supplyCrates: 1, special: true, requiresCreamery: true },
    { id: "pumpkin-pie", title: "Pumpkin Pie", requester: "Nora Finch", requesterType: "neighbor", reason: "A warm pumpkin pie would be lovely for our family supper.", needs: { pie: 1 }, reward: 60, requiresBakeryUpgrade: true },
    { id: "pie-and-milk", title: "Pie & Milk", requester: "Sunrise Café", requesterType: "restaurant", reason: "Our afternoon special needs a fresh pie and a bottle of milk.", needs: { pie: 1, milk: 1 }, reward: 75, requiresBakeryUpgrade: true, requiresCow: true },
    { id: "fresh-butter", title: "Fresh Butter", requester: "Marta Hill", requesterType: "neighbor", reason: "Fresh farm butter would make tomorrow’s breakfast extra special.", needs: { butter: 1 }, reward: 39, requiresCreameryUpgrade: true },
    { id: "bread-and-butter", title: "Bread & Butter", requester: "Hearth & Spoon", requesterType: "restaurant", reason: "Our supper tables need a simple basket of bread and farm butter.", needs: { bread: 1, butter: 1 }, reward: 69, requiresBakery: true, requiresCreameryUpgrade: true },
    { id: "harvest-dessert", title: "Harvest Dessert", requester: "Saturday Market", requesterType: "market", reason: "The harvest celebration needs a rich farm-made dessert table.", needs: { pie: 1, butter: 1 }, reward: 100, supplyCrates: 1, special: true, requiresBakeryUpgrade: true, requiresCreameryUpgrade: true }
  ];

  const freshState = () => ({
    coins: 18,
    capacity: 6,
    upgraded: false,
    shedLevel: 0,
    supplyCrates: 0,
    ordersSinceSpecial: 0,
    plotCount: 6,
    activeOrder: null,
    inventory: { carrot: 0, wheat: 0, pumpkin: 0, egg: 0, bread: 0, milk: 0, goatMilk: 0, cheese: 0, pie: 0, butter: 0 },
    coop: { built: false, readyAt: null, eggsReady: 0 },
    bakery: { built: false, upgraded: false, selectedRecipe: "bread", activeRecipe: null, readyAt: null, breadReady: 0, pieReady: 0 },
    cow: { built: false, readyAt: null, milkReady: 0 },
    goat: { built: false, readyAt: null, milkReady: 0 },
    creamery: { built: false, upgraded: false, selectedRecipe: "cheese", activeRecipe: null, readyAt: null, cheeseReady: 0, butterReady: 0 },
    plots: Array.from({ length: 6 }, () => null)
  });

  let state = loadState();
  const loadedOrder = findOrder(state.activeOrder);
  if (!loadedOrder || !orderIsEligible(loadedOrder)) {
    state.activeOrder = chooseOrder();
    saveState();
  }
  let selectedPlot = null;
  let ticker = null;
  let completingOrder = false;
  let upgradingShed = false;
  let purchasingLand = false;
  let upgradingBakery = false;
  let upgradingCreamery = false;

  const els = {
    coins: document.querySelector("#coin-count"), storageCount: document.querySelector("#storage-count"),
    supplyCount: document.querySelector("#supply-count"),
    grid: document.querySelector("#plot-grid"), status: document.querySelector("#status-message"),
    overlay: document.querySelector("#overlay"), plantSheet: document.querySelector("#plant-sheet"),
    storageSheet: document.querySelector("#storage-sheet"), marketSheet: document.querySelector("#market-sheet"),
    landSheet: document.querySelector("#land-sheet"), landButton: document.querySelector("#land-button"),
    landMessage: document.querySelector("#land-message"), landCoinCost: document.querySelector("#land-coin-cost"),
    landSupplyCost: document.querySelector("#land-supply-cost"), landAction: document.querySelector("#land-action-button"),
    coopSheet: document.querySelector("#coop-sheet"), coopButton: document.querySelector("#coop-button"),
    coopBoardLabel: document.querySelector("#coop-board-label"), eggReadyBadge: document.querySelector("#egg-ready-badge"),
    coopSubtitle: document.querySelector("#coop-subtitle"), coopStateTitle: document.querySelector("#coop-state-title"),
    coopStateMessage: document.querySelector("#coop-state-message"), coopProgress: document.querySelector("#coop-progress"),
    coopProgressBar: document.querySelector("#coop-progress-bar"), coopRecipe: document.querySelector("#coop-recipe"),
    coopAction: document.querySelector("#coop-action-button"),
    bakerySheet: document.querySelector("#bakery-sheet"), bakeryButton: document.querySelector("#bakery-button"),
    bakeryBoardLabel: document.querySelector("#bakery-board-label"), breadReadyBadge: document.querySelector("#bread-ready-badge"),
    bakerySubtitle: document.querySelector("#bakery-subtitle"), bakeryStateTitle: document.querySelector("#bakery-state-title"),
    bakeryStateMessage: document.querySelector("#bakery-state-message"), bakeryProgress: document.querySelector("#bakery-progress"),
    bakeryProgressBar: document.querySelector("#bakery-progress-bar"), bakeryRecipe: document.querySelector("#bakery-recipe"),
    bakeryAction: document.querySelector("#bakery-action-button"), bakeryRecipePicker: document.querySelector("#bakery-recipe-picker"),
    bakeryUpgrade: document.querySelector("#bakery-upgrade"), bakeryUpgradeButton: document.querySelector("#bakery-upgrade-button"),
    cowSheet: document.querySelector("#cow-sheet"), cowButton: document.querySelector("#cow-button"),
    cowBoardLabel: document.querySelector("#cow-board-label"), milkReadyBadge: document.querySelector("#milk-ready-badge"),
    cowSubtitle: document.querySelector("#cow-subtitle"), cowStateTitle: document.querySelector("#cow-state-title"),
    cowStateMessage: document.querySelector("#cow-state-message"), cowProgress: document.querySelector("#cow-progress"),
    cowProgressBar: document.querySelector("#cow-progress-bar"), cowRecipe: document.querySelector("#cow-recipe"),
    cowAction: document.querySelector("#cow-action-button"),
    goatSheet: document.querySelector("#goat-sheet"), goatButton: document.querySelector("#goat-button"),
    goatBoardLabel: document.querySelector("#goat-board-label"), goatMilkReadyBadge: document.querySelector("#goat-milk-ready-badge"),
    goatSubtitle: document.querySelector("#goat-subtitle"), goatStateTitle: document.querySelector("#goat-state-title"),
    goatStateMessage: document.querySelector("#goat-state-message"), goatProgress: document.querySelector("#goat-progress"),
    goatProgressBar: document.querySelector("#goat-progress-bar"), goatRecipe: document.querySelector("#goat-recipe"),
    goatAction: document.querySelector("#goat-action-button"),
    creamerySheet: document.querySelector("#creamery-sheet"), creameryButton: document.querySelector("#creamery-button"),
    creameryBoardLabel: document.querySelector("#creamery-board-label"), cheeseReadyBadge: document.querySelector("#cheese-ready-badge"),
    creamerySubtitle: document.querySelector("#creamery-subtitle"), creameryStateTitle: document.querySelector("#creamery-state-title"),
    creameryStateMessage: document.querySelector("#creamery-state-message"), creameryProgress: document.querySelector("#creamery-progress"),
    creameryProgressBar: document.querySelector("#creamery-progress-bar"), creameryRecipe: document.querySelector("#creamery-recipe"),
    creameryAction: document.querySelector("#creamery-action-button"), creameryRecipePicker: document.querySelector("#creamery-recipe-picker"),
    creameryUpgrade: document.querySelector("#creamery-upgrade"), creameryUpgradeButton: document.querySelector("#creamery-upgrade-button"),
    cropChoices: document.querySelector("#crop-choices"), inventoryList: document.querySelector("#inventory-list"),
    marketList: document.querySelector("#market-list"), upgradeButton: document.querySelector("#upgrade-button"),
    upgradeTitle: document.querySelector("#upgrade-title"), upgradeDescription: document.querySelector("#upgrade-description"),
    upgradeCard: document.querySelector("#upgrade-card"), shed: document.querySelector("#shed-button"),
    shedExtension: document.querySelector("#shed-extension"), storageSubtitle: document.querySelector("#storage-subtitle"),
    sellAll: document.querySelector("#sell-all-button"), orderTitle: document.querySelector("#order-title"),
    orderCard: document.querySelector(".order-card"), orderAvatar: document.querySelector("#order-avatar"),
    orderType: document.querySelector("#order-type"), orderRequester: document.querySelector("#order-requester"),
    orderReason: document.querySelector("#order-reason"), orderReward: document.querySelector("#order-reward"),
    orderSupplyReward: document.querySelector("#order-supply-reward"), orderRequirements: document.querySelector("#order-requirements"),
    completeOrder: document.querySelector("#complete-order-button")
  };

  function findOrder(orderId) { return ORDERS.find(order => order.id === orderId); }

  function orderIsEligible(order) {
    return (!order.requiresCoop || state.coop.built) && (!order.requiresBakery || state.bakery.built) &&
      (!order.requiresBakeryUpgrade || state.bakery.upgraded) && (!order.requiresCow || state.cow.built) &&
      (!order.requiresGoat || state.goat.built) && (!order.requiresCreamery || state.creamery.built) &&
      (!order.requiresCreameryUpgrade || state.creamery.upgraded);
  }

  function chooseOrder(excludeId = null) {
    const eligible = ORDERS.filter(order => order.id !== excludeId && orderIsEligible(order));
    const specialDue = state.ordersSinceSpecial >= 3;
    const choices = eligible.filter(order => specialDue ? order.special : !order.special);
    return choices[Math.floor(Math.random() * choices.length)].id;
  }

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(SAVE_KEY));
      if (!saved || !Array.isArray(saved.plots)) return freshState();
      const restoredPlotCount = saved.plotCount >= LAND_EXPANSION.plotCount || saved.plots.length >= LAND_EXPANSION.plotCount
        ? LAND_EXPANSION.plotCount
        : 6;
      const merged = {
        ...freshState(), ...saved,
        inventory: { ...freshState().inventory, ...(saved.inventory || {}) },
        coop: { ...freshState().coop, ...(saved.coop || {}) },
        bakery: { ...freshState().bakery, ...(saved.bakery || {}) },
        cow: { ...freshState().cow, ...(saved.cow || {}) },
        goat: { ...freshState().goat, ...(saved.goat || {}) },
        creamery: { ...freshState().creamery, ...(saved.creamery || {}) },
        plotCount: restoredPlotCount,
        plots: Array.from({ length: restoredPlotCount }, (_, i) => saved.plots[i] || null)
      };
      const inferredLevel = Number.isInteger(saved.shedLevel)
        ? saved.shedLevel
        : saved.capacity >= 24 ? 3 : saved.capacity >= 16 ? 2 : (saved.upgraded || saved.capacity >= 10) ? 1 : 0;
      merged.shedLevel = Math.min(SHED_LEVELS.length - 1, Math.max(0, inferredLevel));
      merged.capacity = SHED_LEVELS[merged.shedLevel].capacity;
      merged.upgraded = merged.shedLevel >= 1;
      merged.supplyCrates = Math.max(0, Number.isFinite(saved.supplyCrates) ? Math.floor(saved.supplyCrates) : 0);
      merged.ordersSinceSpecial = Math.min(3, Math.max(0, Number.isFinite(saved.ordersSinceSpecial) ? Math.floor(saved.ordersSinceSpecial) : 0));
      if (merged.bakery.readyAt && !merged.bakery.activeRecipe) merged.bakery.activeRecipe = "bread";
      if (merged.creamery.readyAt && !merged.creamery.activeRecipe) merged.creamery.activeRecipe = "cheese";
      if (!merged.bakery.upgraded) merged.bakery.selectedRecipe = "bread";
      if (!merged.creamery.upgraded) merged.creamery.selectedRecipe = "cheese";
      return merged;
    } catch (_) { return freshState(); }
  }

  function saveState() { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); }
  function usedStorage() { return Object.entries(state.inventory).reduce((sum, [key, count]) => sum + PRODUCTS[key].storage * count, 0); }
  function totalItems() { return Object.values(state.inventory).reduce((sum, count) => sum + count, 0); }
  function canCompleteOrder(order) {
    return Object.entries(order.needs).every(([key, amount]) => state.inventory[key] >= amount);
  }
  function cropStage(plot, now = Date.now()) {
    const ratio = Math.max(0, (now - plot.plantedAt) / CROPS[plot.crop].growMs);
    if (ratio >= 1) return 3;
    if (ratio >= .45) return 2;
    return 1;
  }

  function remainingText(plot) {
    const remaining = Math.max(0, CROPS[plot.crop].growMs - (Date.now() - plot.plantedAt));
    if (!remaining) return "Ready!";
    return `${Math.ceil(remaining / 1000)}s`;
  }

  function setStatus(message) { els.status.textContent = message; }

  function updateCoopProduction(now = Date.now()) {
    if (!state.coop.built || !state.coop.readyAt || now < state.coop.readyAt) return false;
    state.coop.readyAt = null;
    state.coop.eggsReady = EGGS_PER_BATCH;
    saveState();
    return true;
  }

  function coopRemainingMs(now = Date.now()) {
    return Math.max(0, (state.coop.readyAt || now) - now);
  }

  function updateBakeryProduction(now = Date.now()) {
    if (!state.bakery.built || !state.bakery.readyAt || now < state.bakery.readyAt) return false;
    const recipe = state.bakery.activeRecipe || "bread";
    state.bakery.readyAt = null;
    state.bakery.activeRecipe = null;
    if (recipe === "pie") state.bakery.pieReady = 1;
    else state.bakery.breadReady = 1;
    saveState();
    return true;
  }

  function bakeryRemainingMs(now = Date.now()) {
    return Math.max(0, (state.bakery.readyAt || now) - now);
  }

  function updateCowProduction(now = Date.now()) {
    if (!state.cow.built || !state.cow.readyAt || now < state.cow.readyAt) return false;
    state.cow.readyAt = null;
    state.cow.milkReady = MILK_PER_BATCH;
    saveState();
    return true;
  }

  function cowRemainingMs(now = Date.now()) {
    return Math.max(0, (state.cow.readyAt || now) - now);
  }

  function updateGoatProduction(now = Date.now()) {
    if (!state.goat.built || !state.goat.readyAt || now < state.goat.readyAt) return false;
    state.goat.readyAt = null;
    state.goat.milkReady = GOAT_MILK_PER_BATCH;
    saveState();
    return true;
  }

  function goatRemainingMs(now = Date.now()) {
    return Math.max(0, (state.goat.readyAt || now) - now);
  }

  function updateCreameryProduction(now = Date.now()) {
    if (!state.creamery.built || !state.creamery.readyAt || now < state.creamery.readyAt) return false;
    const recipe = state.creamery.activeRecipe || "cheese";
    state.creamery.readyAt = null;
    state.creamery.activeRecipe = null;
    if (recipe === "butter") state.creamery.butterReady = 1;
    else state.creamery.cheeseReady = 1;
    saveState();
    return true;
  }

  function creameryRemainingMs(now = Date.now()) {
    return Math.max(0, (state.creamery.readyAt || now) - now);
  }

  function itemDotClass(key) {
    return key === "egg" ? " egg-dot" : key === "bread" ? " bread-dot" : key === "milk" ? " milk-dot" : key === "goatMilk" ? " goat-milk-dot" : key === "cheese" ? " cheese-dot" : key === "pie" ? " pie-dot" : key === "butter" ? " butter-dot" : "";
  }

  function render() {
    const eggsJustReady = updateCoopProduction();
    const breadJustReady = updateBakeryProduction();
    const milkJustReady = updateCowProduction();
    const goatMilkJustReady = updateGoatProduction();
    const cheeseJustReady = updateCreameryProduction();
    els.coins.textContent = state.coins;
    els.storageCount.textContent = `${usedStorage()}/${state.capacity}`;
    els.supplyCount.textContent = state.supplyCrates;
    els.shed.classList.toggle("upgraded", state.upgraded);
    els.shed.classList.toggle("storage-loft", state.shedLevel >= 2);
    els.shed.classList.toggle("storehouse", state.shedLevel >= 3);
    els.shed.classList.toggle("grand-storehouse", state.shedLevel >= 4);
    els.landButton.hidden = state.plotCount >= LAND_EXPANSION.plotCount;
    renderCoopBoard();
    renderBakeryBoard();
    renderCowBoard();
    renderGoatBoard();
    renderCreameryBoard();
    renderPlots();
    if (!els.storageSheet.hidden) renderStorage();
    if (!els.marketSheet.hidden) renderMarket();
    if (!els.plantSheet.hidden) renderCropChoices();
    if (!els.coopSheet.hidden) renderCoop();
    if (!els.bakerySheet.hidden) renderBakery();
    if (!els.cowSheet.hidden) renderCow();
    if (!els.goatSheet.hidden) renderGoat();
    if (!els.creamerySheet.hidden) renderCreamery();
    if (eggsJustReady) setStatus("The chickens have laid two eggs. Tap the coop to collect them!");
    if (breadJustReady) setStatus(`${state.bakery.pieReady ? "A pumpkin pie" : "A warm loaf"} is ready. Tap the bakery to collect it!`);
    if (milkJustReady) setStatus("Fresh milk is ready. Tap the cow pasture to collect it!");
    if (goatMilkJustReady) setStatus("Fresh goat milk is ready. Tap the goat meadow to collect it!");
    if (cheeseJustReady) setStatus(`${state.creamery.butterReady ? "The fresh butter" : "The goat cheese"} is ready. Tap the creamery to collect it!`);
  }

  function renderCoopBoard() {
    els.coopButton.classList.toggle("locked", !state.coop.built);
    els.coopButton.classList.toggle("built", state.coop.built);
    els.coopButton.classList.toggle("working", Boolean(state.coop.readyAt));
    els.coopButton.classList.toggle("ready", state.coop.eggsReady > 0);
    els.eggReadyBadge.hidden = state.coop.eggsReady === 0;
    if (!state.coop.built) els.coopBoardLabel.textContent = `Build Coop • ${COOP_COST}`;
    else if (state.coop.eggsReady) els.coopBoardLabel.textContent = "Eggs Ready!";
    else if (state.coop.readyAt) els.coopBoardLabel.textContent = `${Math.ceil(coopRemainingMs() / 1000)}s`;
    else els.coopBoardLabel.textContent = "Chicken Coop";
    els.coopButton.setAttribute("aria-label", els.coopBoardLabel.textContent);
  }

  function renderBakeryBoard() {
    els.bakeryButton.classList.toggle("locked", !state.bakery.built);
    els.bakeryButton.classList.toggle("built", state.bakery.built);
    els.bakeryButton.classList.toggle("working", Boolean(state.bakery.readyAt));
    const readyProduct = state.bakery.pieReady ? "pie" : state.bakery.breadReady ? "bread" : null;
    els.bakeryButton.classList.toggle("ready", Boolean(readyProduct));
    els.bakeryButton.classList.toggle("expanded", state.bakery.upgraded);
    els.breadReadyBadge.hidden = !readyProduct;
    els.breadReadyBadge.textContent = readyProduct === "pie" ? "1 pie" : "1 loaf";
    if (!state.bakery.built) els.bakeryBoardLabel.textContent = `Build Bakery • ${BAKERY_COST}`;
    else if (readyProduct) els.bakeryBoardLabel.textContent = readyProduct === "pie" ? "Pie Ready!" : "Bread Ready!";
    else if (state.bakery.readyAt) els.bakeryBoardLabel.textContent = `${Math.ceil(bakeryRemainingMs() / 1000)}s`;
    else els.bakeryBoardLabel.textContent = "Farm Bakery";
    els.bakeryButton.setAttribute("aria-label", els.bakeryBoardLabel.textContent);
  }

  function renderCowBoard() {
    els.cowButton.classList.toggle("locked", !state.cow.built);
    els.cowButton.classList.toggle("built", state.cow.built);
    els.cowButton.classList.toggle("working", Boolean(state.cow.readyAt));
    els.cowButton.classList.toggle("ready", state.cow.milkReady > 0);
    els.milkReadyBadge.hidden = state.cow.milkReady === 0;
    if (!state.cow.built) els.cowBoardLabel.textContent = `Cow Pasture • ${COW_PASTURE_COST} + ${COW_PASTURE_SUPPLY_COST} crates`;
    else if (state.cow.milkReady) els.cowBoardLabel.textContent = "Milk Ready!";
    else if (state.cow.readyAt) els.cowBoardLabel.textContent = `${Math.ceil(cowRemainingMs() / 1000)}s`;
    else els.cowBoardLabel.textContent = "Cow Pasture";
    els.cowButton.setAttribute("aria-label", els.cowBoardLabel.textContent);
  }

  function renderGoatBoard() {
    els.goatButton.classList.toggle("locked", !state.goat.built);
    els.goatButton.classList.toggle("built", state.goat.built);
    els.goatButton.classList.toggle("working", Boolean(state.goat.readyAt));
    els.goatButton.classList.toggle("ready", state.goat.milkReady > 0);
    els.goatMilkReadyBadge.hidden = state.goat.milkReady === 0;
    if (!state.goat.built) els.goatBoardLabel.textContent = `Goat Meadow • ${GOAT_MEADOW_COST} + ${GOAT_MEADOW_SUPPLY_COST} crates`;
    else if (state.goat.milkReady) els.goatBoardLabel.textContent = "Goat Milk Ready!";
    else if (state.goat.readyAt) els.goatBoardLabel.textContent = `${Math.ceil(goatRemainingMs() / 1000)}s`;
    else els.goatBoardLabel.textContent = "Goat Meadow";
    els.goatButton.setAttribute("aria-label", els.goatBoardLabel.textContent);
  }

  function renderCreameryBoard() {
    els.creameryButton.classList.toggle("locked", !state.creamery.built);
    els.creameryButton.classList.toggle("built", state.creamery.built);
    els.creameryButton.classList.toggle("working", Boolean(state.creamery.readyAt));
    const readyProduct = state.creamery.butterReady ? "butter" : state.creamery.cheeseReady ? "cheese" : null;
    els.creameryButton.classList.toggle("ready", Boolean(readyProduct));
    els.creameryButton.classList.toggle("expanded", state.creamery.upgraded);
    els.cheeseReadyBadge.hidden = !readyProduct;
    els.cheeseReadyBadge.textContent = readyProduct === "butter" ? "1 butter" : "1 cheese";
    if (!state.creamery.built) els.creameryBoardLabel.textContent = `Creamery • ${CREAMERY_COST} + ${CREAMERY_SUPPLY_COST} crates`;
    else if (readyProduct) els.creameryBoardLabel.textContent = readyProduct === "butter" ? "Butter Ready!" : "Cheese Ready!";
    else if (state.creamery.readyAt) els.creameryBoardLabel.textContent = `${Math.ceil(creameryRemainingMs() / 1000)}s`;
    else els.creameryBoardLabel.textContent = "Farm Creamery";
    els.creameryButton.setAttribute("aria-label", els.creameryBoardLabel.textContent);
  }

  function renderPlots() {
    els.grid.replaceChildren();
    state.plots.forEach((plot, index) => {
      const button = document.querySelector("#plot-template").content.firstElementChild.cloneNode(true);
      const content = button.querySelector(".plot-content");
      const label = button.querySelector(".plot-label");
      button.dataset.index = index;
      if (!plot) {
        button.className = "plot empty";
        label.textContent = "Plant";
        button.setAttribute("aria-label", `Empty plot ${index + 1}. Tap to plant.`);
      } else {
        const crop = CROPS[plot.crop];
        const stage = cropStage(plot);
        button.className = `plot planted${stage === 3 ? " ready" : ""}`;
        const count = plot.crop === "pumpkin" ? 2 : 3;
        for (let i = 0; i < count; i += 1) {
          const plant = document.createElement("span");
          plant.className = `plant ${plot.crop} stage-${stage}`;
          plant.style.animationDelay = `${i * 55}ms`;
          plant.innerHTML = '<i class="produce"></i>';
          content.appendChild(plant);
        }
        label.textContent = stage === 3 ? `${crop.name} • Ready!` : `${crop.name} • ${remainingText(plot)}`;
        button.setAttribute("aria-label", stage === 3 ? `${crop.name} ready to harvest` : `${crop.name} growing, ${remainingText(plot)} remaining`);
      }
      button.addEventListener("click", () => handlePlot(index));
      els.grid.appendChild(button);
    });
  }

  function handlePlot(index) {
    const plot = state.plots[index];
    if (!plot) {
      selectedPlot = index;
      renderCropChoices();
      openSheet(els.plantSheet);
      return;
    }
    if (cropStage(plot) < 3) {
      setStatus(`${CROPS[plot.crop].name} will be ready in ${remainingText(plot)}.`);
      return;
    }
    const crop = CROPS[plot.crop];
    if (usedStorage() + crop.storage > state.capacity) {
      const plotEl = els.grid.children[index];
      plotEl.classList.add("blocked");
      setTimeout(() => plotEl.classList.remove("blocked"), 350);
      setStatus("The shed is full. Sell some produce or expand it first.");
      return;
    }
    state.inventory[plot.crop] += 1;
    state.plots[index] = null;
    saveState();
    setStatus(`${crop.name} harvested and stored in the shed.`);
    render();
  }

  function renderLand() {
    const coinShortage = Math.max(0, LAND_EXPANSION.coinCost - state.coins);
    const supplyShortage = Math.max(0, LAND_EXPANSION.supplyCost - state.supplyCrates);
    const missing = [];
    if (coinShortage) missing.push(`${coinShortage} more coin${coinShortage === 1 ? "" : "s"}`);
    if (supplyShortage) missing.push(`${supplyShortage} Supply Crate`);
    els.landCoinCost.classList.toggle("met", !coinShortage);
    els.landSupplyCost.classList.toggle("met", !supplyShortage);
    els.landMessage.textContent = missing.length
      ? `Still needed: ${missing.join(" and ")}.`
      : "Everything is ready to open three new growing plots.";
    els.landAction.disabled = purchasingLand || missing.length > 0;
    els.landAction.textContent = purchasingLand ? "Opening the field…" : "Purchase South Field";
  }

  function buyLand() {
    if (purchasingLand || state.plotCount >= LAND_EXPANSION.plotCount || state.coins < LAND_EXPANSION.coinCost || state.supplyCrates < LAND_EXPANSION.supplyCost) return;
    purchasingLand = true;
    state.coins -= LAND_EXPANSION.coinCost;
    state.supplyCrates -= LAND_EXPANSION.supplyCost;
    state.plotCount = LAND_EXPANSION.plotCount;
    while (state.plots.length < state.plotCount) state.plots.push(null);
    saveState();
    closeSheets();
    setStatus("South Field purchased! Three new plots are ready for planting.");
    render();
    window.setTimeout(() => { purchasingLand = false; }, 500);
  }

  function renderCropChoices() {
    els.cropChoices.replaceChildren();
    Object.entries(CROPS).forEach(([key, crop]) => {
      const button = document.createElement("button");
      button.className = "crop-choice";
      button.type = "button";
      button.disabled = state.coins < crop.cost;
      button.style.setProperty("--crop-color", crop.color);
      button.innerHTML = `<span class="crop-symbol" aria-hidden="true"></span><strong>${crop.name}</strong><span>${crop.cost} coins • ${crop.growMs / 1000}s</span><span>Sells for ${crop.price}</span>`;
      button.addEventListener("click", () => plantCrop(key));
      els.cropChoices.appendChild(button);
    });
  }

  function plantCrop(cropKey) {
    if (selectedPlot === null || state.plots[selectedPlot]) return;
    const crop = CROPS[cropKey];
    if (state.coins < crop.cost) return;
    state.coins -= crop.cost;
    state.plots[selectedPlot] = { crop: cropKey, plantedAt: Date.now() };
    saveState();
    closeSheets();
    setStatus(`${crop.name} planted. It will keep growing while you’re away.`);
    render();
  }

  function renderStorage() {
    els.storageSubtitle.textContent = `${usedStorage()} of ${state.capacity} spaces used`;
    els.inventoryList.replaceChildren();
    Object.entries(PRODUCTS).forEach(([key, crop]) => {
      const row = document.createElement("div");
      row.className = "inventory-row";
      row.style.setProperty("--item-color", crop.color);
      row.innerHTML = `<span class="item-dot${itemDotClass(key)}" aria-hidden="true"></span><div><strong>${crop.name}</strong><span>${crop.storage} storage space${crop.storage > 1 ? "s" : ""} each</span></div><strong>× ${state.inventory[key]}</strong>`;
      els.inventoryList.appendChild(row);
    });
    const nextLevel = SHED_LEVELS[state.shedLevel + 1];
    els.upgradeCard.classList.toggle("complete", !nextLevel);
    els.upgradeCard.classList.toggle("level-two", state.shedLevel === 1);
    els.upgradeCard.classList.toggle("level-three", state.shedLevel === 2);
    els.upgradeCard.classList.toggle("level-four", state.shedLevel === 3);
    if (!nextLevel) {
      els.upgradeTitle.textContent = SHED_LEVELS[state.shedLevel].name;
      els.upgradeDescription.textContent = `Maximum capacity reached — ${state.capacity} storage spaces.`;
      els.upgradeButton.hidden = true;
      return;
    }
    els.upgradeButton.hidden = false;
    els.upgradeTitle.textContent = nextLevel.name;
    els.upgradeDescription.textContent = `Expand storage from ${state.capacity} to ${nextLevel.capacity} spaces.`;
    const supplyCost = nextLevel.supplyCost || 0;
    const coinShortage = Math.max(0, nextLevel.cost - state.coins);
    const supplyShortage = Math.max(0, supplyCost - state.supplyCrates);
    els.upgradeButton.disabled = upgradingShed || coinShortage > 0 || supplyShortage > 0;
    if (upgradingShed) els.upgradeButton.textContent = "Upgrade complete!";
    else if (coinShortage || supplyShortage) els.upgradeButton.textContent = `Need ${coinShortage ? `${coinShortage} coins` : ""}${coinShortage && supplyShortage ? " + " : ""}${supplyShortage ? `${supplyShortage} crates` : ""}`;
    else els.upgradeButton.textContent = `${nextLevel.cost} coins${supplyCost ? ` + ${supplyCost} crates` : ""}`;
  }

  function buyUpgrade() {
    const nextLevel = SHED_LEVELS[state.shedLevel + 1];
    const supplyCost = nextLevel?.supplyCost || 0;
    if (upgradingShed || !nextLevel || state.coins < nextLevel.cost || state.supplyCrates < supplyCost) return;
    upgradingShed = true;
    state.coins -= nextLevel.cost;
    state.supplyCrates -= supplyCost;
    state.shedLevel += 1;
    state.capacity = nextLevel.capacity;
    state.upgraded = state.shedLevel >= 1;
    saveState();
    setStatus(`${nextLevel.name} complete! You can now store ${nextLevel.capacity} spaces of produce.`);
    render();
    window.setTimeout(() => {
      upgradingShed = false;
      if (!els.storageSheet.hidden) renderStorage();
    }, 500);
  }

  function renderMarket() {
    renderOrder();
    els.marketList.replaceChildren();
    Object.entries(PRODUCTS).forEach(([key, crop]) => {
      const count = state.inventory[key];
      const row = document.createElement("div");
      row.className = "market-row";
      row.style.setProperty("--item-color", crop.color);
      row.innerHTML = `<span class="item-dot${itemDotClass(key)}" aria-hidden="true"></span><div><strong>${crop.name}</strong><span>${count} stored • ${crop.price} coins each</span></div>`;
      const button = document.createElement("button");
      button.type = "button";
      button.disabled = count === 0;
      button.textContent = count ? `Sell +${crop.price}` : "None";
      button.addEventListener("click", () => sellOne(key));
      row.appendChild(button);
      els.marketList.appendChild(row);
    });
    els.sellAll.disabled = totalItems() === 0;
  }

  function renderOrder() {
    const order = findOrder(state.activeOrder);
    const ready = canCompleteOrder(order);
    const typeLabels = { neighbor: "Neighbor request", restaurant: "Restaurant order", market: "Local market order" };
    els.orderCard.dataset.requesterType = order.requesterType;
    els.orderCard.classList.toggle("special-order", Boolean(order.special));
    els.orderAvatar.textContent = order.requester.split(/\s+/).map(word => word[0]).slice(0, 2).join("");
    els.orderType.textContent = order.special ? `Special request • ${typeLabels[order.requesterType]}` : typeLabels[order.requesterType];
    els.orderRequester.textContent = order.requester;
    els.orderReason.textContent = `“${order.reason}”`;
    els.orderTitle.textContent = order.title;
    els.orderReward.textContent = `${order.reward} coins`;
    els.orderSupplyReward.hidden = !order.supplyCrates;
    els.orderSupplyReward.textContent = order.supplyCrates ? `+ ${order.supplyCrates} Supply Crate` : "";
    els.orderRequirements.replaceChildren();
    Object.entries(order.needs).forEach(([key, amount]) => {
      const crop = PRODUCTS[key];
      const stored = state.inventory[key];
      const met = stored >= amount;
      const requirement = document.createElement("div");
      requirement.className = `order-requirement${met ? " met" : ""}`;
      requirement.style.setProperty("--item-color", crop.color);
      requirement.innerHTML = `<span class="item-dot${itemDotClass(key)}" aria-hidden="true"></span><span>${crop.name}</span><strong>${Math.min(stored, amount)} / ${amount}</strong>`;
      els.orderRequirements.appendChild(requirement);
    });
    els.completeOrder.disabled = !ready || completingOrder;
    els.completeOrder.textContent = ready ? `Complete order • +${order.reward}` : "Gather the requested produce";
  }

  function completeOrder() {
    const order = findOrder(state.activeOrder);
    if (completingOrder || !order || !canCompleteOrder(order)) return;
    completingOrder = true;
    Object.entries(order.needs).forEach(([key, amount]) => { state.inventory[key] -= amount; });
    state.coins += order.reward;
    if (order.supplyCrates) {
      state.supplyCrates += order.supplyCrates;
      state.ordersSinceSpecial = 0;
    } else {
      state.ordersSinceSpecial += 1;
    }
    state.activeOrder = chooseOrder(order.id);
    saveState();
    const crateMessage = order.supplyCrates ? ` and ${order.supplyCrates} Supply Crate` : "";
    setStatus(`Order complete! You earned ${order.reward} coins${crateMessage}.`);
    render();
    els.orderCard.classList.remove("order-complete");
    void els.orderCard.offsetWidth;
    els.orderCard.classList.add("order-complete");
    window.setTimeout(() => {
      completingOrder = false;
      if (!els.marketSheet.hidden) renderMarket();
    }, 500);
  }

  function sellOne(cropKey) {
    if (state.inventory[cropKey] <= 0) return;
    state.inventory[cropKey] -= 1;
    state.coins += PRODUCTS[cropKey].price;
    saveState();
    setStatus(`${PRODUCTS[cropKey].name} sold for ${PRODUCTS[cropKey].price} coins.`);
    render();
  }

  function sellEverything() {
    let earnings = 0;
    Object.keys(PRODUCTS).forEach(key => {
      earnings += state.inventory[key] * PRODUCTS[key].price;
      state.inventory[key] = 0;
    });
    if (!earnings) return;
    state.coins += earnings;
    saveState();
    setStatus(`Market sale complete — you earned ${earnings} coins.`);
    render();
  }

  function renderCoop() {
    updateCoopProduction();
    els.coopProgress.hidden = true;
    els.coopRecipe.hidden = !state.coop.built;
    if (!state.coop.built) {
      els.coopSubtitle.textContent = "A new home for two hens.";
      els.coopStateTitle.textContent = "Build the Coop";
      els.coopStateMessage.textContent = "Add two chickens and turn stored wheat into fresh eggs.";
      els.coopAction.disabled = state.coins < COOP_COST;
      els.coopAction.textContent = state.coins < COOP_COST ? `${COOP_COST - state.coins} more coins needed` : `Build for ${COOP_COST} coins`;
      return;
    }
    if (state.coop.eggsReady) {
      const spaceNeeded = state.coop.eggsReady * PRODUCTS.egg.storage;
      const hasSpace = usedStorage() + spaceNeeded <= state.capacity;
      els.coopSubtitle.textContent = "Your two hens are finished.";
      els.coopStateTitle.textContent = "Fresh Eggs!";
      els.coopStateMessage.textContent = hasSpace ? "Collect two eggs and place them in the shed." : `Make ${spaceNeeded} spaces in the shed to collect them.`;
      els.coopAction.disabled = !hasSpace;
      els.coopAction.textContent = hasSpace ? "Collect 2 eggs" : "Shed needs more room";
      return;
    }
    if (state.coop.readyAt) {
      const remaining = coopRemainingMs();
      const progress = Math.min(100, Math.max(0, 100 - (remaining / EGG_TIME_MS * 100)));
      els.coopSubtitle.textContent = "The hens are pecking happily.";
      els.coopStateTitle.textContent = "Making Eggs";
      els.coopStateMessage.textContent = `Ready in ${Math.ceil(remaining / 1000)} seconds. They’ll keep working while you’re away.`;
      els.coopProgress.hidden = false;
      els.coopProgressBar.style.width = `${progress}%`;
      els.coopAction.disabled = true;
      els.coopAction.textContent = "Chickens are fed";
      return;
    }
    els.coopSubtitle.textContent = "Two hens are ready to be fed.";
    els.coopStateTitle.textContent = "Feed the Chickens";
    els.coopStateMessage.textContent = state.inventory.wheat ? "Use one stored wheat to produce two eggs." : "Grow and store one wheat to feed them.";
    els.coopAction.disabled = state.inventory.wheat < 1;
    els.coopAction.textContent = state.inventory.wheat ? "Feed 1 wheat" : "1 wheat needed";
  }

  function handleCoopAction() {
    updateCoopProduction();
    if (!state.coop.built) {
      if (state.coins < COOP_COST) return;
      state.coins -= COOP_COST;
      state.coop.built = true;
      saveState();
      setStatus("The chicken coop is built, and two hens have moved in!");
    } else if (state.coop.eggsReady) {
      const spaceNeeded = state.coop.eggsReady * PRODUCTS.egg.storage;
      if (usedStorage() + spaceNeeded > state.capacity) return;
      state.inventory.egg += state.coop.eggsReady;
      state.coop.eggsReady = 0;
      saveState();
      setStatus("Two fresh eggs collected and stored in the shed.");
    } else if (!state.coop.readyAt && state.inventory.wheat >= 1) {
      state.inventory.wheat -= 1;
      state.coop.readyAt = Date.now() + EGG_TIME_MS;
      saveState();
      setStatus("The chickens are fed. Two eggs will be ready in 60 seconds.");
    }
    render();
  }

  function renderBakery() {
    updateBakeryProduction();
    els.bakeryProgress.hidden = true;
    els.bakeryRecipe.hidden = !state.bakery.built;
    els.bakeryRecipePicker.hidden = !state.bakery.built;
    els.bakeryUpgrade.hidden = !state.bakery.built || state.bakery.upgraded;
    document.querySelectorAll("[data-bakery-recipe]").forEach(button => {
      const locked = button.dataset.bakeryRecipe === "pie" && !state.bakery.upgraded;
      button.classList.toggle("selected", button.dataset.bakeryRecipe === state.bakery.selectedRecipe);
      button.classList.toggle("locked", locked);
      button.disabled = locked || Boolean(state.bakery.readyAt || state.bakery.breadReady || state.bakery.pieReady);
    });
    if (!els.bakeryUpgrade.hidden) {
      const coinShortage = Math.max(0, BAKERY_UPGRADE_COST - state.coins);
      const supplyShortage = Math.max(0, BAKERY_UPGRADE_SUPPLY_COST - state.supplyCrates);
      els.bakeryUpgradeButton.disabled = upgradingBakery || coinShortage > 0 || supplyShortage > 0;
      els.bakeryUpgradeButton.textContent = coinShortage || supplyShortage ? `Need ${coinShortage ? `${coinShortage} coins` : ""}${coinShortage && supplyShortage ? " + " : ""}${supplyShortage ? `${supplyShortage} crates` : ""}` : `${BAKERY_UPGRADE_COST} coins + ${BAKERY_UPGRADE_SUPPLY_COST} crates`;
    }
    if (!state.bakery.built) {
      const coopNeeded = !state.coop.built;
      els.bakerySubtitle.textContent = "Turn farm goods into warm bread.";
      els.bakeryStateTitle.textContent = "Build the Bakery";
      els.bakeryStateMessage.textContent = coopNeeded ? "Build the chicken coop first so the bakery can receive eggs." : "Combine wheat and eggs into a valuable farm-baked loaf.";
      els.bakeryAction.disabled = coopNeeded || state.coins < BAKERY_COST;
      if (coopNeeded) els.bakeryAction.textContent = "Build the chicken coop first";
      else els.bakeryAction.textContent = state.coins < BAKERY_COST ? `${BAKERY_COST - state.coins} more coins needed` : `Build for ${BAKERY_COST} coins`;
      return;
    }
    const readyKey = state.bakery.pieReady ? "pie" : state.bakery.breadReady ? "bread" : null;
    if (readyKey) {
      const hasSpace = usedStorage() + PRODUCTS[readyKey].storage <= state.capacity;
      els.bakerySubtitle.textContent = "The oven has finished baking.";
      els.bakeryStateTitle.textContent = readyKey === "pie" ? "Pumpkin Pie!" : "Warm Bread!";
      els.bakeryStateMessage.textContent = hasSpace ? `Collect the ${readyKey === "pie" ? "pie" : "loaf"} and place it in the shed.` : "Make one space in the shed to collect it.";
      els.bakeryAction.disabled = !hasSpace;
      els.bakeryAction.textContent = hasSpace ? `Collect 1 ${readyKey}` : "Shed needs more room";
      return;
    }
    if (state.bakery.readyAt) {
      const remaining = bakeryRemainingMs();
      const recipe = state.bakery.activeRecipe || "bread";
      const duration = recipe === "pie" ? PIE_TIME_MS : BREAD_TIME_MS;
      const progress = Math.min(100, Math.max(0, 100 - (remaining / duration * 100)));
      els.bakerySubtitle.textContent = "The oven is glowing warmly.";
      els.bakeryStateTitle.textContent = recipe === "pie" ? "Baking Pumpkin Pie" : "Baking Bread";
      els.bakeryStateMessage.textContent = `Ready in ${Math.ceil(remaining / 1000)} seconds. It’ll keep baking while you’re away.`;
      els.bakeryProgress.hidden = false;
      els.bakeryProgressBar.style.width = `${progress}%`;
      els.bakeryAction.disabled = true;
      els.bakeryAction.textContent = recipe === "pie" ? "Pie is baking" : "Bread is baking";
      return;
    }
    const recipe = state.bakery.selectedRecipe === "pie" && state.bakery.upgraded ? "pie" : "bread";
    const needs = recipe === "pie" ? { wheat: 1, egg: 1, pumpkin: 1 } : { wheat: 1, egg: 1 };
    const missing = Object.entries(needs).filter(([key, amount]) => state.inventory[key] < amount).map(([key, amount]) => `${amount} ${PRODUCTS[key].name.toLowerCase()}`);
    els.bakeryRecipe.textContent = recipe === "pie" ? "1 wheat + 1 egg + 1 pumpkin → 1 pie" : "1 wheat + 1 egg → 1 bread";
    els.bakerySubtitle.textContent = "Choose what the oven should bake next.";
    els.bakeryStateTitle.textContent = recipe === "pie" ? "Bake Pumpkin Pie" : "Bake a Loaf";
    els.bakeryStateMessage.textContent = missing.length ? `Still needed: ${missing.join(" and ")}.` : "All ingredients are ready in the shed.";
    els.bakeryAction.disabled = missing.length > 0;
    els.bakeryAction.textContent = missing.length ? "Ingredients needed" : recipe === "pie" ? "Bake 1 pie" : "Bake 1 loaf";
  }

  function handleBakeryAction() {
    updateBakeryProduction();
    if (!state.bakery.built) {
      if (!state.coop.built || state.coins < BAKERY_COST) return;
      state.coins -= BAKERY_COST;
      state.bakery.built = true;
      saveState();
      setStatus("The farm bakery is built and its oven is ready!");
    } else if (state.bakery.breadReady || state.bakery.pieReady) {
      const readyKey = state.bakery.pieReady ? "pie" : "bread";
      if (usedStorage() + PRODUCTS[readyKey].storage > state.capacity) return;
      state.inventory[readyKey] += 1;
      state.bakery[`${readyKey}Ready`] = 0;
      saveState();
      setStatus(`One ${PRODUCTS[readyKey].name.toLowerCase()} collected and stored in the shed.`);
    } else if (!state.bakery.readyAt) {
      const recipe = state.bakery.selectedRecipe === "pie" && state.bakery.upgraded ? "pie" : "bread";
      const needs = recipe === "pie" ? { wheat: 1, egg: 1, pumpkin: 1 } : { wheat: 1, egg: 1 };
      if (!Object.entries(needs).every(([key, amount]) => state.inventory[key] >= amount)) return;
      Object.entries(needs).forEach(([key, amount]) => { state.inventory[key] -= amount; });
      state.bakery.activeRecipe = recipe;
      state.bakery.readyAt = Date.now() + (recipe === "pie" ? PIE_TIME_MS : BREAD_TIME_MS);
      saveState();
      setStatus(`${recipe === "pie" ? "The pumpkin pie" : "The loaf"} is in the oven.`);
    }
    render();
  }

  function upgradeBakery() {
    if (upgradingBakery || !state.bakery.built || state.bakery.upgraded || state.coins < BAKERY_UPGRADE_COST || state.supplyCrates < BAKERY_UPGRADE_SUPPLY_COST) return;
    upgradingBakery = true;
    state.coins -= BAKERY_UPGRADE_COST;
    state.supplyCrates -= BAKERY_UPGRADE_SUPPLY_COST;
    state.bakery.upgraded = true;
    state.bakery.selectedRecipe = "pie";
    saveState();
    setStatus("The Pie Kitchen is ready! Pumpkin pie can now be baked.");
    upgradingBakery = false;
    render();
  }

  function renderCow() {
    updateCowProduction();
    els.cowProgress.hidden = true;
    els.cowRecipe.hidden = !state.cow.built;
    if (!state.cow.built) {
      const fieldNeeded = state.plotCount < LAND_EXPANSION.plotCount;
      const coinShortage = Math.max(0, COW_PASTURE_COST - state.coins);
      const supplyShortage = Math.max(0, COW_PASTURE_SUPPLY_COST - state.supplyCrates);
      els.cowSubtitle.textContent = "A grassy home for two gentle cows.";
      els.cowStateTitle.textContent = "Build the Cow Pasture";
      if (fieldNeeded) els.cowStateMessage.textContent = "Open the South Field first to make room for the pasture.";
      else if (coinShortage || supplyShortage) {
        const missing = [];
        if (coinShortage) missing.push(`${coinShortage} more coin${coinShortage === 1 ? "" : "s"}`);
        if (supplyShortage) missing.push(`${supplyShortage} more Supply Crate${supplyShortage === 1 ? "" : "s"}`);
        els.cowStateMessage.textContent = `Still needed: ${missing.join(" and ")}.`;
      } else els.cowStateMessage.textContent = "Everything is ready for two cows to move in.";
      els.cowAction.disabled = fieldNeeded || coinShortage > 0 || supplyShortage > 0;
      els.cowAction.textContent = fieldNeeded ? "Open the South Field first" : `Build for ${COW_PASTURE_COST} coins + ${COW_PASTURE_SUPPLY_COST} crates`;
      return;
    }
    if (state.cow.milkReady) {
      const spaceNeeded = state.cow.milkReady * PRODUCTS.milk.storage;
      const hasSpace = usedStorage() + spaceNeeded <= state.capacity;
      els.cowSubtitle.textContent = "The cows are waiting by the milk pail.";
      els.cowStateTitle.textContent = "Fresh Milk!";
      els.cowStateMessage.textContent = hasSpace ? "Collect two bottles of milk and place them in the shed." : `Make ${spaceNeeded} spaces in the shed to collect them.`;
      els.cowAction.disabled = !hasSpace;
      els.cowAction.textContent = hasSpace ? "Collect 2 milk" : "Shed needs more room";
      return;
    }
    if (state.cow.readyAt) {
      const remaining = cowRemainingMs();
      const progress = Math.min(100, Math.max(0, 100 - (remaining / MILK_TIME_MS * 100)));
      els.cowSubtitle.textContent = "The cows are munching contentedly.";
      els.cowStateTitle.textContent = "Making Milk";
      els.cowStateMessage.textContent = `Ready in ${Math.ceil(remaining / 1000)} seconds. They’ll keep grazing while you’re away.`;
      els.cowProgress.hidden = false;
      els.cowProgressBar.style.width = `${progress}%`;
      els.cowAction.disabled = true;
      els.cowAction.textContent = "Cows are fed";
      return;
    }
    els.cowSubtitle.textContent = "Two cows are ready to be fed.";
    els.cowStateTitle.textContent = "Feed the Cows";
    els.cowStateMessage.textContent = state.inventory.wheat >= 2 ? "Use two stored wheat to produce two milk." : `Grow and store ${2 - state.inventory.wheat} more wheat.`;
    els.cowAction.disabled = state.inventory.wheat < 2;
    els.cowAction.textContent = state.inventory.wheat >= 2 ? "Feed 2 wheat" : "2 wheat needed";
  }

  function handleCowAction() {
    updateCowProduction();
    if (!state.cow.built) {
      if (state.plotCount < LAND_EXPANSION.plotCount || state.coins < COW_PASTURE_COST || state.supplyCrates < COW_PASTURE_SUPPLY_COST) return;
      state.coins -= COW_PASTURE_COST;
      state.supplyCrates -= COW_PASTURE_SUPPLY_COST;
      state.cow.built = true;
      saveState();
      setStatus("The cow pasture is ready, and two gentle cows have moved in!");
    } else if (state.cow.milkReady) {
      const spaceNeeded = state.cow.milkReady * PRODUCTS.milk.storage;
      if (usedStorage() + spaceNeeded > state.capacity) return;
      state.inventory.milk += state.cow.milkReady;
      state.cow.milkReady = 0;
      saveState();
      setStatus("Two bottles of fresh milk collected and stored in the shed.");
    } else if (!state.cow.readyAt && state.inventory.wheat >= 2) {
      state.inventory.wheat -= 2;
      state.cow.readyAt = Date.now() + MILK_TIME_MS;
      saveState();
      setStatus("The cows are fed. Two bottles of milk will be ready in 90 seconds.");
    }
    render();
  }

  function renderGoat() {
    updateGoatProduction();
    els.goatProgress.hidden = true;
    els.goatRecipe.hidden = !state.goat.built;
    if (!state.goat.built) {
      const cowNeeded = !state.cow.built;
      const coinShortage = Math.max(0, GOAT_MEADOW_COST - state.coins);
      const supplyShortage = Math.max(0, GOAT_MEADOW_SUPPLY_COST - state.supplyCrates);
      els.goatSubtitle.textContent = "A sunny hillside home for two dairy goats.";
      els.goatStateTitle.textContent = "Build the Goat Meadow";
      if (cowNeeded) els.goatStateMessage.textContent = "Build the cow pasture first to open this later farm expansion.";
      else if (coinShortage || supplyShortage) {
        const missing = [];
        if (coinShortage) missing.push(`${coinShortage} more coin${coinShortage === 1 ? "" : "s"}`);
        if (supplyShortage) missing.push(`${supplyShortage} more Supply Crate${supplyShortage === 1 ? "" : "s"}`);
        els.goatStateMessage.textContent = `Still needed: ${missing.join(" and ")}.`;
      } else els.goatStateMessage.textContent = "Everything is ready for two playful goats to move in.";
      els.goatAction.disabled = cowNeeded || coinShortage > 0 || supplyShortage > 0;
      els.goatAction.textContent = cowNeeded ? "Build the cow pasture first" : `Build for ${GOAT_MEADOW_COST} coins + ${GOAT_MEADOW_SUPPLY_COST} crates`;
      return;
    }
    if (state.goat.milkReady) {
      const spaceNeeded = state.goat.milkReady * PRODUCTS.goatMilk.storage;
      const hasSpace = usedStorage() + spaceNeeded <= state.capacity;
      els.goatSubtitle.textContent = "The goats are waiting beside their milk cans.";
      els.goatStateTitle.textContent = "Fresh Goat Milk!";
      els.goatStateMessage.textContent = hasSpace ? "Collect two bottles of goat milk and place them in the shed." : `Make ${spaceNeeded} spaces in the shed to collect them.`;
      els.goatAction.disabled = !hasSpace;
      els.goatAction.textContent = hasSpace ? "Collect 2 goat milk" : "Shed needs more room";
      return;
    }
    if (state.goat.readyAt) {
      const remaining = goatRemainingMs();
      const progress = Math.min(100, Math.max(0, 100 - (remaining / GOAT_MILK_TIME_MS * 100)));
      els.goatSubtitle.textContent = "The goats are happily nibbling their feed.";
      els.goatStateTitle.textContent = "Making Goat Milk";
      els.goatStateMessage.textContent = `Ready in ${Math.ceil(remaining / 1000)} seconds. They’ll keep grazing while you’re away.`;
      els.goatProgress.hidden = false;
      els.goatProgressBar.style.width = `${progress}%`;
      els.goatAction.disabled = true;
      els.goatAction.textContent = "Goats are fed";
      return;
    }
    const hasCarrot = state.inventory.carrot >= 1;
    const hasWheat = state.inventory.wheat >= 1;
    els.goatSubtitle.textContent = "Two goats are ready to be fed.";
    els.goatStateTitle.textContent = "Feed the Goats";
    els.goatStateMessage.textContent = hasCarrot && hasWheat ? "Use one carrot and one wheat to produce two goat milk." : "Grow and store one carrot and one wheat for their feed.";
    els.goatAction.disabled = !hasCarrot || !hasWheat;
    els.goatAction.textContent = hasCarrot && hasWheat ? "Feed 1 carrot + 1 wheat" : "Ingredients needed";
  }

  function handleGoatAction() {
    updateGoatProduction();
    if (!state.goat.built) {
      if (!state.cow.built || state.coins < GOAT_MEADOW_COST || state.supplyCrates < GOAT_MEADOW_SUPPLY_COST) return;
      state.coins -= GOAT_MEADOW_COST;
      state.supplyCrates -= GOAT_MEADOW_SUPPLY_COST;
      state.goat.built = true;
      saveState();
      setStatus("The goat meadow is ready, and two playful goats have moved in!");
    } else if (state.goat.milkReady) {
      const spaceNeeded = state.goat.milkReady * PRODUCTS.goatMilk.storage;
      if (usedStorage() + spaceNeeded > state.capacity) return;
      state.inventory.goatMilk += state.goat.milkReady;
      state.goat.milkReady = 0;
      saveState();
      setStatus("Two bottles of fresh goat milk collected and stored in the shed.");
    } else if (!state.goat.readyAt && state.inventory.carrot >= 1 && state.inventory.wheat >= 1) {
      state.inventory.carrot -= 1;
      state.inventory.wheat -= 1;
      state.goat.readyAt = Date.now() + GOAT_MILK_TIME_MS;
      saveState();
      setStatus("The goats are fed. Two bottles of goat milk will be ready in 75 seconds.");
    }
    render();
  }

  function renderCreamery() {
    updateCreameryProduction();
    els.creameryProgress.hidden = true;
    els.creameryRecipe.hidden = !state.creamery.built;
    els.creameryRecipePicker.hidden = !state.creamery.built;
    els.creameryUpgrade.hidden = !state.creamery.built || state.creamery.upgraded;
    document.querySelectorAll("[data-creamery-recipe]").forEach(button => {
      const locked = button.dataset.creameryRecipe === "butter" && !state.creamery.upgraded;
      button.classList.toggle("selected", button.dataset.creameryRecipe === state.creamery.selectedRecipe);
      button.classList.toggle("locked", locked);
      button.disabled = locked || Boolean(state.creamery.readyAt || state.creamery.cheeseReady || state.creamery.butterReady);
    });
    if (!els.creameryUpgrade.hidden) {
      const coinShortage = Math.max(0, CREAMERY_UPGRADE_COST - state.coins);
      const supplyShortage = Math.max(0, CREAMERY_UPGRADE_SUPPLY_COST - state.supplyCrates);
      els.creameryUpgradeButton.disabled = upgradingCreamery || coinShortage > 0 || supplyShortage > 0;
      els.creameryUpgradeButton.textContent = coinShortage || supplyShortage ? `Need ${coinShortage ? `${coinShortage} coins` : ""}${coinShortage && supplyShortage ? " + " : ""}${supplyShortage ? `${supplyShortage} crates` : ""}` : `${CREAMERY_UPGRADE_COST} coins + ${CREAMERY_UPGRADE_SUPPLY_COST} crates`;
    }
    if (!state.creamery.built) {
      const goatNeeded = !state.goat.built;
      const coinShortage = Math.max(0, CREAMERY_COST - state.coins);
      const supplyShortage = Math.max(0, CREAMERY_SUPPLY_COST - state.supplyCrates);
      els.creamerySubtitle.textContent = "Turn fresh goat milk into farmhouse cheese.";
      els.creameryStateTitle.textContent = "Build the Creamery";
      if (goatNeeded) els.creameryStateMessage.textContent = "Build the goat meadow first so the creamery has fresh milk.";
      else if (coinShortage || supplyShortage) {
        const missing = [];
        if (coinShortage) missing.push(`${coinShortage} more coin${coinShortage === 1 ? "" : "s"}`);
        if (supplyShortage) missing.push(`${supplyShortage} more Supply Crate${supplyShortage === 1 ? "" : "s"}`);
        els.creameryStateMessage.textContent = `Still needed: ${missing.join(" and ")}.`;
      } else els.creameryStateMessage.textContent = "Everything is ready to build the creamery.";
      els.creameryAction.disabled = goatNeeded || coinShortage > 0 || supplyShortage > 0;
      els.creameryAction.textContent = goatNeeded ? "Build the goat meadow first" : `Build for ${CREAMERY_COST} coins + ${CREAMERY_SUPPLY_COST} crates`;
      return;
    }
    const readyKey = state.creamery.butterReady ? "butter" : state.creamery.cheeseReady ? "cheese" : null;
    if (readyKey) {
      const hasSpace = usedStorage() + PRODUCTS[readyKey].storage <= state.capacity;
      els.creamerySubtitle.textContent = readyKey === "butter" ? "The butter has finished churning." : "The cheese wheel has finished setting.";
      els.creameryStateTitle.textContent = readyKey === "butter" ? "Fresh Butter!" : "Farmhouse Cheese!";
      els.creameryStateMessage.textContent = hasSpace ? `Collect the ${readyKey === "butter" ? "butter" : "goat cheese"} and place it in the shed.` : "Make one space in the shed to collect it.";
      els.creameryAction.disabled = !hasSpace;
      els.creameryAction.textContent = hasSpace ? `Collect 1 ${readyKey}` : "Shed needs more room";
      return;
    }
    if (state.creamery.readyAt) {
      const remaining = creameryRemainingMs();
      const recipe = state.creamery.activeRecipe || "cheese";
      const duration = recipe === "butter" ? BUTTER_TIME_MS : CHEESE_TIME_MS;
      const progress = Math.min(100, Math.max(0, 100 - (remaining / duration * 100)));
      els.creamerySubtitle.textContent = recipe === "butter" ? "The churn is turning steadily." : "The fresh cheese is slowly setting.";
      els.creameryStateTitle.textContent = recipe === "butter" ? "Churning Butter" : "Making Cheese";
      els.creameryStateMessage.textContent = `Ready in ${Math.ceil(remaining / 1000)} seconds. It’ll keep setting while you’re away.`;
      els.creameryProgress.hidden = false;
      els.creameryProgressBar.style.width = `${progress}%`;
      els.creameryAction.disabled = true;
      els.creameryAction.textContent = recipe === "butter" ? "Butter is churning" : "Cheese is setting";
      return;
    }
    const recipe = state.creamery.selectedRecipe === "butter" && state.creamery.upgraded ? "butter" : "cheese";
    const ingredient = recipe === "butter" ? "milk" : "goatMilk";
    const missing = Math.max(0, 2 - state.inventory[ingredient]);
    els.creameryRecipe.textContent = recipe === "butter" ? "2 cow milk → 1 butter" : "2 goat milk → 1 cheese";
    els.creamerySubtitle.textContent = "Choose what the creamery should make next.";
    els.creameryStateTitle.textContent = recipe === "butter" ? "Churn Fresh Butter" : "Make Goat Cheese";
    els.creameryStateMessage.textContent = missing ? `Collect ${missing} more ${recipe === "butter" ? "cow milk" : "goat milk"}.` : "All ingredients are ready in the shed.";
    els.creameryAction.disabled = missing > 0;
    els.creameryAction.textContent = missing ? "Ingredients needed" : recipe === "butter" ? "Make 1 butter" : "Make 1 cheese";
  }

  function handleCreameryAction() {
    updateCreameryProduction();
    if (!state.creamery.built) {
      if (!state.goat.built || state.coins < CREAMERY_COST || state.supplyCrates < CREAMERY_SUPPLY_COST) return;
      state.coins -= CREAMERY_COST;
      state.supplyCrates -= CREAMERY_SUPPLY_COST;
      state.creamery.built = true;
      saveState();
      setStatus("The farm creamery is built and ready for fresh goat milk!");
    } else if (state.creamery.cheeseReady || state.creamery.butterReady) {
      const readyKey = state.creamery.butterReady ? "butter" : "cheese";
      if (usedStorage() + PRODUCTS[readyKey].storage > state.capacity) return;
      state.inventory[readyKey] += 1;
      state.creamery[`${readyKey}Ready`] = 0;
      saveState();
      setStatus(`One ${PRODUCTS[readyKey].name.toLowerCase()} collected and stored in the shed.`);
    } else if (!state.creamery.readyAt) {
      const recipe = state.creamery.selectedRecipe === "butter" && state.creamery.upgraded ? "butter" : "cheese";
      const ingredient = recipe === "butter" ? "milk" : "goatMilk";
      if (state.inventory[ingredient] < 2) return;
      state.inventory[ingredient] -= 2;
      state.creamery.activeRecipe = recipe;
      state.creamery.readyAt = Date.now() + (recipe === "butter" ? BUTTER_TIME_MS : CHEESE_TIME_MS);
      saveState();
      setStatus(recipe === "butter" ? "The fresh butter is churning." : "The goat cheese is setting.");
    }
    render();
  }

  function upgradeCreamery() {
    if (upgradingCreamery || !state.creamery.built || state.creamery.upgraded || state.coins < CREAMERY_UPGRADE_COST || state.supplyCrates < CREAMERY_UPGRADE_SUPPLY_COST) return;
    upgradingCreamery = true;
    state.coins -= CREAMERY_UPGRADE_COST;
    state.supplyCrates -= CREAMERY_UPGRADE_SUPPLY_COST;
    state.creamery.upgraded = true;
    state.creamery.selectedRecipe = "butter";
    saveState();
    setStatus("The Dairy Room is ready! Fresh butter can now be churned.");
    upgradingCreamery = false;
    render();
  }

  function openSheet(sheet) {
    [els.plantSheet, els.storageSheet, els.marketSheet, els.landSheet, els.coopSheet, els.bakerySheet, els.cowSheet, els.goatSheet, els.creamerySheet].forEach(item => { item.hidden = true; });
    els.overlay.hidden = false;
    sheet.hidden = false;
    sheet.querySelector("button")?.focus();
  }

  function closeSheets() {
    els.overlay.hidden = true;
    [els.plantSheet, els.storageSheet, els.marketSheet, els.landSheet, els.coopSheet, els.bakerySheet, els.cowSheet, els.goatSheet, els.creamerySheet].forEach(sheet => { sheet.hidden = true; });
    selectedPlot = null;
  }

  document.querySelector("#storage-button").addEventListener("click", () => { renderStorage(); openSheet(els.storageSheet); });
  document.querySelector("#shed-button").addEventListener("click", () => { renderStorage(); openSheet(els.storageSheet); });
  document.querySelector("#market-button").addEventListener("click", () => { renderMarket(); openSheet(els.marketSheet); });
  els.landButton.addEventListener("click", () => { if (state.plotCount < LAND_EXPANSION.plotCount) { renderLand(); openSheet(els.landSheet); } });
  els.coopButton.addEventListener("click", () => { renderCoop(); openSheet(els.coopSheet); });
  els.bakeryButton.addEventListener("click", () => { renderBakery(); openSheet(els.bakerySheet); });
  els.cowButton.addEventListener("click", () => { renderCow(); openSheet(els.cowSheet); });
  els.goatButton.addEventListener("click", () => { renderGoat(); openSheet(els.goatSheet); });
  els.creameryButton.addEventListener("click", () => { renderCreamery(); openSheet(els.creamerySheet); });
  document.querySelectorAll("[data-close]").forEach(button => button.addEventListener("click", closeSheets));
  els.overlay.addEventListener("click", closeSheets);
  els.upgradeButton.addEventListener("click", buyUpgrade);
  els.sellAll.addEventListener("click", sellEverything);
  els.completeOrder.addEventListener("click", completeOrder);
  els.coopAction.addEventListener("click", handleCoopAction);
  els.bakeryAction.addEventListener("click", handleBakeryAction);
  els.bakeryUpgradeButton.addEventListener("click", upgradeBakery);
  document.querySelectorAll("[data-bakery-recipe]").forEach(button => button.addEventListener("click", () => {
    if (button.dataset.bakeryRecipe === "pie" && !state.bakery.upgraded) return;
    state.bakery.selectedRecipe = button.dataset.bakeryRecipe; saveState(); renderBakery();
  }));
  els.landAction.addEventListener("click", buyLand);
  els.cowAction.addEventListener("click", handleCowAction);
  els.goatAction.addEventListener("click", handleGoatAction);
  els.creameryAction.addEventListener("click", handleCreameryAction);
  els.creameryUpgradeButton.addEventListener("click", upgradeCreamery);
  document.querySelectorAll("[data-creamery-recipe]").forEach(button => button.addEventListener("click", () => {
    if (button.dataset.creameryRecipe === "butter" && !state.creamery.upgraded) return;
    state.creamery.selectedRecipe = button.dataset.creameryRecipe; saveState(); renderCreamery();
  }));
  document.addEventListener("keydown", event => { if (event.key === "Escape") closeSheets(); });
  document.addEventListener("visibilitychange", () => { if (!document.hidden) render(); });

  render();
  ticker = window.setInterval(render, 1000);
  window.addEventListener("beforeunload", () => window.clearInterval(ticker));
})();

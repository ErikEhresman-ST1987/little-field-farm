(function () {
  "use strict";

  const SAVE_KEY = "littleFieldFarm.v1";
  const UPGRADE_COST = 24;
  const COOP_COST = 60;
  const EGG_TIME_MS = 60000;
  const EGGS_PER_BATCH = 2;
  const CROPS = {
    carrot: { name: "Carrots", cost: 2, price: 5, growMs: 20000, storage: 1, color: "#ef8137" },
    wheat: { name: "Wheat", cost: 4, price: 10, growMs: 45000, storage: 1, color: "#e2b84f" },
    pumpkin: { name: "Pumpkin", cost: 7, price: 19, growMs: 90000, storage: 2, color: "#df6f2e" }
  };
  const PRODUCTS = {
    ...CROPS,
    egg: { name: "Eggs", price: 8, storage: 1, color: "#f3e7bd" }
  };
  const ORDERS = [
    { id: "carrot-basket", title: "Carrot Basket", needs: { carrot: 2 }, reward: 12 },
    { id: "pantry-basics", title: "Pantry Basics", needs: { carrot: 1, wheat: 1 }, reward: 18 },
    { id: "miller-bundle", title: "Miller’s Bundle", needs: { wheat: 2 }, reward: 24 },
    { id: "harvest-pair", title: "Harvest Pair", needs: { carrot: 2, wheat: 1 }, reward: 24 },
    { id: "autumn-basket", title: "Autumn Basket", needs: { carrot: 1, pumpkin: 1 }, reward: 29 },
    { id: "baker-supply", title: "Baker’s Supply", needs: { wheat: 1, pumpkin: 1 }, reward: 35 },
    { id: "pumpkin-porch", title: "Pumpkin Porch", needs: { pumpkin: 2 }, reward: 46 },
    { id: "breakfast-dozen", title: "Breakfast Basket", needs: { egg: 2 }, reward: 20, requiresCoop: true },
    { id: "country-breakfast", title: "Country Breakfast", needs: { carrot: 1, egg: 2 }, reward: 26, requiresCoop: true },
    { id: "baker-eggs", title: "Baker’s Eggs", needs: { wheat: 1, egg: 2 }, reward: 32, requiresCoop: true },
    { id: "autumn-kitchen", title: "Autumn Kitchen", needs: { pumpkin: 1, egg: 2 }, reward: 43, requiresCoop: true }
  ];

  const freshState = () => ({
    coins: 18,
    capacity: 6,
    upgraded: false,
    activeOrder: null,
    inventory: { carrot: 0, wheat: 0, pumpkin: 0, egg: 0 },
    coop: { built: false, readyAt: null, eggsReady: 0 },
    plots: Array.from({ length: 6 }, () => null)
  });

  let state = loadState();
  const loadedOrder = findOrder(state.activeOrder);
  if (!loadedOrder || (loadedOrder.requiresCoop && !state.coop.built)) {
    state.activeOrder = chooseOrder();
    saveState();
  }
  let selectedPlot = null;
  let ticker = null;
  let completingOrder = false;

  const els = {
    coins: document.querySelector("#coin-count"), storageCount: document.querySelector("#storage-count"),
    grid: document.querySelector("#plot-grid"), status: document.querySelector("#status-message"),
    overlay: document.querySelector("#overlay"), plantSheet: document.querySelector("#plant-sheet"),
    storageSheet: document.querySelector("#storage-sheet"), marketSheet: document.querySelector("#market-sheet"),
    coopSheet: document.querySelector("#coop-sheet"), coopButton: document.querySelector("#coop-button"),
    coopBoardLabel: document.querySelector("#coop-board-label"), eggReadyBadge: document.querySelector("#egg-ready-badge"),
    coopSubtitle: document.querySelector("#coop-subtitle"), coopStateTitle: document.querySelector("#coop-state-title"),
    coopStateMessage: document.querySelector("#coop-state-message"), coopProgress: document.querySelector("#coop-progress"),
    coopProgressBar: document.querySelector("#coop-progress-bar"), coopRecipe: document.querySelector("#coop-recipe"),
    coopAction: document.querySelector("#coop-action-button"),
    cropChoices: document.querySelector("#crop-choices"), inventoryList: document.querySelector("#inventory-list"),
    marketList: document.querySelector("#market-list"), upgradeButton: document.querySelector("#upgrade-button"),
    upgradeCard: document.querySelector("#upgrade-card"), shed: document.querySelector("#shed-button"),
    shedExtension: document.querySelector("#shed-extension"), storageSubtitle: document.querySelector("#storage-subtitle"),
    sellAll: document.querySelector("#sell-all-button"), orderTitle: document.querySelector("#order-title"),
    orderReward: document.querySelector("#order-reward"), orderRequirements: document.querySelector("#order-requirements"),
    completeOrder: document.querySelector("#complete-order-button")
  };

  function findOrder(orderId) { return ORDERS.find(order => order.id === orderId); }

  function chooseOrder(excludeId = null) {
    const choices = ORDERS.filter(order => order.id !== excludeId && (!order.requiresCoop || state.coop.built));
    return choices[Math.floor(Math.random() * choices.length)].id;
  }

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(SAVE_KEY));
      if (!saved || !Array.isArray(saved.plots)) return freshState();
      return {
        ...freshState(), ...saved,
        inventory: { ...freshState().inventory, ...(saved.inventory || {}) },
        coop: { ...freshState().coop, ...(saved.coop || {}) },
        plots: Array.from({ length: 6 }, (_, i) => saved.plots[i] || null)
      };
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

  function render() {
    const eggsJustReady = updateCoopProduction();
    els.coins.textContent = state.coins;
    els.storageCount.textContent = `${usedStorage()}/${state.capacity}`;
    els.shed.classList.toggle("upgraded", state.upgraded);
    renderCoopBoard();
    renderPlots();
    if (!els.storageSheet.hidden) renderStorage();
    if (!els.marketSheet.hidden) renderMarket();
    if (!els.plantSheet.hidden) renderCropChoices();
    if (!els.coopSheet.hidden) renderCoop();
    if (eggsJustReady) setStatus("The chickens have laid two eggs. Tap the coop to collect them!");
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
      row.innerHTML = `<span class="item-dot${key === "egg" ? " egg-dot" : ""}" aria-hidden="true"></span><div><strong>${crop.name}</strong><span>${crop.storage} storage space${crop.storage > 1 ? "s" : ""} each</span></div><strong>× ${state.inventory[key]}</strong>`;
      els.inventoryList.appendChild(row);
    });
    if (state.upgraded) {
      els.upgradeCard.innerHTML = "<div class=\"upgrade-art\" aria-hidden=\"true\"><span></span></div><div><h3>Roomier Shed</h3><p>Upgrade complete — 10 storage spaces.</p></div>";
    } else {
      els.upgradeButton.disabled = state.coins < UPGRADE_COST;
      els.upgradeButton.textContent = state.coins < UPGRADE_COST ? `${UPGRADE_COST - state.coins} more` : `${UPGRADE_COST} coins`;
    }
  }

  function buyUpgrade() {
    if (state.upgraded || state.coins < UPGRADE_COST) return;
    state.coins -= UPGRADE_COST;
    state.capacity = 10;
    state.upgraded = true;
    saveState();
    setStatus("The shed is bigger! You can now store 10 spaces of produce.");
    render();
  }

  function renderMarket() {
    renderOrder();
    els.marketList.replaceChildren();
    Object.entries(PRODUCTS).forEach(([key, crop]) => {
      const count = state.inventory[key];
      const row = document.createElement("div");
      row.className = "market-row";
      row.style.setProperty("--item-color", crop.color);
      row.innerHTML = `<span class="item-dot${key === "egg" ? " egg-dot" : ""}" aria-hidden="true"></span><div><strong>${crop.name}</strong><span>${count} stored • ${crop.price} coins each</span></div>`;
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
    els.orderTitle.textContent = order.title;
    els.orderReward.textContent = `${order.reward} coins`;
    els.orderRequirements.replaceChildren();
    Object.entries(order.needs).forEach(([key, amount]) => {
      const crop = PRODUCTS[key];
      const stored = state.inventory[key];
      const met = stored >= amount;
      const requirement = document.createElement("div");
      requirement.className = `order-requirement${met ? " met" : ""}`;
      requirement.style.setProperty("--item-color", crop.color);
      requirement.innerHTML = `<span class="item-dot${key === "egg" ? " egg-dot" : ""}" aria-hidden="true"></span><span>${crop.name}</span><strong>${Math.min(stored, amount)} / ${amount}</strong>`;
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
    state.activeOrder = chooseOrder(order.id);
    saveState();
    setStatus(`Order complete! You earned ${order.reward} coins.`);
    render();
    const card = document.querySelector(".order-card");
    card.classList.remove("order-complete");
    void card.offsetWidth;
    card.classList.add("order-complete");
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

  function openSheet(sheet) {
    [els.plantSheet, els.storageSheet, els.marketSheet, els.coopSheet].forEach(item => { item.hidden = true; });
    els.overlay.hidden = false;
    sheet.hidden = false;
    sheet.querySelector("button")?.focus();
  }

  function closeSheets() {
    els.overlay.hidden = true;
    [els.plantSheet, els.storageSheet, els.marketSheet, els.coopSheet].forEach(sheet => { sheet.hidden = true; });
    selectedPlot = null;
  }

  document.querySelector("#storage-button").addEventListener("click", () => { renderStorage(); openSheet(els.storageSheet); });
  document.querySelector("#shed-button").addEventListener("click", () => { renderStorage(); openSheet(els.storageSheet); });
  document.querySelector("#market-button").addEventListener("click", () => { renderMarket(); openSheet(els.marketSheet); });
  els.coopButton.addEventListener("click", () => { renderCoop(); openSheet(els.coopSheet); });
  document.querySelectorAll("[data-close]").forEach(button => button.addEventListener("click", closeSheets));
  els.overlay.addEventListener("click", closeSheets);
  els.upgradeButton.addEventListener("click", buyUpgrade);
  els.sellAll.addEventListener("click", sellEverything);
  els.completeOrder.addEventListener("click", completeOrder);
  els.coopAction.addEventListener("click", handleCoopAction);
  document.addEventListener("keydown", event => { if (event.key === "Escape") closeSheets(); });
  document.addEventListener("visibilitychange", () => { if (!document.hidden) render(); });

  render();
  ticker = window.setInterval(render, 1000);
  window.addEventListener("beforeunload", () => window.clearInterval(ticker));
})();

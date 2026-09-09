(function () {
  "use strict";

  const SAVE_KEY = "littleFieldFarm.v1";
  const UPGRADE_COST = 24;
  const CROPS = {
    carrot: { name: "Carrots", cost: 2, price: 5, growMs: 20000, storage: 1, color: "#ef8137" },
    wheat: { name: "Wheat", cost: 4, price: 10, growMs: 45000, storage: 1, color: "#e2b84f" },
    pumpkin: { name: "Pumpkin", cost: 7, price: 19, growMs: 90000, storage: 2, color: "#df6f2e" }
  };

  const freshState = () => ({
    coins: 18,
    capacity: 6,
    upgraded: false,
    inventory: { carrot: 0, wheat: 0, pumpkin: 0 },
    plots: Array.from({ length: 6 }, () => null)
  });

  let state = loadState();
  let selectedPlot = null;
  let ticker = null;

  const els = {
    coins: document.querySelector("#coin-count"), storageCount: document.querySelector("#storage-count"),
    grid: document.querySelector("#plot-grid"), status: document.querySelector("#status-message"),
    overlay: document.querySelector("#overlay"), plantSheet: document.querySelector("#plant-sheet"),
    storageSheet: document.querySelector("#storage-sheet"), marketSheet: document.querySelector("#market-sheet"),
    cropChoices: document.querySelector("#crop-choices"), inventoryList: document.querySelector("#inventory-list"),
    marketList: document.querySelector("#market-list"), upgradeButton: document.querySelector("#upgrade-button"),
    upgradeCard: document.querySelector("#upgrade-card"), shed: document.querySelector("#shed-button"),
    shedExtension: document.querySelector("#shed-extension"), storageSubtitle: document.querySelector("#storage-subtitle"),
    sellAll: document.querySelector("#sell-all-button")
  };

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(SAVE_KEY));
      if (!saved || !Array.isArray(saved.plots)) return freshState();
      return {
        ...freshState(), ...saved,
        inventory: { ...freshState().inventory, ...(saved.inventory || {}) },
        plots: Array.from({ length: 6 }, (_, i) => saved.plots[i] || null)
      };
    } catch (_) { return freshState(); }
  }

  function saveState() { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); }
  function usedStorage() { return Object.entries(state.inventory).reduce((sum, [key, count]) => sum + CROPS[key].storage * count, 0); }
  function totalItems() { return Object.values(state.inventory).reduce((sum, count) => sum + count, 0); }
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

  function render() {
    els.coins.textContent = state.coins;
    els.storageCount.textContent = `${usedStorage()}/${state.capacity}`;
    els.shed.classList.toggle("upgraded", state.upgraded);
    renderPlots();
    if (!els.storageSheet.hidden) renderStorage();
    if (!els.marketSheet.hidden) renderMarket();
    if (!els.plantSheet.hidden) renderCropChoices();
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
    Object.entries(CROPS).forEach(([key, crop]) => {
      const row = document.createElement("div");
      row.className = "inventory-row";
      row.style.setProperty("--item-color", crop.color);
      row.innerHTML = `<span class="item-dot" aria-hidden="true"></span><div><strong>${crop.name}</strong><span>${crop.storage} storage space${crop.storage > 1 ? "s" : ""} each</span></div><strong>× ${state.inventory[key]}</strong>`;
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
    els.marketList.replaceChildren();
    Object.entries(CROPS).forEach(([key, crop]) => {
      const count = state.inventory[key];
      const row = document.createElement("div");
      row.className = "market-row";
      row.style.setProperty("--item-color", crop.color);
      row.innerHTML = `<span class="item-dot" aria-hidden="true"></span><div><strong>${crop.name}</strong><span>${count} stored • ${crop.price} coins each</span></div>`;
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

  function sellOne(cropKey) {
    if (state.inventory[cropKey] <= 0) return;
    state.inventory[cropKey] -= 1;
    state.coins += CROPS[cropKey].price;
    saveState();
    setStatus(`${CROPS[cropKey].name} sold for ${CROPS[cropKey].price} coins.`);
    render();
  }

  function sellEverything() {
    let earnings = 0;
    Object.keys(CROPS).forEach(key => {
      earnings += state.inventory[key] * CROPS[key].price;
      state.inventory[key] = 0;
    });
    if (!earnings) return;
    state.coins += earnings;
    saveState();
    setStatus(`Market sale complete — you earned ${earnings} coins.`);
    render();
  }

  function openSheet(sheet) {
    [els.plantSheet, els.storageSheet, els.marketSheet].forEach(item => { item.hidden = true; });
    els.overlay.hidden = false;
    sheet.hidden = false;
    sheet.querySelector("button")?.focus();
  }

  function closeSheets() {
    els.overlay.hidden = true;
    [els.plantSheet, els.storageSheet, els.marketSheet].forEach(sheet => { sheet.hidden = true; });
    selectedPlot = null;
  }

  document.querySelector("#storage-button").addEventListener("click", () => { renderStorage(); openSheet(els.storageSheet); });
  document.querySelector("#shed-button").addEventListener("click", () => { renderStorage(); openSheet(els.storageSheet); });
  document.querySelector("#market-button").addEventListener("click", () => { renderMarket(); openSheet(els.marketSheet); });
  document.querySelectorAll("[data-close]").forEach(button => button.addEventListener("click", closeSheets));
  els.overlay.addEventListener("click", closeSheets);
  els.upgradeButton.addEventListener("click", buyUpgrade);
  els.sellAll.addEventListener("click", sellEverything);
  document.addEventListener("keydown", event => { if (event.key === "Escape") closeSheets(); });
  document.addEventListener("visibilitychange", () => { if (!document.hidden) render(); });

  render();
  ticker = window.setInterval(render, 1000);
  window.addEventListener("beforeunload", () => window.clearInterval(ticker));
})();

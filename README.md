# Little Field Farm

A small, cheerful farming-and-production game built for touch-friendly mobile browsers.

Plant carrots, wheat, and pumpkins; watch them grow; harvest them into expandable storage; sell them at the roadside market or fulfill requests from neighbors, restaurants, and local markets; earn rare Supply Crates from special orders; purchase the South Field to expand from six to nine plots; upgrade the shed through a 24-space storehouse; raise chickens for eggs and cows for milk; and build a farm bakery that combines wheat and eggs into bread. The farm saves locally, and crops, chickens, cows, and the bakery continue working while the browser is closed.

## Run locally

Open `index.html` in a browser. No installation or build step is required.

## Current scene-rebuild story system (restored Ink/inkjs)

**Ink/inkjs is the active story runtime** on `main` in `scene-rebuild/`. It was restored in [PR #10](https://github.com/ErikEhresman-ST1987/little-field-farm/pull/10), superseding the earlier catalog-only experiment introduced in PR #9.

The active `scene-rebuild/index.html` loads `story-ink-bundle.js`, `story-ink-registry.js`, `story-unlocks.js`, and `main.js`. Story registration and chapter objectives are defined in the Ink registry; the compiled Ink bundle runs the story. Do not use `story-catalog.js` or `story-runner.js` as the current story-authoring route merely because those old files remain in the repository.

The completed and accepted three-chapter Juliette story is **The Unexpected Dinner Guest**. The operator tested the restored Ink implementation end-to-end in Safari on iPad, including completion and persistence after refresh. Gramps is the player's living, retired grandfather.

The previous [Story Catalog Integration v1.0](https://github.com/ErikEhresman-ST1987/story-engine-test-lab/blob/main/docs/integrations/LITTLE-FIELD-FARM-CATALOG-STORY-SYSTEM-v1.0.md) describes the **superseded PR #9 architecture**, not the current farm runtime. Before adding stories or changing build/upload steps, inspect the current Ink source, registry and compilation process. Do not redesign the runtime to simplify story uploads.

See [PROJECT-CONTINUITY.md](PROJECT-CONTINUITY.md) for verified status, protected decisions, known limitations and the next approved action.

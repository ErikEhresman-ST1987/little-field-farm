# Little Field Farm

A small, cheerful farming-and-production game built for touch-friendly mobile browsers.

Plant carrots, wheat, and pumpkins; watch them grow; harvest them into expandable storage; sell them at the roadside market or fulfill requests from neighbors, restaurants, and local markets; earn rare Supply Crates from special orders; purchase the South Field to expand from six to nine plots; upgrade the shed through a 24-space storehouse; raise chickens for eggs and cows for milk; and build a farm bakery that combines wheat and eggs into bread. The farm saves locally, and crops, chickens, cows, and the bakery continue working while the browser is closed.

## Run locally

Open `index.html` in a browser. No installation or build step is required.

## Current scene-rebuild story system

The current `scene-rebuild/` game uses an editable, data-driven story catalog rather than the legacy Ink story bundle. Add approved stories to `scene-rebuild/story-catalog.js`; `scene-rebuild/story-runner.js` handles dialogue, one choice per chapter, delivery objectives, completion and saved progress. `scene-rebuild/story-unlocks.js` gates story invitations through completed NPC orders. The existing `story-preview/` folder is a separate browser-testing copy, not an automatically synced deployment.

The first accepted story is **The Unexpected Dinner Guest** (three chapters). The player completed it in Safari on iPad and verified completion persisted after refresh. Multi-story acceptance and backup/restore of the new runner remain unverified. Old Ink files and build scripts remain as legacy artifacts, not the active scene-rebuild runtime.

For the complete current contract, limitations and story-addition workflow, see [Story Catalog Integration v1.0](https://github.com/ErikEhresman-ST1987/story-engine-test-lab/blob/main/docs/integrations/LITTLE-FIELD-FARM-CATALOG-STORY-SYSTEM-v1.0.md).

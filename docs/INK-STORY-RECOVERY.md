# Ink story recovery — working branch notes

**Branch:** `feature/restore-ink-story-workflow` (not approved for merging).

## Recovered
- Restored the last Ink-connected `scene-rebuild/main.js` and `scene-rebuild/index.html` from commit `e29e6bf` onto this isolated branch.
- Reused the existing `story-ink-bundle.js`, `story-ink-entry.cjs`, `story-engine/` adapter, and unlock module rather than creating another engine.
- Assigned an isolated localStorage namespace `little-field-farm-ink-recovery-test-v1` so this branch cannot overwrite the current catalog save through the same key.

## Important blockers — do not deploy or merge yet
1. The recovered Ink bundle still contains the **older** story, *The Dinner That Almost Wasn't*, not the current approved *The Unexpected Dinner Guest*. Its chapter objectives include wheat and a vegetable choice. The current approved story has a two-wheat objective and different dialogue. Do not silently substitute the old narrative.
2. The recovered UI is still **Juliette-specific**. Story installation needs to become data-driven: per-story Ink source and manifest, compilation into a package registry, and generic UI dispatch without editing `main.js` for each story.
3. The recovered unlock module on this branch is still catalog-dependent. The Ink branch currently loads no catalog script, so its `STORIES` list is empty; Juliette will not unlock. Fix by using a single authoritative Ink story manifest/registry to register IDs and customer mappings before testing.
4. The old Ink snapshot format differs from the catalog runner's `storyEngine.stories` format. The isolated key avoids collisions, but backup restore/migration must be explicitly designed and tested; do not overwrite or discard a player's catalog save.
5. Run existing automated tests, validate current approved dialogue, verify gameplay events, inventory deductions, save/restore, duplicate deliveries, independent stories and Safari offline behavior before any merge.

## Intended end state
Use the existing `SharedGameNarrative` and farm host adapter. Add each approved story as its own Ink files plus a small declarative manifest. A repeatable local build script compiles all registered stories into one offline bundle. The generic farm Stories UI enumerates that registry, and the unlock gate uses the same manifest IDs. No new narrative engine and no hand-edited compiled bundles.

**Status:** Recovery scaffold only. No claim of functional or player-tested restoration.

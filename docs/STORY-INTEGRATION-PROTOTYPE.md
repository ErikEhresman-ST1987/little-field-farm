# Little Field Farm — Story Engine integration (verified v1)

## Status and evidence
**Integration verified in Safari on iPad, November 5, 2026.** Player completed all three sample chapters, refreshing after each stage, and confirmed narrative and farm progress persisted. Observed: invitation/Ink dialogue, two wheat harvests advancing Chapter 1, a normal neighbor order advancing Chapter 2, explicit final action completing Chapter 3, and completed-state persistence. Farm coins and order activity remained functional. GitHub Actions story-integration build/tests passed after final-chapter instruction cleanup (commit 47f8b811).

This is **an integration proof**, not an approved Juliette story. The chapter dialogue is marked TEST-FIXTURE-ONLY. No full narrative has been approved through OmniQuest Game Story Foundry.

## Proven components and boundaries
- The reusable `SharedGameNarrative`, `NarrativeManager`, `MultiChapterRegistry`, `ChapterSession`, and `validate-manifest` modules were imported from `story-engine-test-lab/packages/story-engine/` into `scene-rebuild/story-engine/`. Treat the lab as the reference source and reconcile changes deliberately; the farm currently contains a copy, not a package dependency.
- `scene-rebuild/story-ink-entry.cjs` compiles three sample Ink chapters with `inkjs/full`, builds the chapter manifest, and constructs `SharedGameNarrative` using a farm-specific `createGame` host adapter. `npm run build:story` bundles it into `story-ink-bundle.js` for offline browser execution.
- `scene-rebuild/main.js` owns actual crop inventory, orders, coins, and farm save. It sends confirmed `harvest.wheat` and `order.delivered` events to the coordinator; the coordinator does **not** deduct items or issue a second order reward.
- The sample host records at most two wheat harvests for Chapter 1 and one delivered order for Chapter 2. Chapter 3 uses explicit `finish.story`. The coordinator gates events by invitation and chapter; completed chapters do not repeat.
- The farm save includes `storyEngine` snapshot. `validateSave` validates this snapshot by reconstructing the coordinator. A failed existing save blocks overwriting until recovery. The preview uses a distinct localStorage key, `little-field-farm-story-preview-v1`, from the live farm.
- `farm-story.js` and the standalone `createSession` in `story-ink-entry.cjs` remain only as earlier prototype/test compatibility code. They are **not** the active narrative coordinator.

## How to reuse in another game
1. Start with an approved game Goal Box/Project Foundation and a story blueprint approved through OmniQuest before replacing fixture text.
2. Reuse the tested Story Engine coordinator modules from the lab; compile validated Ink chapters into `compiledChapters` and declare the chapter IDs, entry/completion paths, events, and effects in the manifest.
3. Implement a game-owned `createGame` adapter with `snapshot`, `restore`, and `event(name,{storyId,chapterId})`. Only the game decides what constitutes a legitimate gameplay event, changes game inventory, or grants rewards.
4. Connect real gameplay actions to `coordinator.event(storyId,eventName)`. Save the coordinator snapshot alongside game state and restore both together; do not independently mutate narrative internals.
5. Bundle inkjs and the coordinator for offline browser use. Test invitation, choices, chapter transitions, duplicate events, save/reload at every stage, and completed-state persistence in the actual target browser.

## Scope and known limits
- Only one three-chapter **sample** story has been manually accepted in this farm. Multi-story coexistence and approved story content have not been player-tested here.
- Chapter 3's finish action is a UI-triggered event, not a real-world farm order; the displayed instruction was corrected after acceptance.
- The preview is isolated at `/little-field-farm/story-preview/`; the live farm remains at `/little-field-farm/scene-rebuild/`. The preview is for development and must not be treated as the released game.
- The farm's preview publishing workflow copies the integration branch's browser assets into `main/story-preview/`; it does not replace the live farm.
- Automated tests include the shared coordinator's three-chapter progression, save/restore, and duplicate-event handling. Manual testing established iPad Safari behavior; it does not establish all-device compatibility.

## Acceptance outcome
**Pass for the current integration seam.** Next work: approve real Juliette story blueprint and Ink content, then test that content separately before release. Do not expand the module contract or add speculative features merely because the first integration succeeded.

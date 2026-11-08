# Little Field Farm — Project Continuity

**Established:** 2026-11-07  
**Repository:** `ErikEhresman-ST1987/little-field-farm`  
**Current game:** `main` / `scene-rebuild/`  
**Status:** Updated after verified Andy story release (2026-11-08).

## Verified state and safe checkpoint
- Little Field Farm is a playable, mobile-friendly farming and production game. Inspect current code before asserting specific features.
- **Ink/inkjs is the restored active story runtime.** PR #10 (`feature/restore-ink-story-workflow`) merged into `main` on 2026-11-06, commit `f4baafed92b16a896e30fd48fa17424e8872aad1`.
- `scene-rebuild/index.html` loads `story-ink-bundle.js`, `story-ink-registry.js`, `story-unlocks.js`, then `main.js`.
- **Juliette's polished replacement story, *The Unexpected Dinner Guest*, is complete.** The active Ink registry uses stable ID `juliette` and three chapters. **The operator personally tested and verified the complete restored Ink story, choices/progression, and saved progress after refresh.** Do not reopen restoration or replacement as pending.
- **Andy’s three-chapter story, *The Case of the Missing Keepsake*, is merged into `main` via PR #14 (squash commit `a33ff5fbd0af03e9d80eb2c3b919cfebb9686338`).** The operator played all three chapters and choices on iPad, reached completion, then reloaded and confirmed **both Andy and Juliette remained Completed**; the existing farm and coins remained visible. This is the latest verified safe checkpoint.

## Protected creative decisions
- Follow Little Field Farm Goal Box and Community and Story Foundation v0.2: cheerful, cozy, character-led stories, believable relationships, humor, occasional mystery, and meaningful player choice.
- **Gramps** is alive, happily retired, and entrusted his grandchild with an **established working farm**. The player is a familiar stranger, not rebuilding an abandoned farm.
- Founding residents: Juliette Childers (restaurant), Sheriff Andy Tiller, Miss Keiko O'Brien (teacher), and Felix Underwood (general store). Preserve their established personalities and six relationships.
- Stories are experienced through farm visits and existing mechanics where possible. No forced timers, mandatory stories, or unapproved consequential player decisions.
- Foundation v0.2's “replace Juliette's test story” assignment is **historical and completed**, not a current instruction.

## Technical ownership and protected behavior
- `scene-rebuild/story-ink-bundle.js`: inkjs and compiled Ink story material.
- `scene-rebuild/story-ink-registry.js`: story registrations, chapter objectives and unlock metadata.
- `scene-rebuild/story-unlocks.js`: invitation gating.
- `scene-rebuild/main.js`: farm host and story integration.
- Inspect the actual active branch, entry point and these files together before changing narrative behavior. Preserve compilation, registration, choices, event/objective progression, local saves and Safari behavior.
- `story-catalog.js` and `story-runner.js` may remain in the repository, but are **not loaded by the inspected active entry point**. Do not silently replace Ink with the catalog-only runner.
- Preview and CI artifacts are not automatically equivalent to the production deployment; verify paths before publishing.

## Important decisions, problems and resolutions
- PR #9 introduced a catalog-only runner and the old README and Story Engine Test Lab integration guide described it as current. That architecture displaced the intended Ink workflow after the operator requested a simpler story-file upload process.
- The operator spent substantial time restoring Ink. PR #10 restored Ink to `main`; subsequent operator testing verified the restored three-chapter story and refresh persistence.
- **Documentation drift caused a continuity failure:** a later assistant relied on outdated README/guide text and mistakenly called Ink obsolete. The current entry point and newer commits take precedence over stale descriptions.
- The catalog-only implementation is a superseded historical experiment, **not** the current Little Field Farm architecture.

## Verified story-addition improvement record (2026-11-08)
**Problem:** Adding a second Ink story risked rejecting existing saves because story invitation, chapter-session, and shared progress records previously expected exactly the old story count. A compiled source story alone also does not guarantee a playable browser build.

**Change:** Added Andy's three approved Ink chapters and manifest, updated save restoration to tolerate newly registered stories while preserving existing story data, compiled both stories into generated registry/bundle assets, and added branch build and backward-compatibility regression tests. Existing Juliette content and stable IDs were retained.

**Verification:** GitHub Actions branch build passed; generated registry, compiled data and browser bundle were checked to contain both stories. Operator played Andy's full three chapters on iPad through completion; after reload, Stories showed both Andy and Juliette Completed, with existing farm state visible. PR #14 merged into `main`; operator confirmed the game working after returning to `main`.

**Repeatable process:** Approve narrative and chapter objectives → implement on a feature branch → compile story assets and run automated compatibility checks → temporarily select that branch in GitHub Settings → Pages (root) → test on iPad with existing save → reload and verify old/new story progress → explicitly approve and merge → return Pages to `main`. For this single-player game, a separate preview hosting system added unnecessary work. Retain a JSON backup before testing because the same site uses the same local save.

**Limits:** This verifies the tested playthrough and reload, not every alternate choice on a real device, offline behavior, or JSON export/import roundtrip. Automated tests cover additional choice paths and legacy save scenarios but are not substitutes for device checks. The story build workflow is branch-specific; adapt its trigger for future branches. GitHub Pages branch changes are manual in the current workflow.

## Known limits and outstanding work
- Proven: two Ink stories coexist, both complete and persist after reload, with existing farm state retained in the observed iPad session.
- Still not specifically verified: offline story play, JSON backup/restore roundtrip for multi-story progress, and every branch choice on device.
- Before a third story, reuse the existing Ink compiler, manifest/registry, save-migration pattern, and regression checks rather than creating another runtime.

## Current direction and next approved action
- Andy story is complete and merged. Next story content and implementation require approval.
- If useful for other projects, **propose** the verified save-migration/story-deployment lesson for the Module Library; do not silently modify that library.

## Maintenance and new-chat rule
At meaningful checkpoints, update this concise record with verified state, significant decisions and reasons, protected behavior, fixes, known limits and the next approved action. This is not a development diary. At the start of a new development chat, read this file, Goal Box and Foundation, then inspect relevant code and the last verified checkpoint. Documentation records decisions but does not replace code inspection or authorize unapproved changes.

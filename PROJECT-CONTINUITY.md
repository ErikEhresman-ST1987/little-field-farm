# Little Field Farm — Project Continuity

**Established:** 2026-11-07  
**Repository:** `ErikEhresman-ST1987/little-field-farm`  
**Current game:** `main` / `scene-rebuild/`  
**Status:** Approved continuity baseline.

## Verified state and safe checkpoint
- Little Field Farm is a playable, mobile-friendly farming and production game. Inspect current code before asserting specific features.
- **Ink/inkjs is the restored active story runtime.** PR #10 (`feature/restore-ink-story-workflow`) merged into `main` on 2026-11-06, commit `f4baafed92b16a896e30fd48fa17424e8872aad1`.
- `scene-rebuild/index.html` loads `story-ink-bundle.js`, `story-ink-registry.js`, `story-unlocks.js`, then `main.js`.
- **Juliette's polished replacement story, *The Unexpected Dinner Guest*, is complete.** The active Ink registry uses stable ID `juliette` and three chapters. **The operator personally tested and verified the complete restored Ink story, choices/progression, and saved progress after refresh.** Do not reopen restoration or replacement as pending.
- The safe checkpoint is the operator-verified Ink implementation on `main`. The merge message's “work in progress” label predates that user verification.

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

## Known limits and outstanding work
- Verified: restored Ink and complete Juliette story, including persistence after refresh.
- Not established by those checks alone: a second story, the exact new-story upload workflow, backup/export-and-restore of story progress, and offline replay. Do not claim failure or success without checking.
- Before documenting an upload procedure, inspect actual current Ink source, build and registration scripts. Do not invent steps.
- Keep README and cross-repository story-engine documentation consistent with this verified state.

## Current direction and next approved action
- **Approved 2026-11-07:** establish this continuity file and correct stale documentation only. Do not alter the working game code or architecture.
- After documentation is aligned, collaboratively select the next story under OmniQuest Story Foundry. Story content and implementation still require explicit approval.

## Maintenance and new-chat rule
At meaningful checkpoints, update this concise record with verified state, significant decisions and reasons, protected behavior, fixes, known limits and the next approved action. This is not a development diary. At the start of a new development chat, read this file, Goal Box and Foundation, then inspect relevant code and the last verified checkpoint. Documentation records decisions but does not replace code inspection or authorize unapproved changes.

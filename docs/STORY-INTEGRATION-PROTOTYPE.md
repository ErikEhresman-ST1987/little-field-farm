# Farm Story Integration — first playable increment

Branch: `story-engine-integration`. The default branch and live Pages site are unchanged.

This first increment adds a Stories panel and a **sample-only Juliette story adapter**. Accept Juliette's invitation, harvest two wheat crops, complete any ordinary neighbor order, and finish the third chapter. Farm events advance story progress; story progress is saved with the existing farm state. No story-specific currency or item rewards are issued. The rotating Orders system remains unchanged.

**Important scope:** This is the gameplay/UI integration seam, not yet the Ink/inkjs runtime. `farm-story.js` currently supplies the sample text and transitions. The next increment replaces that sample state machine with the reusable Story Engine's compiled Ink chapters and shared coordinator. Do not describe this increment as completed Ink integration.

## Browser test after deploying branch to a preview
1. Start a new farm or reset test state; open Stories; accept invitation.
2. Plant and harvest two wheat crops; reopen Stories and verify 2/2 and Continue.
3. Continue to Chapter 2; fulfill any normal neighbor order; verify Continue appears.
4. Finish Chapter 3; verify completed status persists after reload.
5. Verify crops, coins, Orders, and backup/export still function.
6. Verify harvests before acceptance and duplicate orders after completion do not advance the story.

No special preservation of test saves is required. Existing version-3 saves without story progress receive fresh story defaults. This branch has not yet undergone manual Safari acceptance.

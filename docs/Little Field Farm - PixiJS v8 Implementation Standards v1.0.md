# Little Field Farm — PixiJS v8 Implementation Standards v1.0

Status: Adopted technical companion; does not supersede the Little Field Farm Goal Box, Foundation Plan, app development principles, mobile interface guidelines, or artwork pipeline.
Scope: PixiJS v8 rebuild in `proof/` on `development/little-field-farm-rebuild`. This document is project-specific guidance, not a claim that PixiJS requires every convention below.

## Authoritative references
- PixiJS v8 Guides: https://pixijs.com/8.x/guides
- Quick Start: https://pixijs.com/8.x/guides/getting-started/quick-start
- Scene Objects: https://pixijs.com/8.x/guides/components/scene-objects
- Assets: https://pixijs.com/8.x/guides/components/assets
- Events and Interaction: https://pixijs.com/8.x/guides/components/events
- Ticker: https://pixijs.com/8.x/guides/components/ticker
- Performance Tips: https://pixijs.com/8.x/guides/concepts/performance-tips
Consult the matching version's documentation before using unfamiliar APIs. URLs are reference pointers, not a claim of a live documentation audit.

## 1. Development discipline
- Work in small, explicitly approved increments; preserve the functioning branch and do not modify the retired prototype unnecessarily.
- Separate **source inspection**, **automated checks**, and **human device verification**. Never report a browser test that did not occur.
- Keep each increment reversible; record the changed files, commit, expected result, and iPad/iPhone test.
- Treat the 12 upper-left crop beds as approved. All five crop families and all 25 growth textures must remain available.
- The current scene is a visual proof, not finished planting, harvesting, inventory, or production gameplay.

## 2. Scene graph and coordinates
- Use one world-coordinate system (currently 1536×1024), with named containers for background, crops, community buildings, animals, production facilities, and foreground/effects as they become necessary.
- Use data-driven placements with documented coordinates, scale, and anchors. Avoid scattering unexplained numeric positions throughout event handlers.
- Define an intentional draw order. Within shared ground areas, consider footpoint-based sorting when overlapping objects demand it.
- Keep decorative art non-interactive; enable pointer events only on actionable objects. Make touch targets practical at mobile scale.
- Keep camera movement separate from game-object actions.

## 3. Assets and artwork
- Prefer approved optimized WebP artwork, preserving transparency and aspect ratio.
- Centralize filenames and asset metadata. Move to PixiJS Assets bundles/manifest when the asset count justifies it, rather than adding complexity prematurely.
- Load each asset once and reuse textures. Avoid rebuilding sprites/textures every frame.
- Catch loading failures and display actionable status; optional art failures must not blank the entire farm.
- Verify sprite-sheet frame dimensions and padding before creating animated textures. Do not assume sheets share a common grid.

## 4. Animation and update loop
- Use PixiJS Ticker / AnimatedSprite for continuous visual animation, with frame-rate-independent movement where appropriate.
- Keep visual animation separate from gameplay timing, persistent state, and production queues.
- Pause or limit unnecessary animations when not visible where feasible. Avoid one uncoordinated timer per animal or machine.
- Provide gentle, non-frantic animations; no deadlines or punitive neglect mechanics.

## 5. Mobile and camera
- Test portrait and landscape, iPhone and iPad; verify zoom/pan bounds and reset behavior.
- Handle taps versus drags using a deliberate movement threshold; avoid accidental crop actions while panning.
- Handle multi-touch transitions, pointer cancellation, and pointer capture safely. Validate zoom focal points and minimum/maximum scales.
- Refit on viewport changes only when appropriate; avoid unexpectedly discarding a user's camera position.
- Respect Safari caching and GitHub Pages deployment delay. Cache-bust only when assets/scripts actually change.

## 6. Performance and reliability
- Start with simple containers and textures. Profile before adopting advanced render groups, particle systems, or premature micro-optimizations.
- Cap resolution sensibly on high-density devices and watch texture memory as the farm grows.
- Test asset errors, resize, pan/zoom, tap, and reload before adding the next feature.
- Keep source readable and modular as complexity grows; move camera, assets, crops, animals, and buildings into separate modules when this demonstrably reduces fragility.

## 7. Verification gate for each increment
1. Source diff reviewed; no unrelated files modified.
2. Asset names/paths checked against repository.
3. Syntax/static checks performed where available.
4. Confirmed behavior distinguished from untested behavior.
5. User tests on actual device and approves or requests correction.
6. Only then proceed to next increment.

## Initial read-only audit — 2026-10-12
Source inspected: `proof/main.js`, `proof/index.html`, `proof/style.css` on `development/little-field-farm-rebuild`. Findings are source-based, not runtime failures confirmed on device.

**Working foundations**
- PixiJS v8 app initialization, world container, background, five crop texture families, 12 visible crop sprites, separate community container, and basic pan/pinch/scroll controls exist.
- Approved barn, market stall, and order-board files are loaded independently with per-building error handling.
- Render resolution is capped at 2; a Reset View button exists.

**Recommended fixes before gameplay grows**
- **High — Tap/drag classification:** `moved` is shared globally, reset on pointer-down and after pointer-up timeout. A 1-pixel move can flag dragging, and timing may cause accidental or missed taps. Introduce explicit movement threshold and per-gesture handling; verify on iPad.
- **High — Camera boundaries:** pan is unconstrained; zoom minimum/maximum are fixed but world can be dragged entirely offscreen. Add safe camera bounds after testing intended navigation.
- **Medium — Asset error isolation:** all crop assets load in one combined startup try/catch, so one missing crop image prevents the farm from initializing. Provide clearer diagnostics and fallback strategy.
- **Medium — Responsive camera:** resize currently calls `fit()` and discards the user's zoom and position. Decide desired behavior before implementing.
- **Medium — Modularity:** a single `main.js` currently handles initialization, assets, crops, buildings, input, and camera. Split by responsibility when adding animals/gameplay, not merely for file count.
- **Medium — Loading experience:** startup waits for all 25 crop textures before displaying the farm. Consider progressive or bundled loading if measured load time is poor.
- **Low — Diagnostics:** error messages are user-visible but lack a structured test checklist; add lightweight diagnostic logging during development.
- **Deferred:** game-state persistence, production queues, animal animation lifecycle, and scene depth sorting must be designed when those systems are implemented.

**Audit conclusion:** No need to rewrite the working proof. Address touch-gesture correctness and camera behavior before substantial new interactivity; improve asset organization and modules as gameplay expands. No code changes authorized by this audit.

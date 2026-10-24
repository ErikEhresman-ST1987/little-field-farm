# Little Field Farm v2 — Visual Scene and Asset Placement Workflow
Version: 0.1 | Date: 2026-10-23
Status: Approved design direction; implementation sequence and verification gates documented. Clean background and upgraded editor are NOT yet implemented.
Scope: Little Field Farm v2, development/little-field-farm-v2

## 1. Purpose and governing constraints
Build a cheerful, richly illustrated, angled storybook farm for iPad/tablet landscape (4:3 primary). Preserve the approved overall composition: nine crop locations, four production locations, four animal enclosures, farmhouse/barn, market, order board, NPC entrance, and coherent scenery. No frantic play. Keep fixed locations, not player-controlled free placement.

This workflow refines the approved Project Foundation's visual implementation. It follows the Artwork Guide v2.0: CREATE → APPROVE → LOCK CANONICAL → PREPARE → VERIFY → IMPLEMENT. Changes to approved visual content require new visual approval; technical processing must not silently redesign it. Keep gameplay state independent of rendering, and HTML/CSS responsible for semantic UI.

## 2. Architectural decision: clean scenic background + reusable interactive components
The scenic background should show coherent permanent landscape (light-colored ground in work areas, paths, trees, farmhouse, barn, fixed decorative elements). Do NOT bake the nine soil beds, four production pads, or four animal fences into the new background.

Instead:
- Crop-bed component: one reusable bed/base sprite placed nine times; crop growth states render separately above its soil. A crop bed is not one flattened image containing all growth states.
- Production component: independent pad/base plus independently appearing machine/building, upgrade states and animation when needed.
- Animal enclosure component: ground and rear fence, animal sprites and motion, front fence/foreground occlusion. This is one reusable logical component, not necessarily one flattened texture.
- Market, order board and NPC entrance: existing permanent scenery may remain in background where their appearance does not need to change; use separate interaction regions/overlays. Split only when interaction, animation, reuse or depth makes it worthwhile.
- Fixed placement definitions supply positions, sizes/scales, anchors, interaction areas and movement bounds as applicable. Reusable components are instantiated from the same definitions in editor and game.

This is NOT a tilemap conversion, free-placement game, or commitment to a general-purpose editor. Use ordinary PixiJS containers/sprites and an explicit layer/depth scheme.

## 3. Background creation workflow (Artwork Creation chat)
1. Begin with the exact approved farm composition and reference art. Produce a short revision brief: preserve viewpoint, perspective, palette, lighting, scenery, buildings, paths, scene dimensions and designated work-area locations.
2. Create a revised CLEAN scenic background: remove baked-in soil beds, production pads and animal fences; replace their footprint with visually continuous matching light ground. Avoid obvious erased patches, seams, shadows from absent objects, and incompatible perspective. Keep adequate clear space for future object silhouettes.
3. Review the new visual against the original for composition and continuity. This is a creative revision, NOT a lossless technical edit; it requires explicit approval. Do not overwrite the old approved canonical source.
4. Lock the newly approved background as a new canonical file with dimensions, provenance and checksum. Keep the earlier background and placement references for recovery.
5. Derive the runtime WebP from the new approved canonical. Verify appearance, aspect ratio, decode and file integrity on iPad. Preserve 4:3 coordinates, or document any deliberate dimension change and mapping.

## 4. Component artwork workflow
1. Make ONE representative crop-bed sprite matching the new background's perspective, footprint, lighting and shadows; approve it before generating a family.
2. Make representative crop growth sprites with stable feet/soil attachment point and consistent size across stages; crops overlay the bed.
3. Make ONE representative production pad and building silhouette; test how building base sits on the pad and how purchase/upgrade visibility changes.
4. Make ONE enclosure prototype with rear/ground and front fence parts, plus one test animal. Verify that the animal can move behind the front fence without appearing to walk through it.
5. Use transparent assets where appropriate, preserve canonical source and production derivative separately, and record nominal dimensions and anchor conventions. Inspect at actual gameplay scale. Produce additional artwork only after prototypes pass.

Suggested local conventions (to validate with actual sprites): sprite anchors at bottom center for standing animals/buildings; bed anchor at its designated visual ground position; store width/scale separately from position. Do not force one universal anchor convention onto every asset.

## 5. Placement data: single source of truth
The working source is assets/farm-v2/background/farm_placement_map.json on development/little-field-farm-v2. The existing 2026-10-23 iPad-calibrated polygons and sprite_anchor values are a useful DRAFT, not final runtime truth.

Separate these concepts:
- region ID: stable identity (crop_1..9, production_1..4, animal_1..4, npc_entrance, market, order_board).
- placement: position/anchor, intended sprite size or scale, and optional depth order.
- interaction area: forgiving touch target; need not trace decorative art pixel-perfectly.
- animal movement area: safe walkable footprint INSIDE enclosure, independent of tap target.
- visual bounds: optional diagnostics for overlap and safe spacing.
- legacy center: original map reference; do not silently substitute it for a calibrated sprite_anchor.

Coordinate convention: original 1448 × 1086 native pixels, origin top left, scaled uniformly with the scene. If canonical dimensions change, explicitly transform and verify placement rather than assuming old values fit. Runtime and editor MUST consume the same versioned placement data, with validation and no hand-transcribed duplicates.

## 6. Placement tool: current and next state
Existing diagnostic:
- assets/farm-v2/verification/index.html: background/region touch verification.
- assets/farm-v2/verification/calibrate.html: select regions, drag polygon corners, adjust red sprite anchor, undo/reset, prepare JSON, Copy JSON, Download JSON.
- Existing editor uses a PixiJS CDN for diagnostics and is not yet a production/offline editor.
- Calibration edits remain in the open page until exported; refreshing loses unexported changes. Export is a draft, not an automatic repository write.

Approved direction for a focused improvement:
1. Show actual approved component sprite previews over the clean background, initially using the saved draft anchors.
2. Select/tap an object, drag to position, adjust scale and anchor; keep advanced interaction polygon controls available but secondary.
3. Show/hide boundaries and movement zones independently.
4. Add reliable local draft persistence with clear Reset/Restore behavior; keep one-tap Copy JSON and Download JSON.
5. Validate missing assets/anchors, out-of-bounds points, invalid polygons, and obvious overlaps before handoff.
6. Export a versioned, reviewable placement JSON; no silent write to GitHub or game saves.

Avoid building a large generalized scene editor unless repeated use demonstrates a real need. Favor minimal controls and reliable iPad interaction.

## 7. End-to-end sequence and approval gates
A. Preserve the current approved background and user-calibrated map as recovery sources. No destructive replacement.
B. Artwork chat: draft the clean background against the approved composition. USER approves new canonical.
C. Prepare lossless/appropriate runtime background derivative, verify iPad rendering.
D. Artwork chat: produce ONE crop-bed prototype and representative crop-state art. USER approves visual family.
E. Dev chat: upgrade placement tool only enough to preview, move and scale crop bed(s), using the shared map; add local save and easy JSON export.
F. On iPad, place one bed, then verify all nine beds. Correct only visibly wrong positions or touch targets. Export and review data.
G. Add one production pad/building prototype, verify four pads, purchase-state appearance and visual overlap.
H. Add one enclosure prototype and animal; verify four positions, movement zone and fence occlusion.
I. Verify market/board/NPC interactions with forgiving hit targets.
J. Lock approved placement config and prepared sprite family assets, integrate the SAME configuration in PixiJS gameplay.
K. Build/test first meaningful play slice (plant → grow → harvest → sell → earn → purchase chicken coop), with local state and persistence; do not require NPC stories or full production systems in first slice.
L. Verify on real iPad: 4:3 scale, touch, visibility, depth, performance, reload, save/restore and purchase appearance. Harvest reusable lessons into Module Library only after approval.

Every stage distinguishes technical rendering success from visual acceptance. Move to the next substantial art family only after a representative passes.

## 8. Known risks and mitigations
- Perspective mismatch: compare component footprint and shadows at actual size before mass production.
- Clean-background seams: inspect revised background before locking; do not treat image erasure as automatically lossless.
- Fence occlusion: render front fence over animals; constrain movement away from edges if needed.
- Tap frustration: use forgiving interaction shapes, not tight pixel masks.
- Scale drift: share native coordinate space and anchor conventions; preview actual sprites.
- Lost calibration work: local draft save + JSON download; do not depend on long manual text copying.
- Old source accidentally overwritten: preserve original canonical, derivative and draft map, and use a new explicitly approved asset identity.
- Unnecessary editor complexity: add only controls demanded by concrete placement tests.

## 9. Definition of done for the visual placement workflow
A new approved clean background renders at 4:3 on iPad; representative bed/building/enclosure assets match perspective; all nine beds/four pads/four pens are positioned without hand-tracing baked-in shapes; tap regions are usable; animal front-fence layering works; editor can save/export/reload placements; runtime consumes the identical reviewed config; old approved source and user-calibrated draft remain recoverable.

## 10. Reference points
- Little Field Farm — Goal Box v0.1 and Project Foundation v0.1 (subsequent explicitly approved changes supersede earlier embedded-work-area assumptions).
- Graphical Artwork and Sprite Production Guide v2.0.
- PixiJS Rendering, Animation and Audio Guide v2.0.
- App Development Principles v3.0 and Module Library START-HERE v2.0.
- Current v2 branch background and verification files.
- User-approved October 23 discussion: clean background, independent reusable objects, retained/refined visual placement tool, and one-tap JSON copy/download.

This document records an approved DIRECTION and a staged PLAN. It does not assert that clean artwork, sprite previews, local editor autosave, or gameplay integration have already been completed.

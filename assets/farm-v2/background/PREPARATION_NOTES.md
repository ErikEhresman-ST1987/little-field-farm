# Little Field Farm v2 — Background preparation v0.1

**Status:** Canonical composition approved; placement reference prepared; PixiJS/iPad integration not yet verified.

Canonical: `farm_background_canonical.png` (1448 × 1086, 4:3), SHA-256 `93cdc2094a25abd5e8f7fdda0e70ddd5c88b8028047edb9afd14eaff918defb6`.

Lossless visual derivative: `farm_background_lossless.webp`; pixel equivalence verified below.

## Layer plan
1. Fixed background (this image): scenery, fixed buildings, empty soil, pad borders, fence structures.
2. Crop growth and production sprites: each aligned to a polygon/anchor.
3. Animals, coop and visitors: independent sprites.
4. Optional near-fence foreground occlusion pieces (requires separate approved creation).
5. HTML/CSS interface overlays owned by app.

## Placement
`farm_placement_map.json` has estimated polygon guides in original image pixels; `farm_placement_overlay.png` is the visual review sheet. The polygon outlines are NOT final hitboxes. Preserve the 4:3 aspect ratio and apply the same scale and offset to image and sprites.

## Important limitations
- All nine soil plots are already painted into the background; only some should be enabled initially by gameplay state.
- All four animal enclosures and production pad boundaries are present from the start.
- Front fences are baked into the image; moving animals may need foreground fence layers to prevent visual overlap.
- Exact sprite dimensions and anchors must be established with a representative sprite and iPad touch test before mass production.
- No repository changes were made.

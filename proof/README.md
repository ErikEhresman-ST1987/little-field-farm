# PixiJS visual integration proof (in progress)

This is an isolated rebuild experiment. The original prototype files on this branch are not changed; the main branch remains untouched.

The proof uses PixiJS 8 and the approved valley and purple-kohlrabi artwork. It is not a playable crop economy.

## Required assets

Place these four generated WebP files in `proof/assets/`:

- `landscape.webp`
- `kohlrabi-empty.webp`
- `kohlrabi-growing.webp`
- `kohlrabi-mature.webp`

They are provided in the companion asset ZIP. The repository does **not** yet contain these binary files, so the hosted proof is not runnable until they are committed.

After uploading, serve the repository with a static server and open `/proof/index.html`. Network access is required for the PixiJS CDN dependency.

## Verify

Check the appearance of all three crop states at normal scale, tap targets, drag/pinch/wheel camera controls, iPhone/iPad/desktop responsiveness, and missing-asset errors. No device test has yet been completed.

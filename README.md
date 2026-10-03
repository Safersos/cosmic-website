# Cosmic website

Static production site for Cosmic RF Perception as Infrastructure.

## Commands

- `npm run build` regenerates and validates every public HTML page in `dist/`.
- `npm run check` syntax-checks the build and homepage runtime, then runs a full build.
- `npm start` serves `dist/` at `http://localhost:8080` for local review.

## Source layout

- `build-pages.mjs` contains the shared shell and public page definitions.
- `invention-content.mjs` and `automotive-research.mjs` isolate the two long, specialized content sections.
- `dist/assets/` contains the runtime CSS, JavaScript, 3D models, and public documents.

Vercel builds with `npm run build` and publishes `dist/` as configured in `vercel.json`.

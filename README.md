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

## Founder workspace

`api/workspace.js` provides database-backed login, eight-hour HttpOnly sessions,
logout, and profile reads/writes. `founder@cosmic` owns `founder`;
`rajeev@cosmic` owns `cofounder`. Both can read profiles; only the owner can save.
Passwords are stored as salted scrypt hashes in Neon, never in public assets.
The Documents tab currently provides an empty state, without file uploads.

The Vercel Neon integration supplies `DATABASE_URL`. For local development,
pull development variables into the ignored `.env.local`, then run `npm start`.
Initialize tables with `node --env-file=.env.local tools/init-database.mjs`.
To set or rotate account passwords, set `COSMIC_FOUNDER_PASSWORD` and
`COSMIC_RAJEEV_PASSWORD` only in the shell environment and run
`node --env-file=.env.local tools/seed-accounts.mjs`. This invalidates sessions.

If the local DNS provider refuses Neon domains, add `COSMIC_DNS_SERVER=1.1.1.1`
to the ignored `.env.local`. The start command uses that resolver only for Neon
hostnames in its own Node process, preserving TLS verification. For setup/tests,
add `--import ./tools/local-dns.mjs` to the Node command. No Windows DNS settings
are modified. Alternatively, configure a working DNS resolver in Windows or
ask the network administrator to allow Neon DNS resolution.

Live API verification: set both password environment variables, then run
`node --env-file=.env.local --import ./tools/local-dns.mjs tools/verify-workspace.mjs`.
It verifies both users, owner saves, cross-profile denial, logout, and anonymous denial.

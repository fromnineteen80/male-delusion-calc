# CLAUDE.md — male-delusion-calc

This is the operating contract for any agent (Claude Code or otherwise) working in this
repository. Read it fully before touching a single file. It is not advisory. If a step here
conflicts with what seems faster or cleaner, this file wins.

The application already exists and is correct. Your job is to assemble it into a published
site **without changing what it does, how it looks, or what it computes.** You are an
integrator and a build runner, not a redesigner and not an author.

**Stack and build target.** The app is a single self-contained **React** component
(`retention_calculator.jsx`, default export). Build it as a static React site with **Vite**,
output a plain static bundle, and deploy that bundle to **GitHub Pages** at the `.io` URL. Use
React 18. The only dependencies the component needs are React itself plus the libraries it
already imports; do not add a framework, a component library, a CSS framework, or a state
manager. No Next.js, no server, no SSR. The deployed result is static HTML/CSS/JS with zero
runtime backend and zero API calls.

**The research, vetting, and math verification are already complete.** The dating-market
modeling, the data sourcing, the B/C/M and V/F/K formulas, the tax engine, every coefficient
and grid, and the full UI have all been built, reviewed, and verified by the team. Nothing is
open for you to investigate, validate, or second-guess. You are not being asked to figure
anything out. You are being asked to implement what is already decided, exactly as intended.

**The code already contains everything needed to harvest the data.** `harvest_snapshot.mjs` is
complete and working. With a free Census API key it pulls every field the model uses and emits
the static snapshot. You do not need to find data sources, write fetch logic, or assemble
endpoints. Supply the key, run the script, verify the output. That is the whole data step.

---

## 0. The one rule everything else serves

**Do not vibe.** Never invent, approximate, "improve," refactor, restructure, rename, or
regenerate anything. Every number, every div, every wrapper, every class, every style value,
every line of math is already decided and verified. If you find yourself typing a value,
a coefficient, a color, a selector, or a piece of markup from your own judgment, stop: you are
about to introduce drift. The only acceptable source for any of those is the files shipped
into this repo. When in doubt, copy verbatim and verify, never paraphrase.

If something appears missing or wrong, do not patch it from intuition. Open an issue note in
`NOTES.md`, describe exactly what you observed, and stop. A halted build is recoverable.
A silently mutated coefficient is not.

---

## 1. Environment and publishing target

- **Nothing is saved to a local hard drive.** All work happens in the cloud workspace and is
  committed to GitHub. Do not write to paths outside the repo. Do not rely on local caches
  surviving between sessions; everything needed must live in the repo or be fetched at build
  time from a public source.
- **Always work directly on `main`.** This repo uses a single branch. Do not create feature
  branches, do not open pull requests, do not push to any branch other than `main`. Commit your
  work to `main`. Because there is no PR gate, the safeguard moves earlier: **run the §5
  verification gates in your working tree and confirm they pass before every commit.** Gates
  pass first, then you commit. Never commit unverified changes to `main`, since a commit to
  `main` deploys to the live site.
- **Publishing target is GitHub Pages at the `.io` domain** (`<owner>.github.io/male-delusion-calc`
  or the repo's configured Pages URL). The published artifact is a static site. No server,
  no runtime API calls, no secrets in the deployed bundle.
- Node 18+ is available for the one-time data build. The deployed site itself must run with
  zero Node, zero backend, pure static assets.

---

## 2. The source assets (the only truth)

These files are pulled into the repo. Treat them as read-only references for their content;
you assemble around them, you do not rewrite them.

| File | What it is | Your latitude |
|------|-----------|---------------|
| `retention_calculator.jsx` | The entire app: math engine, every component, every div/wrapper, the inline `S_` style registry, the `<style>` block. | **None on logic, math, markup, or values.** You may only change import/export plumbing needed to mount it in the site shell. |
| `retention_calculator.css` | Universal stylesheet generated verbatim from the app's `S_` registry and `<style>` block. 172 `.rpm-*` classes plus the base layer (fonts, both palettes, media queries). | **None on values.** Use as-is. |
| `harvest_snapshot.mjs` | One-time build script. Pulls ACS 2023 5-year + CDC PLACES + ZCTA→county map, emits `zipData.js`. | **None on the data logic.** You only run it. |
| `zipData.js` | The static data snapshot (~30,618 ZIPs) the app imports instead of hitting Census at runtime. | Regenerate via the script only; never hand-edit. |
| `Retention_Pricing_Model.docx` | Formal spec of the B/C/M and V/F/K math. | Reference only. The code is the source of truth; the doc explains it. |

If any of these is absent when you start, stop and record it in `NOTES.md`. Do not reconstruct
a missing asset from the others.

---

## 3. The data must be harvested correctly (do not fake it)

The site is worthless if the data is wrong. The numbers must be the real ACS/CDC values, not
placeholders.

1. The Census API key is already obtained. Use it directly:
   ```
   CENSUS_KEY=53b02dd2554c593f6ce2dbba81a34ceaf03c64fe node harvest_snapshot.mjs
   ```
   The same key is also hardcoded as the fallback inside `harvest_snapshot.mjs`, so running
   `node harvest_snapshot.mjs` with no env var works too. Do not stop to sign up for a key and
   do not ask for one. Do **not** commit this key into any deployed/published file; it is for
   the build step only.
2. Run the harvest exactly as written:
   ```
   CENSUS_KEY=<key> node harvest_snapshot.mjs
   ```
3. This produces `zipData.js`. The script pulls one batched call per state (fast), covers every
   ZCTA for the fields the model uses, attaches CDC county obesity via the ZCTA→county map, and
   bakes in the national fallback at build time for any missing field so the **app never decides
   anything at runtime.**
4. Verify the output before trusting it (see §5). Do not eyeball-approve. If the script errors
   or a field comes back empty across the board, stop and record it. Do not substitute invented
   numbers to make the build pass.

### 3a. How the harvest avoids collapsing the ACS API (do not touch this machinery)

The script is already engineered to pull cleanly without tripping Census rate or size limits.
These protections are load-bearing. If a run is slow or hits a transient error, **let the
built-in handling do its job. Do not rewrite the fetch logic, do not parallelize it, do not
remove the waits.** Rewriting this is the single most likely way to make ACS collapse.

What is already in place and must stay:
- **50-variable cap respected.** Census rejects requests over 50 variables. The script batches
  the variable list at `CHUNK = 45` (safe margin) and merges responses by ZIP. Do not raise the
  chunk size and do not combine batches.
- **One wildcard call per chunk, not per ZIP.** Each request pulls every ZCTA at once via the
  wildcard. There is no per-ZIP looping to throttle. Do not convert it to per-ZIP requests.
- **Exponential backoff on 429/500/503.** The fetch helper retries with 1s, 2s, 4s, 8s, 16s
  waits before giving up. Transient Census failures are expected and handled. Do not strip the
  retry/backoff and do not lower the waits.
- **National fallback baked in at build time.** Any ZCTA missing a field gets the documented
  national value during the build, so the app never decides anything at runtime. Do not change
  the fallback values.

How to run it correctly:
- Run it **once, single-process, and let it finish.** It is intentionally sequential. A full
  run makes a small number of batched calls per dataset, so it completes quickly without
  hammering the API.
- Do not run multiple copies in parallel to "speed it up." Parallel runs are what trigger 429s
  and make the pull collapse.
- If it exits with `exhausted retries`, the Census API is having a real outage. Wait and re-run
  the same command. Do not work around it by editing the script.
- A successful run prints progress per batch and writes `zipData.js`. If that file is written
  and passes §5.5, the harvest succeeded.

The data harvest is a build-time step. The deployed site loads the resulting static snapshot and
makes zero network calls to census.gov.

---

## 4. Integration: mount the app exactly as it is

The deployed site is the existing app, unchanged, wrapped in the minimum shell needed for static
hosting.

- **Math:** the `computeModel` path (B/C/M her-side, V/F/K his-side, the real tax engine,
  self-floor, gross-up, all multipliers and grids) is final and verified. Reproduce it
  byte-for-byte. Do not "clean up" a coefficient, collapse a grid, or adjust a rounding.
- **Markup:** every `div`, every wrapper, every conditional branch, every `className`, every
  `id`, every section/option/registry key is load-bearing. Preserve the DOM tree exactly.
  A span only exists where it is genuine inline phrasing content; do not add wrappers and do not
  remove them.
- **Styles:** wire `retention_calculator.css` as the stylesheet. The genuinely dynamic styles
  (the two-palette theme swap, per-result verdict colors, `color:"inherit"` overrides) stay as
  the thin inline overrides already present in the component. Do not move those into CSS and do
  not delete them. The static structure lives in the `.rpm-*` classes; the runtime state stays
  inline. That split is intentional.
- **Data:** the app imports `zipData.js` (the harvested snapshot), not a live API. Confirm the
  import resolves and the full ZIP set is present.
- **Top-40 metro table:** it reads `window.METRO_DATA` and `window.METRO_SINGLE_WOMEN`, which the
  harvest emits in `zipData.js` (100 metros). Until those globals are populated the table
  correctly shows the built-in fallback with a zeroed ranking. The integrator must assign both
  `zipData.js` exports onto the window globals **before** `retention_calculator.jsx` evaluates
  (the component reads them at module load). This is done in `src/metroGlobals.js`, imported first
  in `src/main.jsx`; the component's `window.*` seam is unchanged. With the globals set, the table
  ranks all 100 metros by real single-women counts and slices the true top 40 — no logic change.
- **External resources (keep all of them):** the only runtime external dependencies are two
  Google Fonts, loaded by `@import` from `fonts.googleapis.com` and already present in
  `retention_calculator.css`:
  - **Inter** (weights 300/400/500/600/700) — the entire UI typeface.
  - **Material Symbols Outlined** — the glyph font for the theme/paint toggle icon (rendered as
    a ligature, e.g. `format_paint`). It must be loaded as the **full** variable font, not an
    `icon_names` subset; the subset silently drops the icon and renders literal text. Leave the
    `@import` exactly as written.
  These two `@import` lines must survive into the deployed build. If you move font loading into
  `index.html` `<link>` tags for performance, that is allowed, but the same two families at the
  same axes must load, and the result must look identical. Do not drop either font, do not swap
  in a different family, and do not self-host without verifying the rendered output is unchanged.
  There are no other CDNs, scripts, or third-party resources; React is the only npm dependency.

If converting the JSX's inline `style={S_.x}` usage to consume the CSS classes is in scope, it is
a **mechanical** conversion verified against a rendered-DOM and computed-style diff, where
"identical result" is the passing condition. It is never a visual redesign. If the diff shows any
change, you reverted something incorrectly; fix the conversion, do not accept the difference.

---

## 5. Verification gates (a build does not ship until these pass)

Before any commit that touches logic, markup, styles, or data:

1. **Render:** the app mounts with no render error and produces non-empty output.
2. **Value lock:** the canonical case must reproduce its known result. With the base inputs
   (ZIP 62269, 50-mile radius, the documented base profile) the model returns the locked figures
   the team has verified. If S, delivered value, or the gross/deficit move, you broke the math.
   Stop.
3. **Lever sweep:** vary each input alone (fatherhood ladder, friction slider, relational slider,
   income growth, BMI single/multi/any, import gate) and confirm the direction and magnitude
   match the verified behavior. Wider BMI selection never raises S; "any" returns the flat-neutral
   case; the import gate makes the price unpayable when not all-in.
4. **DOM/style parity:** if you touched markup or styles, diff the rendered DOM and computed
   styles against the pre-change build. Zero diff is the only pass.
5. **Data integrity:** spot-check that `zipData.js` carries real ACS values for known ZIPs and
   that no field is uniformly the fallback (which would indicate a failed pull).

Record the result of these gates in `NOTES.md` on every build. A green build with no recorded
verification is treated as unverified and must be re-run.

---

## 6. What you may do without asking

- Run the harvest script and regenerate `zipData.js`.
- Create the static site shell (index, mount point, build config) required for GitHub Pages.
- Wire the existing CSS and JSX and data together.
- Set up the Pages deployment and the `.io` publish.
- Set up the scheduled data-refresh workflow described in §5a.
- Add `NOTES.md` build logs and verification records.

## 5a. Scheduled data refresh (set this up)

The data must not silently rot. Set up a **GitHub Actions** workflow that keeps the snapshot
current, committed into the repo so it runs in the cloud with nothing on a local machine.

Two cadences, because of how the underlying data actually publishes:

- **Monthly check, 1st of every month at 00:00 UTC** (`cron: "0 0 1 * *"`). The job checks
  whether a newer Census ACS 5-year vintage is available than the one currently pinned in
  `harvest_snapshot.mjs`. ACS 5-year releases roughly once a year (typically December), and
  CDC PLACES updates on a similar annual cadence, so most monthly runs will find nothing new.
  That is expected. The check is cheap insurance so a new release is picked up within a month
  rather than a year.
- **Annual rebuild, January.** Once a year force a full re-harvest and republish regardless of
  the check, so the site is guaranteed to refresh even if the detection misses.

Important reality the workflow must respect:
- **The ACS vintage is pinned in the URL** (`.../data/2023/acs/acs5...`). A newer release does
  **not** appear by re-running the same URL. When the monthly check finds a newer vintage, the
  workflow must bump the year in `harvest_snapshot.mjs` to the new vintage, run the harvest,
  run the §5 verification gates, and only then commit the new `zipData.js` and redeploy. If the
  verification gates fail on fresh data, it must open an issue and **not** publish the broken
  pull. Never publish unverified data.
- Use the Census key via a repository secret (`CENSUS_KEY`), not a literal in the workflow file.
- The workflow commits the regenerated `zipData.js` and triggers the Pages redeploy. Everything
  runs in GitHub's cloud runners; nothing depends on a local disk.

If a fully automated vintage bump is risky for a given year (Census occasionally changes
variable codes between releases), the acceptable fallback is: the monthly job detects the new
vintage and opens an issue saying "new ACS vintage available, manual bump needed," rather than
guessing at changed variable codes. Detecting-and-flagging is preferred over a silent wrong
pull. Do not invent variable codes to make a new vintage parse.

## 7. What you may never do without an explicit, separate instruction

- Change any value in the math, the styles, or the data.
- Add, remove, rename, or restructure any div, wrapper, class, id, or registry key.
- Rewrite, "modernize," or refactor the engine or any component.
- Replace the harvested data with synthetic, sampled, or hand-entered numbers.
- Commit a Census key or any secret into a deployed file.
- Ship a build that has not passed §5.

---

## 8. First task

1. Confirm all §2 assets are present; if not, record and stop.
2. Obtain a `CENSUS_KEY`, run the harvest, produce `zipData.js`, verify per §5.5.
3. Build the minimal static shell, mount `retention_calculator.jsx` unchanged, wire
   `retention_calculator.css` and `zipData.js`.
4. Run all §5 gates, record results in `NOTES.md`.
5. Configure GitHub Pages to publish the static build to the `.io` URL.
6. Stop and report. Do not proceed to any redesign, cleanup, or "improvement."

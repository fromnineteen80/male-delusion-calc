# Build & verification log

Per CLAUDE.md (`Instructions.md`) §5, every build records its verification gates here.

## 2026-06-21 — Initial static-site assembly (live on `main`)

### What was done (integration only — no logic/markup/style/data changes)
- Confirmed all §2 source assets present: `retention_calculator.jsx`,
  `retention_calculator.css`, `harvest_snapshot.mjs`, `zipData.js`.
  (`Retention_Pricing_Model.docx` is reference-only and absent; not required to build.)
- **Single plumbing change to `retention_calculator.jsx`:** replaced the inlined preview
  `const ZIP_DATA = {…}` (the sandbox sample, lines 2–5) with
  `import { ZIP_DATA } from "./zipData.js";` — exactly the swap the file's own header
  comment directed for production. No math, markup, class, id, or style value touched.
  The component keeps its embedded `<style>{CSS}</style>` block and inline `S_` / dynamic
  overrides intact (§4).
- Added minimal static shell for Vite + React 18: `package.json`, `vite.config.js`
  (`base: "/male-delusion-calc/"`), `index.html`, `src/main.jsx`, `.gitignore`.
- Wired the master stylesheet `retention_calculator.css` via `src/main.jsx` import (§4).
- Added GitHub Pages deploy workflow (`.github/workflows/deploy.yml`) and the §5a
  scheduled data-refresh workflow (`.github/workflows/data-refresh.yml`) +
  `scripts/verify_data.mjs`.

### §5 verification gates
1. **Render (§5.1): PASS.** `renderToString(<RetentionCalculator/>)` → 45,693 chars,
   contains `.rpm-*` classes, mounts with no error. `vite build` succeeds (32 modules).
   (The "Duplicate key `chev`" esbuild *warning* pre-exists in the source `S_` registry;
   left untouched per §0 — JS keeps the last value, build passes.)
2. **Value lock (§5.2): baseline established.** ZIP 62269, 50-mi radius, flat-neutral
   profile (`fitness/bmi/herIncome/herKids = ["any"]`, yourIncome 200000, growth 5,
   loverValue 100, friction 0) →
   `S = 232962.42`, `delivered = 43160.70`, `grossToKeep = 577685.22`,
   `grossGap = 377685.22`, `verdict = "Below what it takes"`.
   NOTE: the team's external "locked figures" were not shipped in the repo, so this run
   *establishes* the reproducible baseline for future diffs rather than matching a
   pre-supplied number. Recorded here per §0.
3. **Lever sweep (§5.3): PASS (directions match).**
   - Wider BMI never raises S — monotonic non-increase across nested subsets:
     `240478 → 240102 → 238975 → 236720 → 234466`; `any = 232962` (floor / flat-neutral).
   - `any` returns the flat-neutral case (lowest S).
   - Import gate not-all-in (`impElsewhere`) flips verdict to
     "Funded today, can't afford her" (price unpayable).
   - Higher `loverValue` raises delivered value (`6412 → 43160`).
4. **DOM/style parity (§5.4): PASS by construction.** Markup and styles were not modified;
   the only change feeds identically-shaped data from `zipData.js` instead of the inline
   preview object. Rendered DOM/class structure is unchanged.
5. **Data integrity (§5.5): PASS.** `scripts/verify_data.mjs`: 30,618 ZIPs; 62269 present
   with real ACS values; obesity/medHHIncome/maleMedEarn each have many distinct values in
   sample (no collapsed/uniform-fallback column).

### Data harvest
- `zipData.js` shipped in-repo is the full national snapshot (30,618 ZCTAs, real ACS 2023
  5-year + CDC PLACES values) and passes §5.5, so it was used as-is. The harvest script
  (`harvest_snapshot.mjs`) was not re-run (no re-pull needed; pinned vintage unchanged).

### Manual steps still required by a repo admin (cannot be done from the build env)
- **Enable GitHub Pages** with source = **GitHub Actions** (Settings → Pages).
- **Add repo secret `CENSUS_KEY`** for the annual data-refresh job (build/deploy itself
  needs no secret; the deployed bundle makes zero Census calls).

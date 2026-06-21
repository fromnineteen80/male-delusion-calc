// §5.5 data-integrity gate. Exits non-zero if the harvested snapshot looks broken,
// so the refresh workflow never publishes a bad pull. Pure data checks only — no React.
import { ZIP_DATA } from "../zipData.js";

const keys = Object.keys(ZIP_DATA);
const fail = (m) => { console.error("FAIL:", m); process.exitCode = 1; };

// 1. Enough ZIPs (the full national ZCTA set is ~30k).
if (keys.length < 25000) fail(`too few ZIPs: ${keys.length}`);
else console.log(`OK ZIP count: ${keys.length}`);

// 2. Canonical ZIP present with real values.
const c = ZIP_DATA["62269"];
if (!c || !c.medHHIncome || !c.dist) fail("canonical ZIP 62269 missing/empty");
else console.log(`OK 62269 medHHIncome=${c.medHHIncome} obesity=${c.obesity}`);

// 3. No field uniformly the fallback (a uniform column means the pull collapsed).
const sample = keys.slice(0, 8000);
for (const field of ["obesity", "medHHIncome", "maleMedEarn"]) {
  const distinct = new Set(sample.map((k) => ZIP_DATA[k][field]));
  if (distinct.size < 10) fail(`field "${field}" looks collapsed (only ${distinct.size} distinct in sample)`);
  else console.log(`OK field "${field}": ${distinct.size} distinct values in sample`);
}

if (process.exitCode) console.error("DATA INTEGRITY GATE FAILED");
else console.log("DATA INTEGRITY GATE PASSED");

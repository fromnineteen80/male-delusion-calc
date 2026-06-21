#!/usr/bin/env node
/**
 * harvest_snapshot.mjs
 * ------------------------------------------------------------------
 * ONE-TIME BUILD SCRIPT. Run with Claude Code (or any Node 18+).
 *
 *   node harvest_snapshot.mjs
 *
 * Produces  zipData.js  — a static snapshot the calculator imports instead
 * of hitting census.gov at runtime. This removes the API key, the live
 * fetches, the timeouts, and the aborts. The numbers are byte-identical to
 * what the live ACS pull returns today; they just ship with the app.
 *
 * What it pulls (one batch call per state, not per ZIP, so it is fast):
 *   - ACS 2023 5-year, every ZCTA, only the fields the model uses
 *   - CDC PLACES county obesity, every county
 *   - A ZCTA -> county map (Census relationship file) so each ZIP gets obesity
 *
 * Any ZCTA missing a field gets the national fallback baked in at build time,
 * so the app never decides anything at runtime.
 *
 * Requires a Census API key (free, instant): https://api.census.gov/data/key_signup.html
 * Put it below or pass CENSUS_KEY=... as an env var.
 * ------------------------------------------------------------------
 */

import { writeFileSync } from "node:fs";
import { gzipSync, inflateRawSync } from "node:zlib";

const KEY = process.env.CENSUS_KEY || "53b02dd2554c593f6ce2dbba81a34ceaf03c64fe";

// National fallbacks (same values the live app used when a field came back null).
const NATIONAL = {
  eduShareBplus: 0.35,     // bachelor's-or-higher share, national
  obesity: 0.33,           // CDC adult obesity, national white-women anchor used in-app
};

const ACS_VARS = [
  "B19013_001E",                                  // median HH income
  "B15002_001E", "B15002_015E", "B15002_016E", "B15002_017E", "B15002_018E",
  "B15002_032E", "B15002_033E", "B15002_034E", "B15002_035E", // education (bachelor's+)
  "B15002_014E", "B15002_031E", // associate's degree (male, female)
  "B20005_049E", // female 16+ total (earnings universe, for no-earner share)
  "B20001_023E", "B20001_042E", "B20001_043E", // female earners total, $75-99k, $100k+
  "B20017_002E",                                  // male median earnings
  // female earnings bands (B20001): subtotal _023, $75-99,999 _042, $100k+ _043,
  // $1-74,999 = _024..._041; female 16+ base = B20005_049 (zero-earners = base - earners)
  "B20001_023E", "B20001_042E", "B20001_043E",
  "B20001_024E", "B20001_025E", "B20001_026E", "B20001_027E", "B20001_028E",
  "B20001_029E", "B20001_030E", "B20001_031E", "B20001_032E", "B20001_033E",
  "B20001_034E", "B20001_035E", "B20001_036E", "B20001_037E", "B20001_038E",
  "B20001_039E", "B20001_040E", "B20001_041E", "B20005_049E",
  "B19080_001E", "B19080_002E", "B19080_003E", "B19080_004E", "B19080_005E", // income dist
  "B25077_001E", "B25064_001E", "B25088_002E",    // home value, rent, owner cost
  "B01003_001E",                                  // total population
  // women by age (B01001 female cells): 18-19,20,21,22-24,25-29,30-34,35-39,40-44,45-49,50-54,55-59,60-61,62-64
  "B01001_031E", "B01001_032E", "B01001_033E", "B01001_034E",
  "B01001_035E", "B01001_036E", "B01001_037E", "B01001_038E", "B01001_039E",
  "B01001_040E", "B01001_041E", "B01001_042E", "B01001_043E",
  // race (B02001) + Hispanic origin (B03002_012)
  "B02001_001E", "B02001_002E", "B02001_003E", "B02001_005E",
  "B02001_004E", "B02001_006E", "B02001_007E", "B02001_008E",
  "B03002_012E",
  // female marital status (B12001): total F 15+, never married, separated, divorced
  "B12001_011E", "B12001_012E", "B12001_016E", "B12001_019E",
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---- Metro single-women precompute ----
// Single women 18-64 are a once-a-year federal fact, so they are computed here at
// harvest time (not live in the browser). Same definition as the app's helper:
// six stored age bands x (never-married + separated + divorced) share.
// 100 largest US metros by population (the candidate pool). Each entry is the
// principal-city centroid [lat, lon], fixed public geography. The harvest computes
// single women 18-64 within METRO_RADIUS_MI of each, and the app ranks all 100 by
// that count and slices the displayed top 40. Starting 100 deep guarantees no genuine
// top-40 single-women metro is missed to age/marriage skew or annual population drift.
const METRO_CENTROID = {
  "New York, NY": [40.7128, -74.0060], "Los Angeles, CA": [34.0522, -118.2437],
  "Chicago, IL": [41.8781, -87.6298], "Dallas, TX": [32.7767, -96.7970],
  "Houston, TX": [29.7604, -95.3698], "Washington, DC": [38.9072, -77.0369],
  "Miami, FL": [25.7617, -80.1918], "Philadelphia, PA": [39.9526, -75.1652],
  "Atlanta, GA": [33.7490, -84.3880], "Phoenix, AZ": [33.4484, -112.0740],
  "Boston, MA": [42.3601, -71.0589], "San Francisco, CA": [37.7749, -122.4194],
  "Riverside, CA": [33.9806, -117.3755], "Detroit, MI": [42.3314, -83.0458],
  "Seattle, WA": [47.6062, -122.3321], "Minneapolis, MN": [44.9778, -93.2650],
  "San Diego, CA": [32.7157, -117.1611], "Tampa, FL": [27.9506, -82.4572],
  "Denver, CO": [39.7392, -104.9903], "St. Louis, MO": [38.6270, -90.1994],
  "Baltimore, MD": [39.2904, -76.6122], "Charlotte, NC": [35.2271, -80.8431],
  "Orlando, FL": [28.5383, -81.3792], "San Antonio, TX": [29.4241, -98.4936],
  "Portland, OR": [45.5152, -122.6784], "Sacramento, CA": [38.5816, -121.4944],
  "Pittsburgh, PA": [40.4406, -79.9959], "Las Vegas, NV": [36.1699, -115.1398],
  "Austin, TX": [30.2672, -97.7431], "Cincinnati, OH": [39.1031, -84.5120],
  "Kansas City, MO": [39.0997, -94.5786], "Columbus, OH": [39.9612, -82.9988],
  "Indianapolis, IN": [39.7684, -86.1581], "Cleveland, OH": [41.4993, -81.6944],
  "Nashville, TN": [36.1627, -86.7816], "San Jose, CA": [37.3382, -121.8863],
  "Jacksonville, FL": [30.3322, -81.6557], "Raleigh, NC": [35.7796, -78.6382],
  "Richmond, VA": [37.5407, -77.4360], "Salt Lake City, UT": [40.7608, -111.8910],
  "Virginia Beach, VA": [36.8529, -75.9780], "Providence, RI": [41.8240, -71.4128],
  "Milwaukee, WI": [43.0389, -87.9065], "Oklahoma City, OK": [35.4676, -97.5164],
  "Louisville, KY": [38.2527, -85.7585], "Memphis, TN": [35.1495, -90.0490],
  "New Orleans, LA": [29.9511, -90.0715], "Hartford, CT": [41.7658, -72.6734],
  "Buffalo, NY": [42.8864, -78.8784], "Birmingham, AL": [33.5186, -86.8104],
  "Grand Rapids, MI": [42.9634, -85.6681], "Tucson, AZ": [32.2226, -110.9747],
  "Fresno, CA": [36.7378, -119.7871], "Tulsa, OK": [36.1540, -95.9928],
  "Worcester, MA": [42.2626, -71.8023], "Omaha, NE": [41.2565, -95.9345],
  "Bridgeport, CT": [41.1865, -73.1952], "Greenville, SC": [34.8526, -82.3940],
  "Albuquerque, NM": [35.0844, -106.6504], "Bakersfield, CA": [35.3733, -119.0187],
  "Knoxville, TN": [35.9606, -83.9207], "Albany, NY": [42.6526, -73.7562],
  "McAllen, TX": [26.2034, -98.2300], "Baton Rouge, LA": [30.4515, -91.1871],
  "El Paso, TX": [31.7619, -106.4850], "New Haven, CT": [41.3083, -72.9279],
  "Allentown, PA": [40.6084, -75.4902], "Oxnard, CA": [34.1975, -119.1771],
  "Columbia, SC": [34.0007, -81.0348], "North Port, FL": [27.0442, -82.2359],
  "Dayton, OH": [39.7589, -84.1916], "Charleston, SC": [32.7765, -79.9311],
  "Greensboro, NC": [36.0726, -79.7920], "Cape Coral, FL": [26.5629, -81.9495],
  "Stockton, CA": [37.9577, -121.2908], "Boise, ID": [43.6150, -116.2023],
  "Colorado Springs, CO": [38.8339, -104.8214], "Little Rock, AR": [34.7465, -92.2896],
  "Lakeland, FL": [28.0395, -81.9498], "Akron, OH": [41.0814, -81.5191],
  "Des Moines, IA": [41.5868, -93.6250], "Ogden, UT": [41.2230, -111.9738],
  "Wichita, KS": [37.6872, -97.3301], "Madison, WI": [43.0731, -89.4012],
  "Syracuse, NY": [43.0481, -76.1474], "Springfield, MA": [42.1015, -72.5898],
  "Augusta, GA": [33.4735, -82.0105], "Provo, UT": [40.2338, -111.6585],
  "Toledo, OH": [41.6528, -83.5379], "Durham, NC": [35.9940, -78.8986],
  "Winston-Salem, NC": [36.0999, -80.2442], "Jackson, MS": [32.2988, -90.1848],
  "Harrisburg, PA": [40.2732, -76.8867], "Spokane, WA": [47.6588, -117.4260],
  "Chattanooga, TN": [35.0456, -85.3097], "Scranton, PA": [41.4090, -75.6624],
  "Modesto, CA": [37.6391, -120.9969], "Fayetteville, AR": [36.0822, -94.1719],
  "Lancaster, PA": [40.0379, -76.3055], "Portland, ME": [43.6591, -70.2568],
};
const METRO_RADIUS_MI = 40;

function milesBetween(lat1, lon1, lat2, lon2) {
  const R = 3958.8, t = Math.PI / 180;
  const dLa = (lat2 - lat1) * t, dLo = (lon2 - lon1) * t;
  const a = Math.sin(dLa / 2) ** 2 + Math.cos(lat1 * t) * Math.cos(lat2 * t) * Math.sin(dLo / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}
function singleWomen18to64(d) {
  if (!d || !d.women || !d.marital) return 0;
  const w = (d.women.a18_24 || 0) + (d.women.a25_29 || 0) + (d.women.a30_34 || 0) +
    (d.women.a35_39 || 0) + (d.women.a40_49 || 0) + (d.women.a50_64 || 0);
  return w * ((d.marital.neverMarried || 0) + (d.marital.separated || 0) + (d.marital.divorced || 0));
}


async function getJSON(url, tries = 5) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url);
      if (res.status === 503 || res.status === 500 || res.status === 429) {
        await sleep(1000 * Math.pow(2, i)); // backoff: 1s,2s,4s,8s,16s
        continue;
      }
      if (!res.ok) throw new Error("HTTP " + res.status);
      return await res.json();
    } catch (e) {
      if (i === tries - 1) throw e;
      await sleep(1000 * Math.pow(2, i));
    }
  }
  throw new Error("exhausted retries: " + url);
}

const numOf = (v) => {
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : null;
};

// ---- 1. ACS, all ZCTAs. Census caps each request at 50 variables, so we batch the
// variable list into chunks and merge the responses by ZIP (the wildcard returns all ZCTAs). ----
async function pullACS() {
  const CHUNK = 45; // safe margin under the 50-variable cap
  const batches = [];
  for (let i = 0; i < ACS_VARS.length; i += CHUNK) batches.push(ACS_VARS.slice(i, i + CHUNK));
  console.log(`Pulling ACS for all ZCTAs in ${batches.length} request(s)...`);

  const merged = {}; // zip -> { var: value }
  for (let b = 0; b < batches.length; b++) {
    const vars = batches[b];
    const url = `https://api.census.gov/data/2023/acs/acs5?get=${vars.join(",")}` +
      `&for=zip%20code%20tabulation%20area:*&key=${KEY}`;
    const rows = await getJSON(url);
    const head = rows[0];
    const idx = {};
    head.forEach((h, i) => (idx[h] = i));
    const zi = idx["zip code tabulation area"];
    for (let r = 1; r < rows.length; r++) {
      const row = rows[r];
      const zip = row[zi];
      const rec = merged[zip] || (merged[zip] = {});
      for (const v of vars) rec[v] = row[idx[v]];
    }
  }

  const out = {};
  for (const zip of Object.keys(merged)) {
    const rec = merged[zip];
    const g = (k) => numOf(rec[k]);

    const eduTotal = g("B15002_001E") || 1;
    // bachelor's-or-higher (both sexes): bachelor's _015/_032, master's _016/_033, professional _017/_034, doctorate _018/_035
    const eduB = ["B15002_015E", "B15002_016E", "B15002_017E", "B15002_018E",
      "B15002_032E", "B15002_033E", "B15002_034E", "B15002_035E"]
      .reduce((s, k) => s + (g(k) || 0), 0);
    // graduate-or-professional only (master's + professional + doctorate, both sexes)
    const eduGrad = ["B15002_016E", "B15002_017E", "B15002_018E",
      "B15002_033E", "B15002_034E", "B15002_035E"]
      .reduce((s, k) => s + (g(k) || 0), 0);
    const eduAssoc = (g("B15002_014E")||0) + (g("B15002_031E")||0);

    // Female personal-earnings inputs (B20001 female brackets, B20005 female 16+ universe).
    const femAll = g("B20005_049E") || 0;            // female 16+ total (denominator)
    const femEarners = g("B20001_023E") || 0;        // female with earnings
    const femHigh100 = g("B20001_043E") || 0;        // $100k+
    const femMid75 = g("B20001_042E") || 0;          // $75-99,999
    const femNoEarn = Math.max(0, femAll - femEarners);             // no earnings
    const femDen = femAll || 1;

    const medHHIncome = g("B19013_001E");
    if (medHHIncome == null) continue; // no income = ZIP not tabulated, skip it

    // Female personal-earnings shares of all women 16+ (B20005_049 universe), so the four
    // bands sum to ~1. zero = no earnings; u75 = $1-74,999; b7599 = $75-99,999; p100 = $100k+.
    // These keys are the single vocabulary the front end (HERINCOME_ACS) and funnel both use.
    const femU75 = ["B20001_024E","B20001_025E","B20001_026E","B20001_027E","B20001_028E",
      "B20001_029E","B20001_030E","B20001_031E","B20001_032E","B20001_033E","B20001_034E",
      "B20001_035E","B20001_036E","B20001_037E","B20001_038E","B20001_039E","B20001_040E",
      "B20001_041E"].reduce((s,k)=>s+(g(k)||0),0);
    const femIncome = femDen ? {
      zero: femNoEarn / femDen,
      u75: femU75 / femDen,
      b7599: femMid75 / femDen,
      p100: femHigh100 / femDen,
    } : { zero: 0.25, u75: 0.45, b7599: 0.15, p100: 0.15 };


    // women by age band (sum the relevant B01001 female cells)
    const w18_24 = (g("B01001_031E")||0)+(g("B01001_032E")||0)+(g("B01001_033E")||0)+(g("B01001_034E")||0);
    const w25_29 = g("B01001_035E")||0;
    const w30_34 = g("B01001_036E")||0;
    const w35_39 = g("B01001_037E")||0;
    const w40_49 = (g("B01001_038E")||0)+(g("B01001_039E")||0);
    const w50_64 = (g("B01001_040E")||0)+(g("B01001_041E")||0)+(g("B01001_042E")||0)+(g("B01001_043E")||0);

    out[zip] = {
      medHHIncome,
      eduShareBplus: eduTotal ? eduB / eduTotal : NATIONAL.eduShareBplus,
      eduShareGrad: eduTotal ? eduGrad / eduTotal : 0.13,
      eduShareAssoc: eduTotal ? eduAssoc / eduTotal : 0.08,
      femIncome,
      dist: {
        p20: g("B19080_001E"), p40: g("B19080_002E"), p60: g("B19080_003E"),
        p80: g("B19080_004E"), p95: g("B19080_005E"),
      },
      maleMedEarn: g("B20017_002E"),
      homeValue: g("B25077_001E"),
      grossRent: g("B25064_001E"),
      ownerCostMortgage: g("B25088_002E"),
      pop: g("B01003_001E"),
      // women by age band, for the availability funnel
      women: { a18_24: w18_24, a25_29: w25_29, a30_34: w30_34, a35_39: w35_39, a40_49: w40_49, a50_64: w50_64 },
      // race counts (total population, not women-only; combine with women share at runtime)
      race: {
        total: g("B02001_001E"),
        white: g("B02001_002E"),
        black: g("B02001_003E"),
        asian: g("B02001_005E"),
        native: g("B02001_004E"),
        pacific: g("B02001_006E"),
        other: g("B02001_007E"),
        multi: g("B02001_008E"),
        hispanic: g("B03002_012E"),
      },
      // lat/lon filled in below from the Gazetteer centroid file
      // obesity filled in below from county map
    };
    // female marital status shares (of women 15+), for the single funnel
    const fTot = g("B12001_011E");
    if (fTot && fTot > 0) {
      out[zip].marital = {
        neverMarried: (g("B12001_012E") || 0) / fTot,
        separated: (g("B12001_016E") || 0) / fTot,
        divorced: (g("B12001_019E") || 0) / fTot,
      };
    } else {
      out[zip].marital = { neverMarried: 0.45, separated: 0.02, divorced: 0.11 }; // national fallback
    }
  }
  console.log(`  got ${Object.keys(out).length} ZCTAs`);
  return out;
}

// ---- 2. County obesity from CDC PLACES (one paged pull) ----
async function pullObesity() {
  console.log("Pulling CDC PLACES county obesity...");
  const map = {}; // fips -> fraction
  let offset = 0;
  const limit = 5000;
  for (;;) {
    const url = `https://data.cdc.gov/resource/i46a-9kgh.json?$select=countyfips,obesity_crudeprev` +
      `&$where=obesity_crudeprev%20IS%20NOT%20NULL&$limit=${limit}&$offset=${offset}`;
    const rows = await getJSON(url);
    if (!rows.length) break;
    for (const row of rows) {
      const f = row.countyfips;
      const v = Number(row.obesity_crudeprev);
      if (f && Number.isFinite(v)) map[f] = v / 100;
    }
    offset += limit;
    if (rows.length < limit) break;
  }
  console.log(`  got ${Object.keys(map).length} counties`);
  return map;
}

// ---- 3. ZCTA -> county relationship (Census 2020 ZCTA-county rel file) ----
async function pullZctaCounty() {
  console.log("Pulling ZCTA-to-county relationship file...");
  // Census national ZCTA-to-county relationship file (pipe-delimited).
  const url = "https://www2.census.gov/geo/docs/maps-data/data/rel2020/zcta520/tab20_zcta520_county20_natl.txt";
  const res = await fetch(url);
  const text = await res.text();
  const lines = text.split("\n");
  const header = lines[0].split("|");
  const zi = header.indexOf("GEOID_ZCTA5_20");
  const ci = header.indexOf("GEOID_COUNTY_20");
  const map = {}; // zcta -> county fips (first/primary county)
  for (let i = 1; i < lines.length; i++) {
    const parts = lines[i].split("|");
    const z = parts[zi];
    const c = parts[ci];
    if (z && c && z.trim() && c.trim() && !map[z]) map[z] = c; // first county a ZCTA maps to
  }
  console.log(`  mapped ${Object.keys(map).length} ZCTAs to counties`);
  return map;
}

// ---- 4. ZCTA centroids (lat/lon) from the Census Gazetteer zip ----
async function pullCentroids() {
  console.log("Pulling ZCTA centroids (Gazetteer)...");
  const url = "https://www2.census.gov/geo/docs/maps-data/data/gazetteer/2023_Gazetteer/2023_Gaz_zcta_national.zip";
  const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
  const sig = buf.indexOf(Buffer.from([0x50, 0x4b, 0x03, 0x04])); // local file header
  const method = buf.readUInt16LE(sig + 8);
  const compSize = buf.readUInt32LE(sig + 18);
  const nameLen = buf.readUInt16LE(sig + 26);
  const extraLen = buf.readUInt16LE(sig + 28);
  const dataStart = sig + 30 + nameLen + extraLen;
  const comp = buf.subarray(dataStart, dataStart + compSize);
  const txt = (method === 8 ? inflateRawSync(comp) : comp).toString("utf8");
  const lines = txt.split("\n");
  const head = lines[0].split("\t").map((s) => s.trim());
  const gi = head.indexOf("GEOID");
  const la = head.indexOf("INTPTLAT");
  const lo = head.indexOf("INTPTLONG");
  const map = {};
  for (let i = 1; i < lines.length; i++) {
    const p = lines[i].split("\t");
    if (p.length <= lo) continue;
    const z = p[gi].trim();
    const lat = parseFloat(p[la]);
    const lon = parseFloat(p[lo]);
    if (z && Number.isFinite(lat) && Number.isFinite(lon)) map[z] = [Math.round(lat * 1e4) / 1e4, Math.round(lon * 1e4) / 1e4];
  }
  console.log(`  got ${Object.keys(map).length} centroids`);
  return map;
}

async function main() {
  const [acs, obesity, zc, cent] = await Promise.all([pullACS(), pullObesity(), pullZctaCounty(), pullCentroids()]);

  // attach obesity (via county) and lat/lon (via Gazetteer) to each ZIP
  let withOb = 0, withLL = 0;
  for (const zip of Object.keys(acs)) {
    const fips = zc[zip];
    const ob = fips != null ? obesity[fips] : null;
    acs[zip].obesity = ob != null ? ob : NATIONAL.obesity;
    if (ob != null) withOb++;
    const ll = cent[zip];
    if (ll) { acs[zip].ll = ll; withLL++; }
  }
  console.log(`Obesity matched for ${withOb}/${Object.keys(acs).length} ZIPs (rest use national).`);
  console.log(`Centroids matched for ${withLL}/${Object.keys(acs).length} ZIPs.`);

  // Precompute per-metro federal data in ONE pass over ZIPs. For each of the 100
  // candidate metros, accumulate single women 18-64 plus the federal rows the table's
  // other columns need (population, population-weighted median HH income, distribution
  // breakpoints, and obesity). The app ranks all 100 by single women, slices the top 40,
  // and reads these same rows for the displayed columns. Computed once per annual harvest.
  console.log("Computing per-metro federal aggregates (100 metros)...");
  const metroAcc = {};
  for (const name of Object.keys(METRO_CENTROID)) {
    metroAcc[name] = { single: 0, pop: 0, incomeWsum: 0,
      dist: { p20: 0, p40: 0, p60: 0, p80: 0, p95: 0 } };
  }
  const metroEntries = Object.entries(METRO_CENTROID);
  for (const zip of Object.keys(acs)) {
    const d = acs[zip];
    if (!d.ll) continue;
    const sw = singleWomen18to64(d);
    const pop = d.pop || 0;
    for (const [name, c] of metroEntries) {
      if (milesBetween(c[0], c[1], d.ll[0], d.ll[1]) > METRO_RADIUS_MI) continue;
      const a = metroAcc[name];
      a.single += sw;
      if (pop > 0) {
        a.pop += pop;
        if (Number.isFinite(d.medHHIncome)) a.incomeWsum += d.medHHIncome * pop;
        if (d.dist) {
          a.dist.p20 += (d.dist.p20 || 0) * pop; a.dist.p40 += (d.dist.p40 || 0) * pop;
          a.dist.p60 += (d.dist.p60 || 0) * pop; a.dist.p80 += (d.dist.p80 || 0) * pop;
          a.dist.p95 += (d.dist.p95 || 0) * pop;
        }
      }
    }
  }
  // Finalize: single-women map + a full METRO_DATA map (population-weighted aggregates).
  const metroSingle = {};
  const metroData = {};
  for (const [name, a] of Object.entries(metroAcc)) {
    metroSingle[name] = Math.round(a.single);
    const P = a.pop || 1;
    metroData[name] = {
      pop: Math.round(a.pop),
      medHH: Math.round(a.incomeWsum / P),
      p20: Math.round(a.dist.p20 / P), p40: Math.round(a.dist.p40 / P),
      p60: Math.round(a.dist.p60 / P), p80: Math.round(a.dist.p80 / P),
      p95: Math.round(a.dist.p95 / P),
      singleWomen: Math.round(a.single),
    };
  }
  const topBySingle = Object.entries(metroSingle).sort((x, y) => y[1] - x[1]).slice(0, 5)
    .map(([n, v]) => `${n}: ${v.toLocaleString()}`).join(", ");
  console.log(`  done. Top 5 by single women 18-64: ${topBySingle}`);


  // Emit a JS module the app imports directly. Keep raw JSON tiny by dropping nulls.
  const json = JSON.stringify(acs);
  const file =
    "// AUTO-GENERATED by harvest_snapshot.mjs — do not edit by hand.\n" +
    "// ACS 2023 5-year + CDC PLACES obesity, snapshotted per ZIP (ZCTA).\n" +
    "// Re-run the harvest when a new ACS year releases.\n" +
    "export const ZIP_DATA = " + json + ";\n\n" +
    "// Per-metro federal aggregates for the 100-metro candidate pool, population-weighted\n" +
    "// from the ZIP data within " + METRO_RADIUS_MI + " miles of each centroid. The app ranks\n" +
    "// by singleWomen, slices the top 40, and reads these rows for the table columns.\n" +
    "export const METRO_DATA = " + JSON.stringify(metroData) + ";\n\n" +
    "// Single women 18-64 per metro (same data, broken out for direct lookup).\n" +
    "export const METRO_SINGLE_WOMEN = " + JSON.stringify(metroSingle) + ";\n";
  writeFileSync("zipData.js", file);
  const gz = gzipSync(Buffer.from(file));
  console.log(`\nWrote zipData.js  (${(file.length / 1e6).toFixed(2)} MB raw, ${(gz.length / 1e6).toFixed(2)} MB gzipped)`);
  console.log("Drop zipData.js next to the calculator and it imports ZIP_DATA. Done.");
}

main().catch((e) => { console.error("HARVEST FAILED:", e); process.exit(1); });

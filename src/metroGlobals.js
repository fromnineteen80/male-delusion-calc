// Wire the harvested metro globals onto window BEFORE retention_calculator.jsx is
// evaluated. The component reads window.METRO_DATA / window.METRO_SINGLE_WOMEN at
// module-load time (its lines 498-499); importing this first means those reads pick
// up the real 100-metro harvest instead of the built-in fallback + empty count map.
// No change to the component's existing window.* seam.
import { METRO_DATA, METRO_SINGLE_WOMEN } from "../zipData.js";

if (typeof window !== "undefined") {
  window.METRO_DATA = METRO_DATA;
  window.METRO_SINGLE_WOMEN = METRO_SINGLE_WOMEN;
}

import React from "react";
import { createRoot } from "react-dom/client";
// Must run BEFORE retention_calculator.jsx: sets window.METRO_DATA / METRO_SINGLE_WOMEN
// from the harvest so the top-40 metro table reads live data, not the fallback.
import "./metroGlobals.js";
// Master stylesheet (verbatim .rpm-* classes + base layer + Google Fonts @import).
import "../retention_calculator.css";
import RetentionCalculator from "../retention_calculator.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RetentionCalculator />
  </React.StrictMode>
);

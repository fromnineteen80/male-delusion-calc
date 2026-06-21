import React from "react";
import { createRoot } from "react-dom/client";
// Master stylesheet (verbatim .rpm-* classes + base layer + Google Fonts @import).
import "../retention_calculator.css";
import RetentionCalculator from "../retention_calculator.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RetentionCalculator />
  </React.StrictMode>
);

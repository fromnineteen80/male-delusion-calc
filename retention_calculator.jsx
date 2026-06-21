import React, { useState, useMemo, useCallback, useEffect, useRef, Component } from "react";
// PRODUCTION BUILD: the full harvested snapshot (~30,618 ZIPs) is imported from zipData.js.
import { ZIP_DATA } from "./zipData.js";

// ---- Styles ---------------------------------------------------------------

const INK = "var(--ink)";
const PAPER = "var(--paper)";
const LINE = "var(--line)";
const ACCENT = "var(--accent)";

const PlusIcon = () => (
  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke={ACCENT} strokeWidth="1.4" strokeLinecap="round" style={{ display: "block" }} aria-hidden="true">
    <line x1="6" y1="2" x2="6" y2="10" />
    <line x1="2" y1="6" x2="10" y2="6" />
  </svg>
);

// Real Material Symbols Outlined "format_paint" glyph, served from the Google icon font
// (not a hand-drawn path). Colored by the accent variable; flips to olive with the theme.
const PaintBrushIcon = () => (
  <span className="material-symbols-outlined" style={{ fontSize: 15, color: ACCENT, display: "block" }} aria-hidden="true">format_paint</span>
);


const VERDICT_STYLE = {
  clear: { background: "#13351f", color: "#dff0e4" },
  marginal: { background: "#3a3413", color: "#f0ead0" },
  below: { background: "var(--verdict-bg)", color: "var(--verdict-fg)" },
  fund: { background: "#1c1c24", color: "var(--paper4)", borderLeft: `4px solid ${ACCENT}` },
};

const S_ = {
  wrap: { minHeight: "100vh", background: PAPER, color: INK, fontFamily: "'Inter', system-ui, sans-serif", padding: "0 0 60px" },
  header: { padding: "40px 0 28px", borderBottom: `1px solid ${LINE}`, width: "100%", margin: "0 auto" },
  headerInner: { maxWidth: 1200, margin: "0 auto", padding: "0 32px" },
  eyebrow: { fontSize: 11, letterSpacing: "0.28em", color: ACCENT, fontWeight: 600, marginBottom: 14 },
  formula: { margin: 0, fontFamily: "inherit", display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 },
  empty: { border: `1px solid ${LINE}`, background: "var(--paper2)", padding: "20px 20px", textAlign: "left" },
  emptyHead: { display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 },
  emptyMark: { fontFamily: "inherit", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, color: ACCENT, lineHeight: 1, whiteSpace: "nowrap" },
  emptyTitle: { fontSize: 14, fontWeight: 600, color: INK },
  exCard: { border: `1px solid ${LINE}`, background: "var(--surface)", padding: "13px 16px" },
  exCardTop: { display: "flex", flexDirection: "column", gap: 2, marginBottom: 7 },
  exCardLabel: { fontSize: 10.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--warm3)", fontWeight: 600 },
  exCardLabelRow: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 },
  exVar: { fontFamily: "inherit", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: ACCENT, fontWeight: 600, whiteSpace: "nowrap" },
  exVarGate: { fontSize: 9.5, letterSpacing: "0.12em", color: "#fff", background: ACCENT, padding: "2px 6px", fontWeight: 700, whiteSpace: "nowrap" },
  exCardChoice: { fontSize: 14, fontWeight: 600, color: INK },
  exCardText: { fontSize: 12.5, color: "var(--warm1)", lineHeight: 1.5 },
  emptyText: { fontSize: 12.5, color: "var(--warm1)", marginTop: 8, lineHeight: 1.55 },
  explore: { maxWidth: 1200, margin: "36px auto 0", padding: "0 32px" },
  ladderWrap: { maxWidth: 1200, margin: "36px auto 0", padding: "0 32px" },
  resultRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, alignItems: "start" },
  calcCollapsed: { border: `1px solid ${LINE}`, background: "var(--paper2)", padding: "14px 18px", cursor: "pointer" },
  calcCollapsedRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  calcCollapsedTitle: { fontSize: 14, fontWeight: 600, color: INK },
  calcCollapsedSub: { fontSize: 12, color: "var(--warm2)", marginTop: 3 },
  fwWrap: { maxWidth: 1200, margin: "28px auto 0", padding: "0 32px" },
  fwPair: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 28, alignItems: "start" },
  fwQuad: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 28, marginTop: 28 },
  fwDuo: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, marginTop: 28, alignItems: "start" },
  fwDivider: { maxWidth: 1200, margin: "36px auto 0", padding: "0 32px" },
  fwDividerLine: { borderTop: `1px solid ${LINE}` },
  ladderHead: { marginBottom: 16 },
  ladderTitle: { margin: 0, fontFamily: "Georgia, serif", fontSize: 24, fontWeight: 400, letterSpacing: "-0.01em" },
  ladderSub: { fontSize: 13, color: "var(--warm1)", marginTop: 8, lineHeight: 1.5, maxWidth: 760 },
  ladderTableWrap: { overflowX: "auto", border: `1px solid ${LINE}` },
  ladderTable: { width: "100%", borderCollapse: "collapse", fontSize: 13, background: "var(--surface)" },
  ladderTh: { textAlign: "left", padding: "11px 14px", borderBottom: `2px solid ${INK}`, fontSize: 10.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--warm1)", verticalAlign: "bottom" },
  ladderThR: { textAlign: "right", padding: "11px 14px", borderBottom: `2px solid ${INK}`, fontSize: 10.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--warm1)", verticalAlign: "bottom" },
  ladderThC: { textAlign: "center", padding: "11px 10px", borderBottom: `2px solid ${INK}`, fontSize: 10.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--warm1)", verticalAlign: "bottom" },
  ladderTdName: { padding: "11px 14px", borderBottom: `1px solid ${LINE}`, fontWeight: 600 },
  ladderTdR: { padding: "11px 14px", borderBottom: `1px solid ${LINE}`, textAlign: "right", fontFamily: "Georgia, serif", whiteSpace: "nowrap" },
  ladderTdC: { padding: "11px 10px", borderBottom: `1px solid ${LINE}`, textAlign: "center", color: "var(--warm1)" },
  ladderNote: { fontSize: 12, color: "var(--warm1)", marginTop: 12, lineHeight: 1.55 },
  availControls: { border: `1px solid ${LINE}`, padding: "14px 14px 4px", marginBottom: 14, background: "var(--paper2)" },
  availHdr: { fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: INK, marginBottom: 10 },
  funnelWrap: { border: `1px solid ${LINE}`, background: "var(--surface)", padding: "8px 0" },
  funnelRow: { display: "grid", gridTemplateColumns: "1fr 2fr auto", alignItems: "center", gap: 12, padding: "8px 16px" },
  funnelLabel: { fontSize: 12.5, color: "var(--warmdk2)" },
  funnelBarTrack: { background: "var(--paper3)", height: 14, position: "relative" },
  funnelBar: { background: ACCENT, height: 14, transition: "width .3s" },
  funnelNum: { fontFamily: "Georgia, serif", fontSize: 14, textAlign: "right", minWidth: 70, fontVariantNumeric: "tabular-nums" },
  funnelFinal: { fontSize: 14, color: INK, marginTop: 12, lineHeight: 1.5 },
  availBox: { border: `2px solid ${INK}`, background: INK, color: "#fff", padding: "20px 24px", marginBottom: 16 },
  availBoxNum: { fontFamily: "Georgia, serif", fontSize: 38, fontWeight: 400, letterSpacing: "-0.02em", whiteSpace: "nowrap" },
  availBoxNumLbl: { fontFamily: "Inter, sans-serif", fontSize: 17, fontWeight: 500, color: "var(--warm5)", marginLeft: 10, letterSpacing: "0" },
  availBoxText: { fontSize: 13, color: "var(--warm5)", marginTop: 10, lineHeight: 1.55 },
  checksWrap: { display: "flex", flexWrap: "wrap", gap: 6 },
  checkChip: { display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 11px", border: `1px solid ${LINE}`, background: "#fff", borderRadius: 0, fontSize: 12.5, color: INK, cursor: "pointer", fontFamily: "inherit", textTransform: "capitalize" },
  checkChipOn: { borderColor: ACCENT, background: "var(--accent-fill)", color: ACCENT, fontWeight: 600 },
  checkBox: { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 14, height: 14, border: `1px solid ${ACCENT}`, fontSize: 10, lineHeight: 1 },
  divorceWrap: { maxWidth: 1200, margin: "36px auto 0", padding: "0 32px" },
  divorceGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 28 },
  divorceCard: { border: `1px solid ${LINE}`, padding: "18px 18px 16px", background: "var(--surface)" },
  divorceStat: { fontFamily: "Georgia, serif", fontSize: 30, fontWeight: 400, color: ACCENT, letterSpacing: "-0.01em", lineHeight: 1.05 },
  divorceLabel: { fontSize: 13, fontWeight: 600, color: INK, marginTop: 6, lineHeight: 1.3 },
  divorceSrc: { fontSize: 11.5, color: "var(--warm1)", marginTop: 8, lineHeight: 1.5 },
  exploreHead: { marginBottom: 16 },
  exploreTitle: { margin: 0, fontFamily: "Georgia, serif", fontSize: 24, fontWeight: 400, letterSpacing: "-0.01em" },
  exploreSub: { fontSize: 13, color: "var(--warm1)", marginTop: 8, lineHeight: 1.5 },
  exTableHead: { display: "grid", gridTemplateColumns: "1.4fr 1.4fr 1.2fr 1fr 1fr", gap: 12, padding: "10px 14px", background: INK, color: "#fff", fontSize: 11, letterSpacing: "0.04em", textTransform: "uppercase", fontWeight: 600 },
  exScroll: { border: `1px solid ${LINE}`, borderTop: "none", maxHeight: 520, overflowY: "auto", background: "var(--surface)" },
  exRow: { display: "grid", gridTemplateColumns: "1.4fr 1.4fr 1.2fr 1fr 1fr", gap: 12, padding: "11px 14px", borderBottom: `1px solid #eceae3`, fontSize: 13, alignItems: "center" },
  exName: { fontWeight: 600 },
  exNum: { fontFamily: "Georgia, serif", fontSize: 14 },
  exDot: { display: "inline-block", width: 9, height: 9, borderRadius: 2, marginRight: 7, verticalAlign: "middle" },
  exploreNote: { fontSize: 12, color: "var(--warm2)", lineHeight: 1.6, marginTop: 14 },
  titleRow: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 },
  h1: { margin: 0, fontFamily: "'Inter', system-ui, sans-serif", fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.15 },
  subtitle: { fontSize: 16, letterSpacing: "normal", color: ACCENT, fontWeight: 400, fontFamily: "Georgia, serif", fontStyle: "italic" },
  eq: { fontFamily: "Georgia, serif" },
  eqVar: { fontFamily: "inherit", fontWeight: 400, fontSize: 12, color: INK },
  eqWord: { fontFamily: "inherit", fontSize: 18, lineHeight: 1, color: ACCENT },
  eqArrow: { display: "block", flex: "0 0 auto" },
  link: { color: "inherit", textDecoration: "none", fontWeight: 400 },
  tagline: { fontSize: 13, color: "var(--warm1)", lineHeight: 1.5 },
  formulaRow: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginTop: 6 },
  explainTabs: { display: "flex", justifyContent: "flex-end", gap: 20, flexWrap: "wrap" },
  explainTabOn: { color: ACCENT },
  explainPanel: { fontSize: 12, color: "var(--warm2)", lineHeight: 1.6, maxWidth: 1200, margin: "0 auto", padding: "16px 32px 20px" },
  chev: { display: "inline-block", fontSize: 16, lineHeight: 1, transition: "transform 0.18s" },
  explainP: { margin: 0, fontSize: 13, color: "var(--warm1)", lineHeight: 1.5 },
  grid: { display: "grid", gridTemplateColumns: "minmax(320px, 1fr) minmax(340px, 1.05fr)", gap: 28, maxWidth: 1200, margin: "28px auto 0", padding: "0 32px", alignItems: "start" },
  col: { display: "flex", flexDirection: "column", gap: 14 },
  accordion: { border: `1px solid ${LINE}`, background: "var(--paper2)" },
  accBtn: { width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 18px", background: "none", border: "none", cursor: "pointer", textAlign: "left" },
  accBtnOpen: { borderBottom: `1px solid ${LINE}`, background: "var(--surface)" },
  accLabel: { display: "block", fontSize: 16, fontWeight: 600 },
  accSub: { display: "block", fontSize: 12, color: "var(--warm4)", marginTop: 2 },
  chev: { fontSize: 22, color: ACCENT, fontWeight: 300 },
  accBody: { padding: "6px 18px 18px" },
  field: { padding: "30px 0", borderBottom: `1px solid #eceae3` },
  fieldLabelRow: { display: "flex", alignItems: "center", gap: 7, marginBottom: 10 },
  fieldLabel: { fontSize: 13, fontWeight: 600, lineHeight: 1.35 },
  fieldHint: { fontSize: 11.5, color: "var(--warm2)", marginTop: 6, lineHeight: 1.45 },
  infoBtn: { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 16, height: 16, flex: "0 0 16px", padding: 0, borderRadius: "50%", border: `1px solid #c9c2b6`, background: "none", color: "var(--warm3)", cursor: "pointer", lineHeight: 0 },
  pop: { position: "absolute", zIndex: 50, width: 260, background: "#fff", border: `1px solid ${INK}`, boxShadow: "0 8px 26px rgba(22,24,29,0.16)", padding: "13px 15px", fontSize: 12, lineHeight: 1.5, color: "var(--warmdk1)" },
  popArrow: { position: "absolute", width: 10, height: 10, background: "#fff", borderLeft: `1px solid ${INK}`, borderTop: `1px solid ${INK}`, transform: "rotate(45deg)" },
  select: { width: "100%", padding: "10px 36px 10px 12px", fontSize: 13, border: `1px solid ${LINE}`, borderRadius: 0, color: INK, fontFamily: "inherit", cursor: "pointer", appearance: "none", WebkitAppearance: "none", MozAppearance: "none", backgroundColor: "#fff", backgroundImage: "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23948b7f' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" },
  numInput: { width: "100%", padding: "10px 12px", fontSize: 15, border: `1px solid ${LINE}`, background: "#fff", borderRadius: 0, color: INK, fontFamily: "Georgia, serif", boxSizing: "border-box" },
  rangeWrap: { display: "flex", alignItems: "center", gap: 12 },
  range: { flex: 1, accentColor: ACCENT },
  rangeVal: { fontFamily: "Georgia, serif", fontSize: 15, minWidth: 64, textAlign: "right", whiteSpace: "nowrap" },
  dualWrap: { position: "relative", height: 28, flex: 1, display: "flex", alignItems: "center" },
  dualTrack: { position: "absolute", left: 0, right: 0, height: 4, background: LINE, borderRadius: 2 },
  dualFill: { position: "absolute", height: 4, background: ACCENT, borderRadius: 2 },
  dualInput: { position: "absolute", left: 0, right: 0, width: "100%", margin: 0, background: "transparent", appearance: "none", WebkitAppearance: "none", pointerEvents: "none", accentColor: ACCENT, height: 28 },
  disclaim: { fontSize: 11.5, color: "var(--warm2)", lineHeight: 1.55, padding: "4px 4px 0" },
  collapseLink: { display: "inline-flex", alignItems: "center", gap: 6, padding: 0, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: 600, color: "var(--warm4)", letterSpacing: "0.01em" },
  collapseChev: { display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto", transition: "transform 0.18s" },

  liveBox: { border: `1px solid ${ACCENT}`, background: "var(--accent-bg)", padding: "14px 14px 12px", marginTop: 14, marginBottom: 6 },
  liveTitle: { fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: ACCENT, marginBottom: 10 },
  liveRow: { display: "flex", gap: 8 },
  liveInput: { flex: 1, padding: "9px 11px", fontSize: 13, border: `1px solid ${LINE}`, background: "#fff", borderRadius: 0, color: INK, fontFamily: "inherit", boxSizing: "border-box" },
  liveBtn: { padding: "9px 18px", fontSize: 13, fontWeight: 600, background: ACCENT, color: "#fff", border: "none", cursor: "pointer" },
  liveMsg: { fontSize: 12, marginTop: 8, lineHeight: 1.45 },
  liveStats: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginTop: 12 },
  liveStatBox: { background: "var(--accent-fill)", border: "1px solid var(--accent-fill2)", padding: "10px 12px", textAlign: "center" },
  liveStatNum: { fontFamily: "inherit", fontSize: 18, fontWeight: 700, color: ACCENT, lineHeight: 1.1 },
  liveStatLbl: { fontFamily: "inherit", fontSize: 10.5, color: "var(--accent-soft)", marginTop: 4, letterSpacing: "0.02em", textTransform: "uppercase" },
  liveHint: { fontSize: 11, color: "var(--warm3)", marginTop: 10, lineHeight: 1.5 },

  verdict: { padding: "22px 24px" },
  verdictLabel: { fontSize: 22, fontWeight: 600, letterSpacing: "-0.01em" },
  verdictNote: { fontSize: 13.5, marginTop: 8, opacity: 0.92, lineHeight: 1.5, fontFamily: "Georgia, serif" },

  priceCard: { border: `1px solid ${LINE}`, background: "var(--surface)", padding: "22px 24px" },
  cardTitle: { fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: ACCENT, fontWeight: 600 },
  liveBadge: { marginLeft: 10, color: "#1a6b4a", fontSize: 11, letterSpacing: "0.02em", textTransform: "none", fontWeight: 600 },
  defBadge: { marginLeft: 10, color: "var(--warm3)", fontSize: 10, letterSpacing: "0.05em", textTransform: "none" },
  bigNum: { fontFamily: "Georgia, serif", fontSize: 40, fontWeight: 400, marginTop: 8, letterSpacing: "-0.02em" },
  perYr: { fontSize: 17, fontWeight: 500, letterSpacing: "0", color: "var(--warm2)", fontFamily: "Inter, sans-serif", marginLeft: 10 },
  ord: { fontSize: 20, color: "inherit", fontFamily: "Georgia, serif", marginLeft: 1 },
  band: { fontSize: 12.5, color: "var(--warm2)", marginTop: 6, marginBottom: 14 },
  grossLine: { fontSize: 13, color: "var(--warm1)", marginTop: 16, lineHeight: 1.55 },
  meansText: { fontSize: 13, color: "var(--warm1)", lineHeight: 1.55, marginTop: 14 },
  meansDivide: { borderTop: "1px solid #eceae3", margin: "14px 0 0" },

  barTrack: { position: "relative", height: 30, background: "var(--paper3)", border: `1px solid ${LINE}` },
  barBand: { position: "absolute", left: "8%", right: "8%", top: 0, bottom: 0, background: "var(--accent-band)" },
  barMid: { position: "absolute", top: -3, bottom: -3, width: 2, background: ACCENT },
  barDeliver: { position: "absolute", top: -5, bottom: -5, width: 3, transform: "translateX(-50%)" },

  tierTrack: { position: "relative", height: 30, background: "var(--paper3)", border: `1px solid ${LINE}`, marginTop: 4 },
  tierZone: { position: "absolute", top: 0, bottom: 0, background: "rgba(26,107,74,0.12)" },
  tierEntry: { position: "absolute", top: -3, bottom: -3, width: 2, background: ACCENT, transform: "translateX(-1px)" },
  tierYou: { position: "absolute", top: -5, bottom: -5, width: 3, transform: "translateX(-50%)" },
  tierScale: { display: "flex", justifyContent: "space-between", fontSize: 10, color: "var(--warm3)", marginTop: 5 },
  tierLegend: { display: "flex", gap: 18, fontSize: 11, color: "var(--warm1)", marginTop: 8, flexWrap: "wrap" },

  bottomLine: { border: `2px solid ${INK}`, background: INK, color: "#fff", padding: "20px 24px" },
  blLabel: { fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--warm6)", fontWeight: 600 },
  blNum: { fontFamily: "Georgia, serif", fontSize: 38, fontWeight: 400, marginTop: 8, letterSpacing: "-0.02em" },
  blYr: { fontSize: 17, fontWeight: 500, letterSpacing: "0", color: "var(--warm6)", fontFamily: "Inter, sans-serif", marginLeft: 10 },
  blNote: { fontSize: 12.5, color: "var(--warm5)", marginTop: 12, lineHeight: 1.55 },
  blExplain: { border: `1px dashed ${LINE}`, background: "var(--paper2)", padding: "16px 18px", marginTop: 14, fontSize: 13, color: "var(--warm1)", lineHeight: 1.55 },
  term: { border: `1px solid ${LINE}`, background: "var(--surface)", padding: "14px 16px" },
  termHot: { borderColor: ACCENT, background: "var(--accent-bg)" },
  termVal: { fontFamily: "Georgia, serif", fontSize: 24, fontWeight: 400 },
  termLabel: { fontSize: 12, fontWeight: 600, marginTop: 4 },
  termNote: { fontSize: 11, color: "var(--warm2)", marginTop: 2 },

  vCard: { border: `1px solid ${LINE}`, background: "var(--surface)", padding: "18px 24px" },
  vRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: `1px solid #eceae3`, fontSize: 13.5 },
  vRowLabel: { color: "var(--warm1)" },
  vRowVal: { fontFamily: "Georgia, serif", fontSize: 16 },
  vTotal: { display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12, marginTop: 4, fontWeight: 700, fontSize: 15, fontFamily: "Georgia, serif" },

  readout: { border: `1px solid ${LINE}`, background: "var(--surface)", padding: "22px 24px", display: "flex", flexDirection: "column", gap: 12 },
  footer: { width: "100%", margin: "32px auto 0", borderTop: `1px solid ${LINE}`, fontSize: 12, color: "var(--warm2)", lineHeight: 1.6 },
  footerInner: { maxWidth: 1200, margin: "0 auto", padding: "16px 32px 0" },
};

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block');
  .material-symbols-outlined { font-family: 'Material Symbols Outlined'; font-weight: normal; font-style: normal; line-height: 1; letter-spacing: normal; text-transform: none; display: inline-block; white-space: nowrap; word-wrap: normal; direction: ltr; font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
  * { box-sizing: border-box; }
  .rpm-glide { display: grid; grid-template-rows: 0fr; opacity: 0;
    transition: grid-template-rows 0.32s ease, opacity 0.32s ease; }
  .rpm-glide.open { grid-template-rows: 1fr; opacity: 1; }
  .rpm-glide > * { min-height: 0; overflow: hidden; }
  body { margin: 0; }
  select:focus, input:focus { outline: 2px solid ${ACCENT}; outline-offset: 1px; }
  .rpm-dd { position: relative; width: 100%; }
  .rpm-dd-btn { width: 100%; padding: 10px 36px 10px 12px; font-size: 13px; line-height: 1.4;
    border: 1px solid ${LINE}; border-radius: 0; background: #fff; font-family: inherit; cursor: pointer;
    text-align: left; color: ${INK}; position: relative; display: block; }
  .rpm-dd-btn[data-placeholder="true"] { color: var(--warm3); }
  .rpm-dd-btn:focus-visible { outline: 2px solid ${ACCENT}; outline-offset: 1px; }
  .rpm-dd-btn[aria-expanded="true"] { border-color: ${ACCENT}; }
  .rpm-dd-chev { position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
    width: 12px; height: 12px; pointer-events: none; transition: transform 0.16s; }
  .rpm-dd-btn[aria-expanded="true"] .rpm-dd-chev { transform: translateY(-50%) rotate(180deg); }
  .rpm-dd-list { position: absolute; z-index: 40; left: 0; right: 0; top: calc(100% - 1px);
    background: #fff; border: 1px solid ${ACCENT}; max-height: 264px; overflow-y: auto;
    box-shadow: 0 6px 20px rgba(22,24,29,0.13); margin: 0; padding: 4px 0; list-style: none; }
  .rpm-dd-opt { padding: 9px 12px; font-size: 13px; line-height: 1.4; cursor: pointer; color: ${INK};
    display: block; border: none; background: none; width: 100%; text-align: left; font-family: inherit; }
  .rpm-dd-opt[data-active="true"] { background: ${PAPER}; }
  .rpm-dd-opt[aria-selected="true"] { font-weight: 600; box-shadow: inset 3px 0 0 ${ACCENT}; }
  .rpm-dd-opt:hover { background: ${PAPER}; }
  input[type=range].rpm-dual { pointer-events: none; }
  input[type=range].rpm-dual::-webkit-slider-thumb { pointer-events: auto; -webkit-appearance: none; appearance: none; width: 18px; height: 18px; border-radius: 50%; background: ${ACCENT}; border: 2px solid #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.3); cursor: pointer; margin-top: -7px; }
  input[type=range].rpm-dual::-moz-range-thumb { pointer-events: auto; width: 18px; height: 18px; border-radius: 50%; background: ${ACCENT}; border: 2px solid #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.3); cursor: pointer; }
  input[type=range].rpm-dual::-webkit-slider-runnable-track { background: transparent; height: 4px; }
  input[type=range].rpm-dual::-moz-range-track { background: transparent; height: 4px; }
  a { font-weight: 400 !important; text-decoration: none; color: inherit; }
  a:hover { text-decoration: underline; font-weight: 400 !important; color: inherit; }
  .readout p, [style*="readout"] p { font-size: 13px; font-weight: 400; letter-spacing: 0; line-height: 1.55; color: var(--warm1); margin: 0;
    font-family: Inter, sans-serif; }
  .rpm-grid [style*="tierLegend"] i, span > i { display: inline-block; width: 11px; height: 11px; border-radius: 2px; margin-right: 5px; vertical-align: middle; }
  .rpm-field:last-child { border-bottom: none !important; padding-bottom: 4px !important; }
  @media (max-width: 880px) {
    .rpm-grid { grid-template-columns: 1fr !important; }
    .rpm-fwquad { grid-template-columns: 1fr 1fr !important; }
    .rpm-fwduo { grid-template-columns: 1fr !important; }
    .rpm-resultrow { grid-template-columns: 1fr !important; }
    .rpm-formula { display: none !important; }
  }
  @media (max-width: 560px) {
    .rpm-h1 { font-size: 20px !important; }
    .rpm-subtitle { display: none !important; }
    .rpm-formularow { margin-top: 18px !important; }
    .rpm-fwpair { grid-template-columns: 1fr !important; }
    .rpm-fwquad { grid-template-columns: 1fr 1fr !important; }
    .rpm-bignum { font-size: 30px !important; white-space: nowrap; }
    .rpm-bignum span { font-size: 13px !important; margin-left: 7px !important; }
  }
  @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }

  /* Theme palettes. Default: warm beige + oxblood red accent. Olive: true greyscale
     (every beige tone mapped to neutral grey at the SAME lightness) + matte olive accent.
     Only the accent changes hue; the beige-to-grey conversion preserves the value scale. */
  .rpm-app {
    --ink: #16181d; --paper: #f3f1ec; --line: #d8d3c8; --accent: #9a3b2e; --surface: #fff;
    --accent-fill: rgba(154,59,46,0.07); --accent-fill2: rgba(154,59,46,0.18);
    --accent-band: rgba(154,59,46,0.1); --accent-soft: #7a4a44; --accent-bg: #fbf2f0;
    --accent-neg: #a3372b; --verdict-bg: #3a1614; --verdict-fg: #f3dcd8;
    --warm1: #56504a; --warm2: #948b7f; --warm3: #a08d88; --warm4: #857d72;
    --warm5: #d8cfc4; --warm6: #c9b9a8; --paper2: #faf8f3; --paper3: #eceae3;
    --paper4: #e6e0d8; --warmdk1: #3a352f; --warmdk2: #2e2a25;
    transition: --accent 0.4s ease;
  }
  .rpm-app.rpm-olive {
    --ink: #2b2b30; --paper: #edeef0; --line: #d6d6da; --accent: #4f7a6f; --surface: #f7f7f8;
    --accent-fill: rgba(79,122,111,0.12); --accent-fill2: rgba(79,122,111,0.26);
    --accent-band: rgba(79,122,111,0.14); --accent-soft: #3c5f56; --accent-bg: #eaf1ee;
    --accent-neg: #3c5f56; --verdict-bg: #24332e; --verdict-fg: #d6e4df;
    --warm1: #62626b; --warm2: #62626b; --warm3: #62626b; --warm4: #62626b;
    --warm5: #ececee; --warm6: #d6d7da; --paper2: #f7f7f8; --paper3: #edeef0;
    --paper4: #edeef0; --warmdk1: #2b2b30; --warmdk2: #2b2b30;
  }
`;


// ============================================================
// FEDERAL DATA LAYER (BUNDLED SNAPSHOT)
// Per-ZIP ACS 2023 5-year + CDC PLACES obesity, snapshotted into the data file by
// harvest_snapshot.mjs. No live API, no key, no network, no timeouts, no aborts.
// Re-run the harvest on a new ACS release to refresh. lookupZip returns the same
// object shape the old live pull produced, so all downstream code is unchanged.
// ============================================================

function lookupZip(zip) {
  const d = ZIP_DATA[zip];
  if (!d) return null;
  return {
    medHHIncome: d.medHHIncome,
    eduShareBplus: d.eduShareBplus,
    eduShareGrad: d.eduShareGrad,
    eduShareAssoc: d.eduShareAssoc,
    obesity: d.obesity,
    maleMedEarn: d.maleMedEarn,
    homeValue: d.homeValue,
    grossRent: d.grossRent,
    ownerCostMortgage: d.ownerCostMortgage,
    dist: {
      p20: d.dist.p20, p40: d.dist.p40, p60: d.dist.p60,
      p80: d.dist.p80, p95: d.dist.p95,
    },
  };
}

// Place an income on the LOCAL distribution curve (household-income breakpoints,
// used as the competitive-male reference). Returns a percentile 0–100.
// Beyond the published p95 breakpoint, extrapolate into the top tail.
function localPercentile(income, dist) {
  if (!dist || dist.p20 == null) return null;
  const pts = [
    [0, 0], [dist.p20, 20], [dist.p40, 40], [dist.p60, 60],
    [dist.p80, 80], [dist.p95, 95],
  ].filter(([x]) => x != null);
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, p0] = pts[i], [x1, p1] = pts[i + 1];
    if (income >= x0 && income <= x1) {
      return p0 + ((income - x0) / (x1 - x0 || 1)) * (p1 - p0);
    }
  }
  // top tail above p95: log-style approach toward 99.9
  const top = pts[pts.length - 1];
  if (income > top[0]) {
    const ratio = income / top[0];
    return Math.min(99.9, 95 + Math.log2(ratio) * 4);
  }
  return 0;
}

// Inverse: the income at a given percentile on the local distribution.
function incomeAtPercentile(p, dist) {
  if (!dist || dist.p20 == null) return null;
  const pts = [
    [0, 0], [dist.p20, 20], [dist.p40, 40], [dist.p60, 60],
    [dist.p80, 80], [dist.p95, 95],
  ].filter(([x]) => x != null);
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, p0] = pts[i], [x1, p1] = pts[i + 1];
    if (p >= p0 && p <= p1) {
      return x0 + ((p - p0) / (p1 - p0 || 1)) * (x1 - x0);
    }
  }
  // above p95: invert the log tail
  const topX = pts[pts.length - 1][0];
  if (p > 95) return topX * Math.pow(2, (p - 95) / 4);
  return topX;
}


// ============================================================
// THE RETENTION PRICING MODEL — CALCULATOR
// S = B × C × M    (retention price, her side)
// Retain ⇔ (Vp + Vℓ·k) − F ≥ S   AND   import is low
//
// Public-data anchors baked in (2024–2025):
//  - US individual income: median ~$50k; top10% ~$150k; top5% ~$201k; top1% ~$430k
//  - Metro cost multipliers from COL indices
//  - Race-preference + interracial base rates from OkCupid/Tinder/Census
// Everything else is user observation with explicit confidence bands.
// ============================================================

const FMT = (n) =>
  n >= 1000
    ? "$" + Math.round(n).toLocaleString("en-US")
    : "$" + Math.round(n).toLocaleString("en-US");

const ordinal = (n) => {
  const s = ["th", "st", "nd", "rd"], v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
};

// Percent of a base, with precision that grows as the fraction shrinks. Floors at
// 0.001%; below that the count is effectively no one in the local population.
const fmtTinyPct = (num, base) => {
  if (!base || base <= 0) return "n/a";
  const p = (num / base) * 100;
  if (p <= 0) return "essentially no one";
  if (p < 0.001) return "under 0.001%";
  if (p < 0.01) return p.toFixed(3) + "%";
  if (p < 0.1) return p.toFixed(2) + "%";
  if (p < 1) return p.toFixed(1) + "%";
  return Math.round(p) + "%";
};

// Dynamic explainer text that changes with the slider position.
function RELATIONAL_TEXT(v) {
  if (v >= 90) return "Everything she wants in a man she's with: attraction, compatibility, intimacy, emotional maturity, values, family, safety, etc. Added value here is where you can offset her price the most.";
  if (v >= 70) return "Strong draw. You're a man she's genuinely attracted to and proud to be seen with. Real offset, but it has a ceiling against her price.";
  if (v >= 40) return "Solid but not commanding. She enjoys you. Not enough on its own to move a high price.";
  if (v >= 10) return "Limited pull. You register as pleasant company more than a man she's drawn to.";
  return "No meaningful attraction credit. Nothing here offsets her price.";
}
function FRICTION_TEXT(v) {
  if (v >= 90) return "Heavy additional drag on top of your children: other dependents, legal entanglement, or obligations she'd also have to absorb.";
  if (v >= 70) return "Substantial extra friction beyond your children.";
  if (v >= 40) return "Some additional friction beyond your children, workable for the right fit.";
  if (v >= 10) return "Minor extra friction beyond your children.";
  return "Nothing beyond your children. Your fatherhood structure above is the whole of it.";
}

// ---- Public anchor tables -------------------------------------------------

// Metro anchors. floor = top-tier after-tax maintenance floor (COL-scaled);
// cNudge derived from Census ACS 2023–24 metro median household income rank
// (San Jose/SF highest ~$141–175k; DC ~$122k; Boston/Seattle high; St. Louis/
// Pittsburgh mid; smaller markets low). Higher metro income => denser high-earning
// male suitor pool => larger upward pull on C.
const MARKETS = {
  "San Francisco Bay": { floor: 240000, col: 1.05, cNudge: 0.48 },
  "New York City": { floor: 235000, col: 1.0, cNudge: 0.45 },
  "Washington DC": { floor: 200000, col: 0.92, cNudge: 0.4 },
  "Boston": { floor: 195000, col: 0.95, cNudge: 0.38 },
  "Los Angeles": { floor: 215000, col: 0.95, cNudge: 0.4 },
  "Miami": { floor: 205000, col: 0.9, cNudge: 0.38 },
  "Denver / Scottsdale": { floor: 155000, col: 0.82, cNudge: 0.28 },
  "Chicago": { floor: 170000, col: 0.82, cNudge: 0.3 },
  "Dallas / Austin": { floor: 150000, col: 0.78, cNudge: 0.26 },
  "Atlanta": { floor: 145000, col: 0.76, cNudge: 0.25 },
  "Nashville / Charlotte": { floor: 130000, col: 0.74, cNudge: 0.2 },
  "Mid-size metro (St. Louis, Pittsburgh, Indianapolis)": { floor: 95000, col: 0.62, cNudge: 0.12 },
  "Smaller / regional market": { floor: 70000, col: 0.55, cNudge: 0.05 },
};

// Built-in 40-metro fallback: REAL federal data, pre-fetched from Census ACS 2023
// (income, male earnings, income-distribution breakpoints) and CDC PLACES 2024
// (obesity). Used only in the preview build. In production the harvest writes a
// 100-metro METRO_DATA into zipData.js, which supersedes this. p95=250001 is the
// ACS top-code (income at or above ~$250k).
const METRO_DATA_FALLBACK = {
  "New York, NY": { medHH:104553, maleMed:87207, p20:28440, p40:75300, p60:141538, p80:250001, p95:250001, obesity:0.192 },
  "Los Angeles, CA": { medHH:87760, maleMed:47940, p20:33675, p40:68183, p60:110133, p80:179919, p95:250001, obesity:0.265 },
  "Chicago, IL": { medHH:81797, maleMed:55568, p20:30902, p40:63311, p60:102693, p80:167832, p95:250001, obesity:0.31 },
  "Dallas, TX": { medHH:74149, maleMed:47755, p20:33795, p40:59867, p60:91995, p80:147918, p95:250001, obesity:0.357 },
  "Houston, TX": { medHH:73104, maleMed:48131, p20:31197, p40:58057, p60:91763, p80:152504, p95:250001, obesity:0.373 },
  "Washington, DC": { medHH:106287, maleMed:86270, p20:37090, p40:81976, p60:138274, p80:235940, p95:250001, obesity:0.247 },
  "Miami, FL": { medHH:68694, maleMed:42562, p20:26745, p40:53516, p60:86014, p80:142562, p95:250001, obesity:0.295 },
  "Philadelphia, PA": { medHH:60698, maleMed:46755, p20:20401, p40:45608, p60:77275, p80:127694, p95:250001, obesity:0.335 },
  "Atlanta, GA": { medHH:91490, maleMed:67500, p20:33954, p40:70741, p60:114185, p80:199189, p95:250001, obesity:0.282 },
  "Phoenix, AZ": { medHH:85518, maleMed:52078, p20:39000, p40:68625, p60:104725, p80:162143, p95:250001, obesity:0.304 },
  "Boston, MA": { medHH:92859, maleMed:59640, p20:26542, p40:69432, p60:120009, p80:203033, p95:250001, obesity:0.242 },
  "San Francisco, CA": { medHH:141446, maleMed:92837, p20:43281, p40:103281, p60:181590, p80:250001, p95:250001, obesity:0.172 },
  "Riverside, CA": { medHH:89672, maleMed:49417, p20:38122, p40:71730, p60:110427, p80:168689, p95:250001, obesity:0.368 },
  "Detroit, MI": { medHH:59521, maleMed:46075, p20:22099, p40:45677, p60:75971, p80:125313, p95:231554, obesity:0.374 },
  "Seattle, WA": { medHH:122148, maleMed:80289, p20:50340, p40:95657, p60:152329, p80:247212, p95:250001, obesity:0.226 },
  "Minneapolis, MN": { medHH:96339, maleMed:61570, p20:41618, p40:76486, p60:119712, p80:190630, p95:250001, obesity:0.271 },
  "San Diego, CA": { medHH:102285, maleMed:56929, p20:42634, p40:81133, p60:125904, p80:197521, p95:250001, obesity:0.253 },
  "Tampa, FL": { medHH:75011, maleMed:48466, p20:32351, p40:60015, p60:93777, p80:150219, p95:250001, obesity:0.316 },
  "Denver, CO": { medHH:91681, maleMed:62933, p20:38281, p40:72390, p60:114693, p80:184290, p95:250001, obesity:0.216 },
  "St. Louis, MO": { medHH:55279, maleMed:47853, p20:19585, p40:42479, p60:70222, p80:117303, p95:215492, obesity:0.37 },
  "Baltimore, MD": { medHH:59623, maleMed:49162, p20:19963, p40:45820, p60:76005, p80:129006, p95:245171, obesity:0.387 },
  "Charlotte, NC": { medHH:83765, maleMed:55861, p20:38381, p40:66459, p60:104843, p80:170445, p95:250001, obesity:0.297 },
  "Orlando, FL": { medHH:77011, maleMed:45583, p20:33640, p40:60965, p60:96042, p80:150333, p95:250001, obesity:0.335 },
  "San Antonio, TX": { medHH:70571, maleMed:44456, p20:30473, p40:56190, p60:86794, p80:138771, p95:250001, obesity:0.341 },
  "Portland, OR": { medHH:86247, maleMed:54114, p20:35798, p40:68381, p60:108497, p80:174694, p95:250001, obesity:0.289 },
  "Sacramento, CA": { medHH:88724, maleMed:51499, p20:37295, p40:70966, p60:108369, p80:168813, p95:250001, obesity:0.296 },
  "Pittsburgh, PA": { medHH:76393, maleMed:56910, p20:30709, p40:59877, p60:96142, p80:155919, p95:250001, obesity:0.335 },
  "Las Vegas, NV": { medHH:73845, maleMed:45403, p20:31916, p40:59166, p60:91340, p80:142459, p95:250001, obesity:0.314 },
  "Austin, TX": { medHH:97169, maleMed:61868, p20:42371, p40:77192, p60:121525, p80:194658, p95:250001, obesity:0.304 },
  "Cincinnati, OH": { medHH:70816, maleMed:50189, p20:27389, p40:54388, p60:89961, p80:147195, p95:250001, obesity:0.356 },
  "Kansas City, MO": { medHH:67178, maleMed:50196, p20:28878, p40:53295, p60:83586, p80:132924, p95:229998, obesity:0.372 },
  "Columbus, OH": { medHH:73795, maleMed:49448, p20:32612, p40:58657, p60:91850, p80:146181, p95:250001, obesity:0.337 },
  "Indianapolis, IN": { medHH:63450, maleMed:45377, p20:27845, p40:50419, p60:77935, p80:124503, p95:228196, obesity:0.383 },
  "Cleveland, OH": { medHH:62823, maleMed:49356, p20:24332, p40:49127, p60:79058, p80:131798, p95:250001, obesity:0.353 },
  "Nashville, TN": { medHH:75664, maleMed:49778, p20:34201, p40:60634, p60:93735, p80:149681, p95:250001, obesity:0.323 },
  "San Jose, CA": { medHH:159674, maleMed:91898, p20:64015, p40:123967, p60:200026, p80:250001, p95:250001, obesity:0.219 },
  "Jacksonville, FL": { medHH:68447, maleMed:47603, p20:29371, p40:54461, p60:84697, p80:131787, p95:241924, obesity:0.343 },
  "Raleigh, NC": { medHH:101763, maleMed:65695, p20:43827, p40:80359, p60:125380, p80:196168, p95:250001, obesity:0.293 },
  "Richmond, VA": { medHH:62671, maleMed:45005, p20:23341, p40:47983, p60:77594, p80:134977, p95:250001, obesity:0.377 },
  "Salt Lake City, UT": { medHH:94658, maleMed:55075, p20:45036, p40:77455, p60:114864, p80:171040, p95:250001, obesity:0.299 },
};

// Per-metro data and single-women counts come from the annual harvest (zipData.js
// exports METRO_DATA + METRO_SINGLE_WOMEN, 100 metros). In this preview build those
// exports are absent, so fall back to the built-in 40-metro table and an empty count
// map (every metro reads 0 until the harvest has populated it).
const METRO_DATA = (typeof window !== "undefined" && window.METRO_DATA) || METRO_DATA_FALLBACK;
const METRO_SINGLE_WOMEN = (typeof window !== "undefined" && window.METRO_SINGLE_WOMEN) || {};

// CDC NHANES (2017–2018 race-by-sex; Aug2021–Aug2023 overall) measured-BMI obesity
// prevalence in WOMEN. Combined with overweight, a clear majority sit above the
// lean band the "fit" gate requires. Used to compute trait scarcity on the supply
// side: rarer fit tier => higher female optionality at the top => upward pressure
// on C and M. Not a direct multiplier on S.
const OBESITY_W = { white: 0.398, hispanic: 0.437, black: 0.569, asian: 0.172, overall: 0.413 };
// approx share ALSO overweight-but-not-obese (NHANES), to estimate lean remainder
const OVERWEIGHT_W = { white: 0.27, hispanic: 0.30, black: 0.22, asian: 0.25, overall: 0.27 };

// Cohort is specified white; this is the relevant base rate. Lean share = remainder.
function leanShareWhite() {
  return Math.max(0.05, 1 - OBESITY_W.white - OVERWEIGHT_W.white); // ~0.33 of women
}

// Presentation tier — pure visual appeal, before fitness and children adjust the realized
// level. Dual: priceV multiplies the floor B (pricing); topShare is the top-% of looks the
// funnel targets (count, combined with the zip's obesity). No dataset field of its own.
const TIER_OPTS = [
  { id: "tierMagazine", label: "Stops every room. Magazine-level",    priceV: 1.6,  topShare: 0.03 },
  { id: "tierStriking", label: "Striking. Clearly turns heads",       priceV: 1.25, topShare: 0.10 },
  { id: "tierAbove",    label: "Above average, put-together",         priceV: 1.0,  topShare: 0.30 },
  { id: "tierAttractive", label: "Attractive, not the top of her city", priceV: 0.78, topShare: 0.55 },
  { id: "tierAverage",  label: "Average looks",                       priceV: 0.55, topShare: 0.80 },
  { id: "tierBelow",    label: "Below average",                       priceV: 0.4,  topShare: 1.0 },
];
const TIER_BY_ID = Object.fromEntries(TIER_OPTS.map((o) => [o.id, o]));
const TIER_EXPLAIN = {
  tierMagazine: "Top fraction of a percent on pure visual appeal. The base of her upkeep floor is the highest before fitness and kids adjust it.",
  tierStriking: "Roughly top 5% on looks alone. Styling that reads as effort and resources. High base floor.",
  tierAbove: "Roughly top 10–20%. Attractive and cared-for. Moderate base floor.",
  tierAttractive: "Genuinely attractive but not setting the local ceiling. The lowest base floor of the top tiers.",
  tierAverage: "Around the middle of her local distribution. The comparison-and-optionality dynamics this model is built on weaken here, and the base floor drops well below the top tiers.",
  tierBelow: "Below the local median on looks. Optionality is limited and the price the market will bear falls sharply.",
};

// Fitness — separate from looks. Dual: lookMult/costMult feed pricing (realized looks + the
// upkeep cost line of B); filterShare feeds the funnel desirability count; mi is the fitness
// index into the BMI×fitness matrix in bmiFitness. Multi-select. No dataset field of its own
// (the funnel combines filterShare with the zip's obesity, read separately).
const FITNESS_OPTS = [
  { id: "any",        label: "Any",                                  lookMult: null, costMult: null, filterShare: null, mi: null },
  { id: "fitAthlete", label: "Athlete-level. Visible training discipline", lookMult: 1.18, costMult: 1.6,  filterShare: 0.4, mi: 0 },
  { id: "fitLean",    label: "Lean and toned, clearly works at it",   lookMult: 1.1,  costMult: 1.35, filterShare: 0.7, mi: 1 },
  { id: "fitAvg",     label: "Fit, average gym routine",              lookMult: 1.0,  costMult: 1.1,  filterShare: 1.0, mi: 2 },
  { id: "fitUnfit",   label: "Not especially fit",                    lookMult: 0.88, costMult: 0.9,  filterShare: 1.3, mi: 3 },
  { id: "fitOut",     label: "Out of shape",                          lookMult: 0.75, costMult: 0.8,  filterShare: 1.6, mi: 4 },
];
const FITNESS_BY_ID = Object.fromEntries(FITNESS_OPTS.map((o) => [o.id, o]));
const FITNESS_EXPLAIN = {
  fitAthlete: "Adds the most to both attractiveness and cost. Daily training, recovery, coaching, often procedures, all scaled up in expensive metros. Raises realized looks and the upkeep line of her floor the most.",
  fitLean: "A real, visible fitness investment. Meaningfully raises how she reads and adds a solid upkeep cost.",
  fitAvg: "Ordinary fitness. Small lift to looks, modest cost.",
  fitUnfit: "Below the fit baseline. Pulls realized looks down and carries little upkeep cost.",
  fitOut: "Lowers realized attractiveness regardless of underlying features, and removes the fitness upkeep cost from her floor.",
};

// BMI band — observed, since there is no individual BMI data, only county prevalence.
// It does not act alone; it interacts with fitness (see bmiFitness below).
const BMI_BANDS = ["Very lean (under 19)", "Ideal (19 to 22)", "Average (22 to 25)",
  "Overweight (25 to 30)", "Obese (30+)"];

// id===label maps so the explainer registry can resolve multi-select BMI like the others.
const BMI_BY_ID = BMI_BANDS.reduce((m, b) => { m[b] = { label: b }; return m; }, {});
const BMI_EXPLAIN = {
  "Very lean (under 19)": "A very lean body reads as high-maintenance and raises upkeep cost, but past a point it narrows rather than widens her appeal.",
  "Ideal (19 to 22)": "The ideal band is where looks and upkeep cost both peak when paired with real fitness. The most expensive body to keep.",
  "Average (22 to 25)": "A healthy average body reads well and costs less to maintain than the lean ideal.",
  "Overweight (25 to 30)": "An overweight band pulls her looks-scarcity below neutral and lowers upkeep cost.",
  "Obese (30+)": "An obese band is the lowest looks-scarcity signal and the cheapest to maintain.",
};

// BMI × fitness interaction. Returns { look, cost } multipliers applied on top of the
// fitness multipliers. Low BMI + high fitness enhances both (lean, trained, expensive to
// keep). High BMI + low fitness compounds the penalty. The off-diagonals are not symmetric:
// high BMI with high fitness reads athletic/muscular and is barely penalized, while low BMI
// with no fitness is thin-but-soft, a mild positive. Indices: 0 = best fitness / lowest BMI.
function bmiFitness(bmiSel, fitnessId) {
  const fi = FITNESS_BY_ID[fitnessId] != null ? FITNESS_BY_ID[fitnessId].mi : -1;
  if (fi == null || fi < 0) return { look: 1.0, cost: 1.0 };
  // normalize selection to a list of band strings; "any"/empty = neutral, no body signal
  const list = Array.isArray(bmiSel) ? bmiSel.filter((b) => b && b !== "any") : (bmiSel && bmiSel !== "any" ? [bmiSel] : []);
  if (!list.length) return { look: 1.0, cost: 1.0 };
  // look multiplier matrix [bmi][fitness]
  const LOOK = [
    // athlete   lean    avg     unfit   out
    [1.15,     1.12,   1.05,   0.98,   0.92], // very lean
    [1.18,     1.14,   1.08,   1.0,    0.95], // lean (peak at athlete+lean)
    [1.12,     1.08,   1.02,   0.95,   0.9 ], // healthy
    [1.02,     0.96,   0.9,    0.82,   0.76], // overweight
    [0.9,      0.84,   0.78,   0.7,    0.64], // obese (compounds down with low fitness)
  ];
  // cost multiplier: very low BMI at high fitness is the most expensive to maintain
  const COST = [
    [1.55,     1.4,    1.2,    1.0,    0.9 ], // very lean
    [1.5,      1.35,   1.18,   1.0,    0.9 ], // lean
    [1.3,      1.2,    1.1,    0.95,   0.85], // healthy
    [1.1,      1.0,    0.92,   0.82,   0.75], // overweight
    [0.95,     0.88,   0.8,    0.72,   0.65], // obese
  ];
  // average the look/cost cells of every selected band at the chosen fitness
  let lookSum = 0, costSum = 0, n = 0;
  for (const band of list) {
    const bi = BMI_BANDS.indexOf(band);
    if (bi < 0) continue;
    lookSum += LOOK[bi][fi];
    costSum += COST[bi][fi];
    n++;
  }
  if (!n) return { look: 1.0, cost: 1.0 };
  return { look: lookSum / n, cost: costSum / n };
}

// Male height — a documented preference variable on the man's side, the mirror of how looks
// and body work for her. Height and income are partially substitutable: a shorter man needs
// higher income to land equally, and the short + low-income corner is penalized hardest. Not
// a cliff at exactly 6ft, but a continuous tradeoff, with a hard low cap below 5'8".
const HEIGHT_BANDS = ["6'0\" or taller", "5'10\" to 5'11\"", "5'9\" and under"];

// Returns a multiplier on delivered value. Rows = height band (0 tallest), cols = income
// tier: <100k, 100-200k, 200-300k, 300-500k, 500k+. Tall is neutral-to-positive at any
// income; shorter is penalized, and the penalty eases as income climbs (the substitution).
// 5'9" and under carries a hard cap: even high income cannot fully buy it back.
function heightIncome(heightBand, income) {
  const hi = HEIGHT_BANDS.indexOf(heightBand);
  if (hi < 0) return 1.0;
  const ci = income >= 500000 ? 4 : income >= 300000 ? 3 : income >= 200000 ? 2 : income >= 100000 ? 1 : 0;
  const M = [
    //  <100k  100-200 200-300 300-500  500k+
    [1.05,   1.08,   1.1,    1.1,    1.1 ], // 6'0" or taller
    [0.9,    0.96,   1.0,    1.02,   1.03], // 5'10" to 5'11"
    [0.6,    0.68,   0.74,   0.78,   0.8 ], // 5'9" and under (hard cap, never reaches 1.0)
  ];
  return M[hi][ci];
}

// Plain explainer for a picked height, based on which model band it lands in.
function heightExplain(h) {
  const band = HEIGHT_TO_BAND(h);
  if (band === "6'0\" or taller") return "Lands in the tallest band (6'0\" and up). A premium on how your value reads, and it holds at any income.";
  if (band === "5'10\" to 5'11\"") return "Lands in the middle band (5'10\"-5'11\"). A small penalty at lower income that disappears as you earn more.";
  return "Lands in the 5'9\"-and-under band. Height drags your delivered value, and even high income cannot fully buy it back.";
}

// The exact heights the user picks from, tallest to shortest.
const HEIGHT_PICK = ["6'6\" or taller", "6'5\"", "6'4\"", "6'3\"", "6'2\"", "6'1\"", "6'0\"",
  "5'11\"", "5'10\"", "5'9\"", "5'8\"", "5'7\"", "5'6\"", "5'5\" or shorter"];
// Map a picked exact height to its model band by parsing total inches.
const HEIGHT_TO_BAND = (h) => {
  if (!h) return "5'9\" and under";
  const m = h.match(/(\d+)'(\d+)/);
  if (!m) return "5'9\" and under";
  const inches = parseInt(m[1], 10) * 12 + parseInt(m[2], 10);
  if (inches >= 72) return "6'0\" or taller";      // 6'0" and up
  if (inches >= 70) return "5'10\" to 5'11\"";       // 5'10"-5'11"
  return "5'9\" and under";                          // 5'9" and below
};

// Network reference set sets the core of C
// Network — single source of truth per option. id is the stable internal key stored in state;
// label is display-only and can change freely; priceV feeds the pricing C contribution.
// Pricing-only: this group does not feed the availability count or read any dataset field.
const NETWORK_OPTS = [
  { id: "netOldMoney", label: "Old money. Trust funds and seven-figure men around her.",        priceV: 1.85 },
  { id: "netElite",    label: "Elite city circle. Country clubs, finance and law, visible wealth.", priceV: 1.55 },
  { id: "netPro",      label: "Educated professional crowd, some money in the mix.",             priceV: 1.25 },
  { id: "netRegional", label: "Regional and grounded. Family or faith at the center.",           priceV: 1.0 },
  { id: "netCommunity",label: "Community rooted. Status isn't the measuring stick.",             priceV: 0.9 },
];
const NETWORK_BY_ID = Object.fromEntries(NETWORK_OPTS.map((o) => [o.id, o]));
const NETWORK_EXPLAIN = {
  netOldMoney: "Her sense of normal is set by inherited wealth and men earning seven figures. Comparison runs hottest here, and almost no non-dynastic income clears it. The single biggest upward force on her price.",
  netElite: "Her reference set is high earners in finance, law, and the club scene. Strong upward pressure on price, because you're being measured against that field.",
  netPro: "A normal upper-professional circle with some wealth around but not dominated by it. Middle of the comparison range.",
  netRegional: "Her world centers on family, community, or faith rather than status display. This is the baseline comparison pressure on this axis.",
  netCommunity: "Status comparison isn't the currency in her circle. Below baseline, the most retainable on this axis, which lowers her price.",
};

// Her own income relative to a partner — high earners can lower their financial dependence but
// often RAISE C (calibrated to a high reference). incV feeds pricing (C). acsBand maps each tier
// to the finest real ACS B20001 female-earnings cut for the COUNT: "zero" (no earnings),
// "u75" ($1-74,999), "b7599" ($75k-99,999), "p100" ($100k+). The top three pricing bands all
// collapse to p100 because B20001's ceiling is a single "$100,000 or more" bracket.
// Income — single source of truth per option. id is the stable internal key stored in
// state and used by all math; label is display-only and can change freely; priceV feeds the
// pricing C contribution; acs maps to the Census female-income band for the availability count.
// "u75" ($1-74,999), "b7599" ($75k-99,999), "p100" ($100k+). The top three pricing bands all
// map to the same p100 ACS bracket (Census doesn't split above $100k for this table).
const HERINCOME_OPTS = [
  { id: "any",        label: "Any",            priceV: null, acs: null   },
  { id: "inc200plus", label: "$200k+",         priceV: 0.14, acs: "p100" },
  { id: "inc150_199", label: "$150k to $199k", priceV: 0.11, acs: "p100" },
  { id: "inc100_149", label: "$100k to $149k", priceV: 0.08, acs: "p100" },
  { id: "inc75_99",   label: "$75k to $99k",   priceV: 0.04, acs: "b7599" },
  { id: "inc1_75",    label: "$1 to $75k",     priceV: -0.02, acs: "u75" },
  { id: "incNone",    label: "Does not work",  priceV: -0.08, acs: "zero" },
];
// Fast lookups by id.
const HERINCOME_BY_ID = Object.fromEntries(HERINCOME_OPTS.map((o) => [o.id, o]));
// Explainer text keyed by id (display-independent).
const HERINCOME_EXPLAIN = {
  inc200plus: "She doesn't need provision, so money buys less with her. But top earners calibrate expectations to their own peers, which nudges her price up.",
  inc150_199: "High personal income. Provision matters little; her comparison set sits high, which keeps her price elevated.",
  inc100_149: "Strong earner. Largely self-sufficient, with expectations calibrated to a professional peer set. A modest upward nudge.",
  inc75_99: "Comfortable on her own but not at a level that resets her expectations. Roughly neutral.",
  inc1_75: "Provision carries more weight here, which slightly lowers the comparison bar.",
  incNone: "Provision matters most, which lowers her comparison-driven expectations even as it raises what you would fund.",
};

// Her education. ACS attainment is cumulative (a graduate degree-holder also holds a
// bachelor's). The "partner-tier" refinement that makes a woman wife-eligible, and that
// also raises her own expectations of a partner, scales with attainment. Nudges C.
// Her education — dual. priceV is the pricing nudge to C (partner-tier refinement / raised
// expectations); rank orders the levels so the highest selected drives pricing; acsBucket tags
// which local Census share the funnel counts against. Reads dataset fields eduShareBplus/
// eduShareGrad/eduShareAssoc for the COUNT, but those keys are unchanged by this migration.
const EDU_OPTS = [
  { id: "any",      label: "Any",                                 priceV: null, rank: -1, acsBucket: null },
  { id: "eduHS",    label: "High school or less",                 priceV: 0.0,  rank: 0, acsBucket: "sub" },
  { id: "eduSome",  label: "Some college",                        priceV: 0.02, rank: 1, acsBucket: "sub" },
  { id: "eduAssoc", label: "Associate's degree or trade school",  priceV: 0.05, rank: 2, acsBucket: "assoc" },
  { id: "eduBach",  label: "Bachelor's degree",                   priceV: 0.10, rank: 3, acsBucket: "bachOnly" },
  { id: "eduGrad",  label: "Graduate Degree",                     priceV: 0.10, rank: 4, acsBucket: "grad" },
];
const EDU_BY_ID = Object.fromEntries(EDU_OPTS.map((o) => [o.id, o]));
const EDU_EXPLAIN = {
  eduGrad: "Highest attainment tier. Tends to come with the highest expectations of a partner's standing and the strongest 'partner-tier' refinement. Nudges her price up. A graduate degree also counts as a college degree.",
  eduBach: "College-educated, the baseline for the professional cohort. Moderate upward nudge.",
  eduAssoc: "A completed two-year or vocational credential. Above some-college, below a four-year degree, with a modest effect on expectations.",
  eduSome: "Slightly above the floor, small effect on expectations.",
  eduHS: "No degree-driven lift to her expectations on this axis.",
};

// Mobility / optionality
// Mobility / reach — pure geographic and life freedom to pursue alternatives (her kids
// are handled separately in HERKIDS so children read as their own clear question).
// Mobility — single source of truth per option. Pricing-only: feeds M, does not feed the
// count and reads no dataset field. id stored in state, label display-only, priceV the multiplier.
const MOBILITY_OPTS = [
  { id: "mobAnywhere", label: "Can live and work anywhere",            priceV: 1.4 },
  { id: "mobRooted",   label: "Free, but rooted here by job or family", priceV: 1.25 },
  { id: "mobTied",     label: "Tied down here, limited reach",          priceV: 1.08 },
];
const MOBILITY_BY_ID = Object.fromEntries(MOBILITY_OPTS.map((o) => [o.id, o]));
const MOBILITY_EXPLAIN = {
  mobAnywhere: "Maximum reach. Nothing about her job or location ties her down, so she can pursue or relocate toward better options anywhere, which raises her optionality and her price.",
  mobRooted: "No hard constraints, but her work or family keeps her local. Reach is real but bounded.",
  mobTied: "Her job or circumstances pin her in place, which narrows her field and lowers her price.",
};

// Her children — anchor her in place and lower her optionality (M). Their own question,
// separate from your children, which are friction on your side. Pricing-only: feeds M, does
// not feed the count and reads no dataset field.
const HERKIDS_OPTS = [
  { id: "any",          label: "Any",                                       priceV: null },
  { id: "hkNone",       label: "No children",                               priceV: 1.08 },
  { id: "hkCoparent",   label: "Children, co-parent in town, tied to the area", priceV: 0.85 },
  { id: "hkOnline",     label: "Children, but dates and travels nationally",  priceV: 0.97 },
  { id: "hkRelocate",   label: "Children, and free to relocate with them",   priceV: 1.0 },
];
const HERKIDS_BY_ID = Object.fromEntries(HERKIDS_OPTS.map((o) => [o.id, o]));
const HERKIDS_EXPLAIN = {
  hkNone: "No dependents anchoring her, so her reach to alternatives stays high. Slightly raises her optionality and price.",
  hkCoparent: "Children and a local co-parent anchor her in place, narrowing her field. The same friction that hurts a man's position makes a woman more retainable, and lowers her price.",
  hkOnline: "Rooted by kids day to day, but she dates and travels nationally, drawing a wider comparison set than her home market alone. That keeps her reach higher than her geography would suggest.",
  hkRelocate: "She has children but no co-parent holding her in place, so her reach is close to a woman with no kids at all.",
};

// Age band — affects M and, on a lag, C
// Age band — optionality multipliers (m on M, cLag on C). The user sets a continuous age
// range; ageRangeToBand population-weights the covered bands into one {m, cLag} using the
// center ZIP's women-by-age counts. Reads dataset field women, but those keys are unchanged.
const AGEBAND_OPTS = [
  { id: "ageUnder28", label: "Under 28. The most options she'll ever have",            m: 1.12, cLag: 1.0 },
  { id: "age28_33",   label: "28 to 33. Strong, starting to value time",               m: 1.05, cLag: 1.0 },
  { id: "age34_38",   label: "34 to 38. Options narrowing, expectations still high",    m: 0.92, cLag: 1.08 },
  { id: "age39_44",   label: "39 to 44. Fewer suitors, standards still set high",       m: 0.82, cLag: 1.12 },
  { id: "age45up",    label: "45 and up. A much smaller field",                         m: 0.72, cLag: 1.05 },
];
const AGEBAND_BY_ID = Object.fromEntries(AGEBAND_OPTS.map((o) => [o.id, o]));

// Import behavior — the gate
// Import gate — does she actually show up (gate before price). Pricing-only: feeds the gate,
// not the count, no dataset field. priceV is the gate level (0 = all in, 1/2 = failing).
const IMPORT_OPTS = [
  { id: "impAllIn",   label: "All in. Present and exclusive in practice",                  priceV: 0 },
  { id: "impUnclear", label: "Hard to read. Keeps options or attention elsewhere",         priceV: 1 },
  { id: "impElsewhere", label: "Taking attention or money from higher-tier men elsewhere", priceV: 2 },
];
const IMPORT_BY_ID = Object.fromEntries(IMPORT_OPTS.map((o) => [o.id, o]));
const IMPORT_EXPLAIN = {
  impAllIn: "She's actually here, exclusive in behavior, not sourcing attention or money elsewhere. The gate is open and the price math applies.",
  impUnclear: "Ambiguous signals. Until this resolves to all-in, treat the price as unpayable no matter what the math says, because this gate sits before everything.",
  impElsewhere: "She's sourcing value from other men. The gate fails before price is even evaluated, anything you provide is funding her position, not keeping her.",
};

// k inputs — history discount applies to LOVER value, only under serious intent
// Pedigree — your lineage (k discount on lover value under serious intent). Pricing-only.
const PEDIGREE_OPTS = [
  { id: "pedEarned", label: "No, I earned my own way",              priceV: 1.0 },
  { id: "pedSome",   label: "Some family money in the background",  priceV: 0.85 },
  { id: "pedGen",    label: "Yes, established generational wealth",  priceV: 0.72 },
];
const PEDIGREE_BY_ID = Object.fromEntries(PEDIGREE_OPTS.map((o) => [o.id, o]));
const PEDIGREE_EXPLAIN = {
  pedEarned: "You price a partner on present value, with no lineage to protect. Her history barely discounts what you'd offer.",
  pedSome: "Some family money in the picture, so her history carries a moderate discount in a serious context.",
  pedGen: "In a world where safety is code for wealth and financial independence, generational wealth is a premium on top of high wage earnings or entrepreneurialism. With a lineage to protect, her past discounts the relational value more heavily under serious intent.",
};
// History — how her past reads (k discount on lover value under serious intent). Pricing-only.
const HISTORY_OPTS = [
  { id: "histPrivate", label: "Private. Her past isn't part of how she presents", priceV: 1.0 },
  { id: "histUnknown", label: "Don't know or don't think about it",               priceV: 0.92 },
  { id: "histLoud",    label: "Loud about it. Her options are part of her brand",  priceV: 0.8 },
];
const HISTORY_BY_ID = Object.fromEntries(HISTORY_OPTS.map((o) => [o.id, o]));
const HISTORY_EXPLAIN = {
  histPrivate: "Discreet history reads as circumstance, not identity, and preserves her standing in a serious context. Little to no discount.",
  histUnknown: "Neutral. A small default discount applies under serious intent.",
  histLoud: "When optionality is part of how she markets herself, a serious-intent buyer reads ongoing availability, which discounts relational value the most.",
};

// Race / sorting term — probability weighting on suitor competition, not a wall
// Sorting — are you her type (probability weighting on F, not a wall). Pricing-only.
const SORTING_OPTS = [
  { id: "sortInType",  label: "I'm the type she tends to go for (helps me)", priceV: 1.0 },
  { id: "sortOutType", label: "I'm outside her usual type (steeper climb)",   priceV: 1.18 },
];
const SORTING_BY_ID = Object.fromEntries(SORTING_OPTS.map((o) => [o.id, o]));
const SORTING_EXPLAIN = {
  sortInType: "You're inside the group she's most drawn to, which keeps you in the running rather than fighting her preferences. No penalty.",
  sortOutType: "You're outside her usual type, a real headwind, though not a wall. Dating data shows roughly a 20% lower response rate across these lines, and about 19% of marriages cross them.",
};

// Your fatherhood structure — the dominant friction a partner has to absorb. Dual: priceV is
// the annualized dollar "value drag" feeding F (pricing); kidsOk flags whether this triggers the
// funnel's "open to a partner with children" filter. No dataset field of its own.
const FATHERHOOD_OPTS = [
  { id: "fhNone",          label: "No children",                                       priceV: 0,      kidsOk: false },
  { id: "fhLocalJoint",    label: "Kids, local, joint custody, no support out",         priceV: 35000,  kidsOk: true },
  { id: "fhLocalSupport",  label: "Kids, local, you pay support",                       priceV: 60000,  kidsOk: true },
  { id: "fhDistTravel",    label: "Kids in another state, you travel and pay support",  priceV: 130000, kidsOk: true },
  { id: "fhDistHostile",   label: "Kids in another state, heavy support, hostile ex",   priceV: 175000, kidsOk: true },
];
const FATHERHOOD_BY_ID = Object.fromEntries(FATHERHOOD_OPTS.map((o) => [o.id, o]));
const FATHERHOOD_EXPLAIN = {
  fhNone: "Nothing about your family structure raises what you have to deliver. A friction-free competitor has no edge on you here.",
  fhLocalJoint: "Children nearby with shared custody and no money flowing out. Real but light friction, the kind most partners absorb.",
  fhLocalSupport: "Local kids plus a support obligation that's allocated before the relationship begins. Moderate friction a friction-free man doesn't carry.",
  fhDistTravel: "The structurally heaviest common case: distance, the cost and time of travel, and support all at once. This is the friction the source material identifies as your single biggest one, and a competing man without it has a real advantage when she compares.",
  fhDistHostile: "Distance, heavy support, and an ex she'd have to navigate. The maximum drag. A woman choosing you absorbs all of it, and the model treats this as the strongest single force lowering your delivered value.",
};

// Per-option explainer text for the running stack on the right. Plain language, says
// what the choice means and which way it moves the price.
const EXPLAIN = {
  // BMI
  "Very lean (under 19)": "Very low body mass. Paired with high fitness this is the lean-and-trained peak and the most expensive body to maintain. Paired with no fitness it reads thin but soft, a milder positive.",
  "Ideal (19 to 22)": "The range where high fitness produces the strongest enhancement to both looks and cost. The model's peak combination.",
  "Average (22 to 25)": "A normal healthy range. Fitness still moves it up or down, but neither enhances nor compounds as sharply as the extremes.",
  "Overweight (25 to 30)": "Above the healthy range. High fitness softens this toward athletic or muscular and limits the penalty. Low fitness reads as overweight and pulls realized looks down.",
  "Obese (30+)": "Highest band. With high fitness it reads athletic and is only modestly penalized. With low fitness it compounds an already low realized attractiveness, the worst combination in the model.",
  // HEIGHT explainers are generated dynamically (see heightExplain), since the picker offers
  // many discrete heights that map onto three model bands.
};

// Income percentile engine (US individual, 2024–25 anchors)
function incomePercentile(income) {
  const pts = [
    [0, 0], [30000, 30], [50200, 50], [75000, 66], [100000, 79],
    [150000, 90], [201050, 95], [300000, 98], [430000, 99], [700000, 99.6],
    [1200000, 99.9],
  ];
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, p0] = pts[i];
    const [x1, p1] = pts[i + 1];
    if (income >= x0 && income <= x1) {
      return p0 + ((income - x0) / (x1 - x0)) * (p1 - p0);
    }
  }
  return income > 1200000 ? 99.95 : 0;
}

// Effective all-in tax rate, computed from the ACTUAL 2025 federal marginal brackets
// (single filer), plus FICA and a flat state rate. Not interpolated guesses: the real
// progressive formula, so it scales correctly at every income. Returns share of gross kept.
const FED_BRACKETS_2025 = [   // [lower bound, marginal rate], single filer, published IRS
  [0, 0.10], [11925, 0.12], [48475, 0.22], [103350, 0.24],
  [197300, 0.32], [250525, 0.35], [626350, 0.37],
];
const STD_DEDUCTION_2025 = 15000;   // single-filer standard deduction, published
const STATE_RATE = 0.0495;          // flat state income rate (IL), published
const FICA_SS_RATE = 0.062, FICA_SS_CAP = 176100, FICA_MED_RATE = 0.0145; // published 2025

function federalTax(taxable) {
  if (taxable <= 0) return 0;
  let tax = 0;
  for (let i = 0; i < FED_BRACKETS_2025.length; i++) {
    const [lo, rate] = FED_BRACKETS_2025[i];
    const hi = i + 1 < FED_BRACKETS_2025.length ? FED_BRACKETS_2025[i + 1][0] : Infinity;
    if (taxable > lo) tax += (Math.min(taxable, hi) - lo) * rate;
    else break;
  }
  return tax;
}
function effectiveTaxRate(income) {
  if (income <= 0) return 0;
  const taxable = Math.max(0, income - STD_DEDUCTION_2025);
  const fed = federalTax(taxable);
  const state = taxable * STATE_RATE;
  const fica = Math.min(income, FICA_SS_CAP) * FICA_SS_RATE + income * FICA_MED_RATE;
  return (fed + state + fica) / income;
}
const afterTaxKept = (income) => 1 - effectiveTaxRate(income);

// Convert an after-tax target into the pre-tax gross required, using the real effective rate
// at that gross level (solve the gross whose after-tax equals the target).
function grossFromAfterTax(afterTax) {
  // iterate: start from a guess, converge on gross where gross*(1-rate(gross)) = afterTax.
  let g = afterTax / 0.7;
  for (let i = 0; i < 12; i++) {
    const net = g * afterTaxKept(g);
    g = g * (afterTax / Math.max(1, net));
  }
  return g;
}

// Pure model. data = { medHH, dist:{p20..p95}, maleMed, obesity } (real, from ZIP or metro).
// inputs = all the slider/dropdown values. Returns the full result object.
// Class ladder + family-of-four net, for the reality-check panel. National household-income
// class bands (2024 Pew/Census-style anchors), then COL-weighted to the ZIP. For a
// representative income in each band, model after-tax income minus a COL-weighted family-of-
// four cost of living, anchored to REAL local housing (ACS) where possible and modeled
// national figures (COL-scaled) for childcare, transport, education, vacations, and savings.
function classLadder(data) {
  if (!data || !data.medHH) return null;
  const col = Math.max(0.55, Math.min(2.4, data.medHH / 80000));
  // National band thresholds (household income).
  const bands = [
    { name: "Lower", natLow: 0, natHigh: 50000, rep: 38000 },
    { name: "Middle", natLow: 50000, natHigh: 100000, rep: 75000 },
    { name: "Upper-middle", natLow: 100000, natHigh: 200000, rep: 150000 },
    { name: "Upper", natLow: 200000, natHigh: 500000, rep: 325000 },
    { name: "True wealth", natLow: 500000, natHigh: null, rep: 900000 },
  ];

  // Real local annual housing for a family of four (own w/ mortgage if available, else rent).
  const ownerAnnual = data.ownerCostMortgage ? data.ownerCostMortgage * 12 : null;
  const rentAnnual = data.grossRent ? data.grossRent * 12 * 1.25 : null; // 3-4BR ≈ 1.25x median unit
  const housing = ownerAnnual || rentAnnual || 24000 * col;

  // COL-weighted national family-of-four annual cost lines (2024 inflation-adjusted, modeled).
  const childcare = 16000 * col;        // two kids, part-time/after-school blended
  const transport = 12500 * col;        // two vehicles, fuel, insurance, maintenance
  const k12 = 4000 * col;               // public-school extras, supplies, activities
  const food = 15000 * col;             // family of four groceries + some dining
  const healthcare = 9000 * col;        // premiums + out-of-pocket, employer-sponsored
  const collegeSavings = 6000 * col;    // 529 contributions, two kids
  const staycation = 2500 * col;
  const domesticTrip = 5000 * col;
  const intlTrip = 12000 * col;
  const baseExpenses = housing + childcare + transport + k12 + food + healthcare + collegeSavings;

  const afterTax = (gross) => {
    // Rough blended federal+state+FICA effective rate, progressive by band.
    let rate;
    if (gross < 50000) rate = 0.14;
    else if (gross < 100000) rate = 0.2;
    else if (gross < 200000) rate = 0.27;
    else if (gross < 500000) rate = 0.34;
    else rate = 0.42;
    return gross * (1 - rate);
  };

  return {
    col, housing, baseExpenses,
    lines: { housing, childcare, transport, k12, food, healthcare, collegeSavings,
             staycation, domesticTrip, intlTrip },
    bands: bands.map((b) => {
      const localLow = b.natLow * col;
      const localHigh = b.natHigh != null ? b.natHigh * col : null;
      const net = afterTax(b.rep) - baseExpenses;
      // What's left after the base, and whether each vacation tier fits in that leftover.
      const afterStay = net - staycation;
      const afterDom = net - domesticTrip;
      const afterIntl = net - intlTrip;
      return {
        name: b.name, rep: b.rep, natLow: b.natLow, natHigh: b.natHigh,
        localLow, localHigh, net,
        canStaycation: afterStay >= 0, canDomestic: afterDom >= 0, canIntl: afterIntl >= 0,
      };
    }),
  };
}

// ============================================================
// INPUT ROUTING — one questionnaire, routed to the right engine.
// Age range and education multi-select feed BOTH the pricing model and the availability
// funnel, but differently: age population-weights to one optionality multiplier for pricing
// and sizes the pool for counting; education uses the HIGHEST selected level for pricing C
// and the COMBINED selected shares for counting. Race feeds only the funnel.
// ============================================================

// The five Census female age bands the snapshot stores.
const AGE_BANDS = [
  { lo: 18, hi: 24, key: "a18_24" },
  { lo: 25, hi: 29, key: "a25_29" },
  { lo: 30, hi: 34, key: "a30_34" },
  { lo: 35, hi: 39, key: "a35_39" },
  { lo: 40, hi: 49, key: "a40_49" },
  { lo: 50, hi: 65, key: "a50_64" },
];

// Map the five Census female age bands to the model's age-band optionality entries (by id).
const CENSUS_TO_MODEL_AGE = {
  a18_24: "ageUnder28",
  a25_29: "age28_33",
  a30_34: "age28_33",
  a35_39: "age34_38",
  a40_49: "age39_44",
  a50_64: "age45up",
};

// Collapse an age range to one {m, cLag} by population-weighting the bands it covers,
// using the center ZIP's real women-by-age counts. Falls back to even weight if no counts.
function ageRangeToBand(ageLo, ageHi, women) {
  let wm = 0, wc = 0, wsum = 0;
  for (const b of AGE_BANDS) {
    const span = b.hi - b.lo + 1;
    const ov = Math.max(0, Math.min(b.hi, ageHi) - Math.max(b.lo, ageLo) + 1);
    if (ov <= 0) continue;
    const count = women && women[b.key] != null ? women[b.key] : span; // even weight fallback
    const w = count * (ov / span);
    const band = AGEBAND_BY_ID[CENSUS_TO_MODEL_AGE[b.key]];
    wm += band.m * w; wc += band.cLag * w; wsum += w;
  }
  if (!wsum) return { m: 1.0, cLag: 1.0 };
  return { m: wm / wsum, cLag: wc / wsum };
}

// Education multi-select: highest selected level drives the model's C contribution.
function highestEdu(selected) {
  if (!selected || !selected.length) return null;
  let best = null, bestRank = -1;
  for (const e of selected) {
    const rec = EDU_BY_ID[e];
    if (rec && rec.rank > bestRank) { bestRank = rec.rank; best = e; }
  }
  return best;
}
// For the funnel: combined local share of the selected education levels. Census gives
// bachelor's-or-higher and associate's-degree shares per ZIP. The remainder is some-college
// and below. We sum the shares for whichever buckets the selection touches, keyed by the
// acsBucket tag on each record.
function eduSelectShare(selected, eduShareBplus, eduShareAssoc, eduShareGrad) {
  if (!selected || !selected.length || selected.includes("any")) return 1;
  const bplus = eduShareBplus != null ? eduShareBplus : 0.35;
  const grad = eduShareGrad != null ? eduShareGrad : 0.13;
  const assoc = eduShareAssoc != null ? eduShareAssoc : 0.08;
  const bucketShare = {
    grad,
    bachOnly: Math.max(0, bplus - grad), // bachelor's, no graduate degree
    assoc,
    sub: Math.max(0, 1 - bplus - assoc), // some college or less
  };
  const buckets = new Set();
  for (const id of selected) { const rec = EDU_BY_ID[id]; if (rec) buckets.add(rec.acsBucket); }
  let share = 0;
  for (const b of buckets) share += (bucketShare[b] || 0);
  return Math.max(0.02, Math.min(1, share || 1));
}


// ============================================================
// AVAILABILITY FUNNEL — how many qualifying women in a radius.
// Sums women in the chosen age range across every ZIP whose centroid is within the radius,
// then applies multiplicative funnel shares (race, single, desirability, education, kids-ok).
// Counts are modeled estimates: ACS publishes age, race, and marital separately, not as a
// single cross-tab, so race/single by age is a proportional combination, labeled as such.
// ============================================================

// great-circle distance in miles
function milesBetween(lat1, lon1, lat2, lon2) {
  const R = 3958.8, toRad = (x) => x * Math.PI / 180;
  const dLat = toRad(lat2 - lat1), dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

// National anchors for the B/C/M regime (single source of truth).
const NAT_MED_HH = 75000;     // national median household income (COL + market anchor)
const NAT_MALE_MED = 62000;   // national median male earnings (suitor-bar anchor)
const NAT_OBESITY = 0.40;     // national adult obesity (looks-scarcity anchor)
const UPKEEP_BASE = 12000;    // national annual beauty/wellness base (only non-harvest $)
const LIFESTYLE_BASE = 18000; // national annual discretionary base (only non-harvest $)

// Walk every harvested ZIP whose centroid is within `radius` miles of the center ZIP and
// return the radius aggregates the B/C/M regime needs. Rates/levels are population-weighted
// (the typical person in range); the male-earnings array is the weighted sample used to
// place her suitor bar. A bare metro point (explore table) passes through as a radius-of-one.
function radiusAggregate(ZIP_DATA, centerZip, radius) {
  const center = ZIP_DATA[centerZip];
  if (!center || !center.ll) return null;
  const [clat, clon] = center.ll;
  let incN = 0, incP = 0, obesN = 0, obesP = 0, rentN = 0, rentP = 0, mortN = 0, mortP = 0;
  const maleEarns = [];
  for (const z of Object.keys(ZIP_DATA)) {
    const d = ZIP_DATA[z];
    if (!d.ll || !d.pop) continue;
    if (milesBetween(clat, clon, d.ll[0], d.ll[1]) > radius) continue;
    if (d.medHHIncome != null) { incN += d.medHHIncome * d.pop; incP += d.pop; }
    if (d.obesity != null) { obesN += d.obesity * d.pop; obesP += d.pop; }
    if (d.grossRent != null) { rentN += d.grossRent * 12 * d.pop; rentP += d.pop; }
    if (d.ownerCostMortgage != null) { mortN += d.ownerCostMortgage * 12 * d.pop; mortP += d.pop; }
    if (d.maleMedEarn != null) { const reps = Math.max(1, Math.round(d.pop / 100)); for (let i = 0; i < reps; i++) maleEarns.push(d.maleMedEarn); }
  }
  if (!incP) return null;
  maleEarns.sort((a, b) => a - b);
  const radiusMedHH = incN / incP;
  const rent = rentP ? rentN / rentP : null;
  const mort = mortP ? mortN / mortP : null;
  const housing = (rent != null && mort != null) ? (rent + mort) / 2 : (rent != null ? rent : (mort != null ? mort : radiusMedHH * 0.28));
  return {
    medHH: radiusMedHH,
    col: radiusMedHH / NAT_MED_HH,
    obesity: obesP ? obesN / obesP : NAT_OBESITY,
    housingAnnual: housing,
    maleEarns,
  };
}

// women in [ageLo, ageHi] from the 5 stored bands, prorating partial overlap (no double count).
function womenInAgeRange(women, ageLo, ageHi) {
  if (!women) return 0;
  let total = 0;
  for (const b of AGE_BANDS) {
    const span = b.hi - b.lo + 1;
    const ov = Math.max(0, Math.min(b.hi, ageHi) - Math.max(b.lo, ageLo) + 1);
    if (ov > 0) total += (women[b.key] || 0) * (ov / span);
  }
  return total;
}

// Universal single-women 18-64 count for one ZIP record. Used anywhere single women
// are needed (availability denominator, metro column). Six stored bands cover 18-64
// exactly; single share = never-married + separated + divorced.
function singleWomen18to64(d) {
  if (!d || !d.women || !d.marital) return 0;
  const w = (d.women.a18_24 || 0) + (d.women.a25_29 || 0) + (d.women.a30_34 || 0) +
    (d.women.a35_39 || 0) + (d.women.a40_49 || 0) + (d.women.a50_64 || 0);
  return w * ((d.marital.neverMarried || 0) + (d.marital.separated || 0) + (d.marital.divorced || 0));
}

// share of women matching the chosen race selection(s). Accepts an array; "any" or empty = all.
function raceShare(race, sel) {
  if (!race || !race.total) return 1;
  const list = Array.isArray(sel) ? sel : [sel];
  if (!list.length || list.includes("any")) return 1;
  const t = race.total;
  // "other" on the front end combines Census "some other race" and "two or more races"
  const cell = { white: race.white, black: race.black, asian: race.asian, hispanic: race.hispanic,
    native: race.native, pacific: race.pacific, other: (race.other || 0) + (race.multi || 0) };
  let sum = 0;
  for (const s of list) if (cell[s] != null) sum += cell[s];
  return Math.max(0, Math.min(1, sum / t));
}

// Marital — funnel only (feeds singleShare off the ZIP marital record). id is the bucket the
// share function sums; label is display-only. Reads dataset field marital, keys unchanged.
const MARITAL_OPTS = [
  { id: "any",          label: "Any" },
  { id: "neverMarried", label: "Never married" },
  { id: "divorced",     label: "Divorced" },
  { id: "separated",    label: "Separated" },
];
// Race — funnel only (feeds raceShare off the ZIP race record). id matches the Census cell
// key; "other" combines Census "some other race" and "two or more races". label is display.
const RACE_OPTS = [
  { id: "any",      label: "Any" },
  { id: "white",    label: "White" },
  { id: "black",    label: "Black" },
  { id: "asian",    label: "Asian" },
  { id: "hispanic", label: "Hispanic" },
  { id: "native",   label: "Native American" },
  { id: "pacific",  label: "Pacific Islander" },
  { id: "other",    label: "Other / multiracial" },
];

// share of women in the chosen marital categories. Accepts an array of bucket ids.
// Empty selection falls back to the full single set (never married + divorced + separated).
function singleShare(marital, set) {
  if (!marital) return 0.55;
  const nm = marital.neverMarried || 0, sep = marital.separated || 0, div = marital.divorced || 0;
  const list = Array.isArray(set) ? set : [set];
  if (!list.length || list.includes("any")) return nm + sep + div;
  let s = 0;
  if (list.includes("neverMarried")) s += nm;
  if (list.includes("divorced")) s += div;
  if (list.includes("separated")) s += sep;
  return s;
}

// share of women in the chosen income bands. Accepts an array of income option ids,
// mapped to ACS bands via HERINCOME_BY_ID. "any"/empty = 1. The top three ids all map to
// p100, so picking any of them counts the same $100k+ ACS bracket (dedup via Set).
function incomeShare(bandsObj, sel) {
  if (!bandsObj) return 1;
  const list = Array.isArray(sel) ? sel : [sel];
  if (!list.length || list.includes("any")) return 1;
  const bands = new Set();
  for (const s of list) { const rec = HERINCOME_BY_ID[s]; if (rec && rec.acs) bands.add(rec.acs); }
  let sum = 0;
  for (const b of bands) sum += (bandsObj[b] || 0);
  return Math.max(0, Math.min(1, sum));
}

// desirability share: reuse the model's looks tier + local obesity to estimate the fit/attractive
// fraction. Tier sets the top-% of looks targeted (TIER_BY_ID); fitness tightens or loosens the
// local lean remainder (filterShare from FITNESS_BY_ID); obesity sets the lean base.
function desirabilityShare(tier, fitness, localObesity) {
  const lookTop = TIER_BY_ID[tier] != null ? TIER_BY_ID[tier].topShare : 0.3;
  // local lean share: 1 - obesity, clamped; fitness expectation tightens or loosens it
  const leanBase = Math.max(0.1, 1 - (localObesity != null ? localObesity : 0.41));
  // fitness may be a single id or an array of ids (multi-select); average the selected filters
  const list = Array.isArray(fitness) ? fitness.filter((f) => f && f !== "any") : (fitness ? [fitness] : []);
  let fitAdj = 1.0;
  if (list.length) {
    let s = 0, n = 0;
    for (const f of list) { const rec = FITNESS_BY_ID[f]; if (rec && rec.filterShare != null) { s += rec.filterShare; n++; } }
    if (n) fitAdj = s / n;
  }
  const leanShare = Math.max(0.03, Math.min(1, leanBase / fitAdj));
  return Math.max(0.005, Math.min(1, lookTop * leanShare));
}


// Run the funnel across all ZIPs within radius of the center ZIP.
function computeAvailability(ZIP_DATA, centerZip, opts) {
  const center = ZIP_DATA[centerZip];
  if (!center || !center.ll) return null;
  const [clat, clon] = center.ll;
  const { ageLo, ageHi, race, maritalSet, tier, fitness, eduSelected, kidsOk, incomeSet } = opts;

  let rawWomen = 0, zipsInRange = 0, popInRange = 0, singleWomenAll = 0, singleWomenInRange = 0;
  for (const z of Object.keys(ZIP_DATA)) {
    const d = ZIP_DATA[z];
    if (!d.ll) continue;
    if (milesBetween(clat, clon, d.ll[0], d.ll[1]) > opts.radius) continue;
    zipsInRange++;
    popInRange += d.pop || 0;
    rawWomen += womenInAgeRange(d.women, ageLo, ageHi);
    // every single woman of dating age (18-64) in this ZIP, via the universal helper
    singleWomenAll += singleWomen18to64(d);
    // single women specifically within the user's selected age range (isolates the age slider)
    const singleRate = d.marital ? ((d.marital.neverMarried || 0) + (d.marital.separated || 0) + (d.marital.divorced || 0)) : 0;
    singleWomenInRange += womenInAgeRange(d.women, ageLo, ageHi) * singleRate;
  }
  if (!zipsInRange) return null;

  // funnel shares — use the center ZIP's distributions as the representative local rates
  const rShare = raceShare(center.race, race);
  const sShare = singleShare(center.marital, maritalSet);
  const iShare = incomeShare(center.femIncome, incomeSet);
  const dShare = desirabilityShare(tier, fitness, center.obesity);
  const eShare = eduSelectShare(eduSelected, center.eduShareBplus, center.eduShareAssoc, center.eduShareGrad);
  // "kids ok": share of women open to a partner with children. Not in ACS; a modeled assumption
  // that tightens with her age (younger less open on average). Applied only if user has kids.
  const kShare = kidsOk ? 0.55 : 1;

  const afterAgeArea = rawWomen;
  const afterRace = afterAgeArea * rShare;
  const afterSingle = afterRace * sShare;
  const afterIncome = afterSingle * iShare;
  const afterDesire = afterIncome * dShare;
  const afterEdu = afterDesire * eShare;
  const afterKids = afterEdu * kShare;

  return {
    radius: opts.radius, zipsInRange, popInRange,
    singleWomenAll: Math.round(singleWomenAll),
    singleWomenInRange: Math.round(singleWomenInRange),
    rawWomen: Math.round(rawWomen),
    shares: { race: rShare, single: sShare, income: iShare, desire: dShare, edu: eShare, kids: kShare },
    steps: [
      { label: "Women in age range, in radius", n: Math.round(afterAgeArea) },
      { label: "Of chosen race/ethnicity", n: Math.round(afterRace) },
      { label: "Single (chosen marital set)", n: Math.round(afterSingle) },
      { label: "In the chosen income range", n: Math.round(afterIncome) },
      { label: "In the attractiveness and fitness tier", n: Math.round(afterDesire) },
      { label: "Meeting the education filter", n: Math.round(afterEdu) },
      { label: kidsOk ? "Open to a partner with children" : "No children filter applied", n: Math.round(afterKids) },
    ],
    final: Math.round(afterKids),
  };
}

function computeModel(data, inputs) {
  const { tier, fitness, network, herIncome, herEdu, mobility, herKids, ageBand, importB, pedigree, history,
          sorting, fatherhood, bmi, height, yourIncome, incomeGrowth, loverValue, friction } = inputs;

  // Neutral fallbacks so an unpicked dropdown doesn't break the math (the UI also
  // requires all picks before showing results, but the explore table runs early).

  // Multi-select normalization for PRICING. herIncome and fitness may arrive as arrays.
  // Income: average the selected incV (or the comfortable-middle if "any"/empty).
  // Fitness: average the selected look/cost multipliers, and pick a representative single
  // level (the middle of the selected set) for the bmi-fitness interaction.
  const incList = Array.isArray(herIncome) ? herIncome.filter((x) => x && x !== "any") : (herIncome && herIncome !== "any" ? [herIncome] : []);
  let incV;
  if (!incList.length) incV = 0.04;
  else { let s = 0, n = 0; for (const k of incList) { const rec = HERINCOME_BY_ID[k]; if (rec && rec.priceV != null) { s += rec.priceV; n++; } } incV = n ? s / n : 0.04; }

  const fitList = Array.isArray(fitness) ? fitness.filter((x) => x && x !== "any") : (fitness && fitness !== "any" ? [fitness] : []);
  let fit, fitnessRep;
  if (!fitList.length) { fit = { lookMult: 1.0, costMult: 1.1 }; fitnessRep = "fitAvg"; }
  else {
    let lm = 0, cm = 0, n = 0;
    for (const k of fitList) { const f = FITNESS_BY_ID[k]; if (f && f.lookMult != null) { lm += f.lookMult; cm += f.costMult; n++; } }
    fit = n ? { lookMult: lm / n, costMult: cm / n } : { lookMult: 1.0, costMult: 1.1 };
    // representative id for the BMI interaction: the one nearest the averaged lookMult
    fitnessRep = fitList.reduce((best, k) => {
      const f = FITNESS_BY_ID[k];
      if (!f || f.lookMult == null) return best;
      if (!best || Math.abs(f.lookMult - fit.lookMult) < Math.abs(FITNESS_BY_ID[best].lookMult - fit.lookMult)) return k;
      return best;
    }, null) || "fitAvg";
  }

  // Children may be multi-select (ids). Pricing rule: "No children" alone uses that value;
  // "any" or any mix that includes a children option uses the most common real case
  // (co-parent in town, tied to the area). Resolve to one representative id.
  const kidList = Array.isArray(herKids) ? herKids.filter((x) => x && x !== "any") : (herKids && herKids !== "any" ? [herKids] : []);
  let herKidsId;
  if (!kidList.length) herKidsId = "hkCoparent";
  else if (kidList.length === 1 && kidList[0] === "hkNone") herKidsId = "hkNone";
  else herKidsId = "hkCoparent";
  const impV = IMPORT_BY_ID[importB] != null ? IMPORT_BY_ID[importB].priceV : 0;

  // ===== B / C / M REGIME =====================================================
  // S = B x C x M. B is her lifestyle cost in real dollars (a clean sum, no modifier).
  // C is expectation: a weighted sum of grid levers, amplified by looks-scarcity.
  // M is optionality: a weighted sum of grid levers, scaled by suitor-scarcity.
  // All levers ride a 0-2.0 grid (1.0 neutral). Radius aggregates arrive on `data`
  // (radius pop-weighted COL/obesity/housing and the radius male-earnings array).
  const radMedHH = data.medHH;
  const col = data.col != null ? data.col : (radMedHH != null ? radMedHH / NAT_MED_HH : 1.0);
  const radObesity = data.obesity != null ? data.obesity : NAT_OBESITY;
  const housingAnnual = data.housingAnnual != null ? data.housingAnnual : (radMedHH != null ? radMedHH * 0.28 : 21000);
  const maleEarns = Array.isArray(data.maleEarns) ? data.maleEarns : null;

  // --- grid levers from her inputs (id -> 0-2.0 grid value) ---
  const TIER_GRID = { tierMagazine: 2.0, tierStriking: 1.6, tierAbove: 1.2, tierAttractive: 1.0, tierAverage: 0.9, tierBelow: 0.8 };
  const tierGrid = TIER_GRID[tier] != null ? TIER_GRID[tier] : 1.0;

  const CIRCLE_GRID = { netOldMoney: 2.0, netElite: 1.6, netPro: 1.2, netRegional: 1.0, netCommunity: 0.8 };
  const circleGrid = CIRCLE_GRID[network] != null ? CIRCLE_GRID[network] : 1.2;

  // age on the 5 real bands: arc value for C (expectation) and optionality value for M.
  const AGE_C_GRID = { ageUnder28: 1.6, age28_33: 1.6, age34_38: 0.9, age39_44: 0.7, age45up: 0.4 };
  const AGE_M_GRID = { ageUnder28: 1.8, age28_33: 1.4, age34_38: 1.1, age39_44: 0.9, age45up: 0.7 };
  const ageKey = inputs.ageOverride != null && inputs.ageOverride.id ? inputs.ageOverride.id : ageBand;
  const ageCGrid = AGE_C_GRID[ageKey] != null ? AGE_C_GRID[ageKey] : 1.1;
  const ageMGrid = AGE_M_GRID[ageKey] != null ? AGE_M_GRID[ageKey] : 1.1;

  // market lever: radius all-earner income vs national median, banded.
  const mr = radMedHH / NAT_MED_HH;
  const marketGrid = mr >= 1.5 ? 2.0 : mr >= 1.3 ? 1.7 : mr >= 1.15 ? 1.4 : mr >= 1.0 ? 1.2 : mr >= 0.85 ? 1.0 : mr >= 0.7 ? 0.9 : 0.8;

  // her income lever (multi-select averages; "any"/empty -> neutral-ish middle).
  const INCOME_GRID = { inc200plus: 1.6, inc150_199: 1.4, inc100_149: 1.3, inc75_99: 1.1, inc1_75: 0.9, incNone: 0.8 };
  let incomeGrid;
  if (!incList.length) incomeGrid = 1.1;
  else { let s = 0, n = 0; for (const k of incList) { if (INCOME_GRID[k] != null) { s += INCOME_GRID[k]; n++; } } incomeGrid = n ? s / n : 1.1; }

  // her education lever (highest selected drives it).
  const EDU_GRID = { eduGrad: 1.4, eduBach: 1.3, eduAssoc: 1.1, eduSome: 1.0, eduHS: 0.9 };
  const eduKey = inputs.eduOverride != null ? inputs.eduOverride : herEdu;
  const eduGrid = EDU_GRID[eduKey] != null ? EDU_GRID[eduKey] : 1.0;

  // mobility and kids levers for M.
  const MOB_GRID = { mobAnywhere: 1.8, mobRooted: 1.2, mobTied: 0.9 };
  const mobGrid = MOB_GRID[mobility] != null ? MOB_GRID[mobility] : 1.2;
  const KIDS_M_GRID = { hkNone: 1.4, hkRelocate: 1.2, hkOnline: 1.1, hkCoparent: 0.8 };
  const kidsMGrid = KIDS_M_GRID[herKidsId] != null ? KIDS_M_GRID[herKidsId] : 1.1;
  // kids lever for B's lifestyle line.
  const KIDS_B_GRID = { hkNone: 1.1, hkRelocate: 1.0, hkOnline: 1.0, hkCoparent: 0.9 };
  const kidsBGrid = KIDS_B_GRID[herKidsId] != null ? KIDS_B_GRID[herKidsId] : 1.0;

  // realized looks (kept for downstream / desirability), and the BMI x fitness cost interaction.
  const bf = bmiFitness(bmi, fitnessRep);
  const kidsLookHit = (herKidsId && herKidsId !== "hkNone") ? 0.95 : 1.0;
  const realizedTier = tierGrid * fit.lookMult * bf.look * kidsLookHit;

  // --- B: lifestyle cost in real dollars (clean sum, no modifier) ---
  const housing$ = housingAnnual * tierGrid;
  const upkeep$ = UPKEEP_BASE * col * bf.cost;
  const lifestyle$ = LIFESTYLE_BASE * col * tierGrid * kidsBGrid;
  const B = housing$ + upkeep$ + lifestyle$;

  // --- C: expectation = weighted sum x looks-scarcity ---
  const cSum = 0.4 * circleGrid + 0.2 * ageCGrid + 0.2 * marketGrid + 0.1 * incomeGrid + 0.1 * eduGrid;
  const obesRatio = radObesity / NAT_OBESITY;
  const looksScarcity = obesRatio >= 1.2 ? 1.8 : obesRatio >= 1.1 ? 1.5 : obesRatio >= 0.95 ? 1.2 : obesRatio >= 0.8 ? 1.0 : 0.8;
  const C = cSum * looksScarcity;

  // --- M: optionality = weighted sum x suitor-scarcity ---
  const mSum = 0.5 * mobGrid + 0.3 * kidsMGrid + 0.2 * ageMGrid;
  // suitor scarcity (optionality only): share of radius men clearing her C-implied bar,
  // times radius male-pool depth vs national. More qualifying men => more real exits.
  let suitorScarcity = 1.0;
  if (maleEarns && maleEarns.length) {
    const N = maleEarns.length;
    const pctVal = (p) => maleEarns[Math.max(0, Math.min(N - 1, Math.floor(N * p / 100)))];
    const reqPct = Math.max(20, Math.min(95, Math.round((C / 2.0) * 100)));
    const bar = pctVal(reqPct);
    let clearing = 0; for (let i = 0; i < N; i++) if (maleEarns[i] >= bar) clearing++;
    const shareClearing = clearing / N;
    const depth = pctVal(50) / NAT_MALE_MED;
    const idx = shareClearing * depth;
    suitorScarcity = idx >= 0.30 ? 1.4 : idx >= 0.22 ? 1.3 : idx >= 0.16 ? 1.2 : idx >= 0.11 ? 1.1 : idx >= 0.07 ? 1.0 : idx >= 0.04 ? 0.9 : 0.8;
  }
  const M = mSum * suitorScarcity;

  const S = B * C * M;

  // ===== V / F / K REGIME =====================================================
  // delivered = ( (Vp + Vl) ) x fatherMod x frictionMod, gated by import, vs S.
  // Vp is provision in real after-tax dollars above his own radius-scaled floor, plus his
  // inflation-discounted future lift, scaled by height. Vl is the relational lift (Vp x the
  // relational step, discounted by k). fatherMod and frictionMod are penalties on the 0.1
  // ruler: structural family load and general life-drag. Only his income is reported dollars;
  // everything else is a step on the ruler. No flat fatherhood dollar table, no FRICTION_MAX.

  // afterTax: his reported income at the real effective rate (federal brackets + FICA + state).
  const afterTax = yourIncome * afterTaxKept(yourIncome);

  // selfFloor: what he keeps to live at his own standard. Bottom = radius single-person COL
  // (radius median scaled toward a single adult), rising with his local income rank, capped
  // at his own after-tax income. Surplus above the floor is what he can deliver.
  const radiusMedian = radMedHH;
  const localPos = data.dist && data.dist.p20 != null
    ? (localPercentile(yourIncome, data.dist) || 50) / 100 : 0.5;   // local income rank 0-1
  const floorMultiple = 1.0 + localPos * 1.5;                        // 1.0x median .. ~2.5x top
  const selfFloor = radiusMedian * floorMultiple * afterTaxKept(yourIncome);
  const deliverableNow = Math.max(0, afterTax - selfFloor);

  // liftPV: his future income grown at his slider rate over a 5-yr horizon, after tax, then
  // discounted once by 2026 inflation weighted to his radius COL, softened 10% if income >=
  // 150k (high earners are less CPI-exposed). His slider is his full say on trajectory.
  const INFLATION_2026 = 0.032;                                      // published base
  const colWeight = radMedHH / NAT_MED_HH;                           // radius COL vs national
  const inflPenalty = yourIncome >= 150000 ? 0.9 : 1.0;              // high-earner softener
  const inflationRate = INFLATION_2026 * colWeight * inflPenalty;
  const fiveYrGross = yourIncome * (Math.pow(1 + incomeGrowth / 100, 5) - 1);
  const liftPV = (fiveYrGross * afterTaxKept(yourIncome)) / Math.pow(1 + inflationRate, 5);

  // k: relational discount, conditional on HER. Generational wealth is native to elite
  // circles (no demotion). Earned/some is a small demotion by default, larger only when she
  // sits where lineage is priced: she earns 200k+ or her circle is old-money/elite.
  const incHi = (Array.isArray(herIncome) ? herIncome : [herIncome]).includes("inc200plus");
  const circleHi = network === "netOldMoney" || network === "netElite";
  let k;
  if (pedigree === "pedGen") k = 1.0;
  else k = (incHi || circleHi) ? 0.8 : 0.9;

  // relationalMod: loverValue slider 100..0 by 10s. 100 -> 1.5, drops 0.2 per 10, floored at
  // 0.1, with 0 -> 0.01. Then k discounts the amplification above neutral.
  const relRaw = Math.max(0.1, 1.5 - ((100 - loverValue) / 10) * 0.2);
  const relGridRaw = loverValue <= 0 ? 0.01 : relRaw;
  const relationalMod = 1 + (relGridRaw - 1) * k;

  // height: documented male-preference multiplier (existing matrix).
  const heightMult = heightIncome(HEIGHT_TO_BAND(height), yourIncome);

  // Vp = provision, Vl = relational lift. Both real dollars off his provision base.
  const Vp = (deliverableNow + liftPV) * heightMult;
  const loverOffset = Vp * (relationalMod - 1);                      // relational lift in dollars
  const Vfull = Vp + loverOffset;                                    // Vp + Vl

  // fatherMod: structural family load as a step on the 0.1 ruler. Each row is another real,
  // citable burden (support guidelines, then travel, then conflict). Replaces a dollar table.
  const FATHER_STEP = { fhNone: 1.0, fhLocalJoint: 0.9, fhLocalSupport: 0.8, fhDistTravel: 0.7, fhDistHostile: 0.6 };
  const fatherMod = FATHER_STEP[fatherhood] != null ? FATHER_STEP[fatherhood] : 1.0;

  // frictionMod: general life-drag slider 0..100 by 10s. 0 -> 1.0, drops 0.1 per 10, 100 ->
  // 0.01 (never a hard zero). Master penalty on everything else he carries beyond family load.
  const frictionMod = friction >= 100 ? 0.01 : Math.max(0.01, 1.0 - friction / 100);

  // sorting still scales structural friction (out-of-type is a steeper climb). Applied as a
  // mild value penalty so it sits on the same delivered side.
  const sortMod = sorting === "sortOutType" ? (1 / 1.2) : 1.0;

  const delivered = Vfull * fatherMod * frictionMod * sortMod;
  const F = Vfull - delivered;                                       // implied drag, for display
  const margin = delivered - S;
  const clears = margin >= 0;
  const importLevel = impV;

  // Uncertainty band widens with conditions that make the estimate softer: very high
  // expectation, an unresolved import gate, high optionality, or a heavy family load.
  const softLoad =
    (C > 1.6 ? 1 : 0) + (importLevel > 0 ? 1 : 0) +
    (mSum >= 1.5 ? 1 : 0) + (fatherMod <= 0.7 ? 1 : 0);
  const bandPct = 0.18 + softLoad * 0.07;
  const sLow = S * (1 - bandPct), sHigh = S * (1 + bandPct);

  const pct = incomePercentile(yourIncome);
  const localPct = data.dist && data.dist.p20 != null ? localPercentile(yourIncome, data.dist) : null;
  const compPct = localPct != null ? localPct : pct;
  // entry percentile of her pool scales with her expectation C (now on its 0.58-3.3 range).
  // neutral C~1.2 -> ~p72; higher C lifts the bar. capped at 99.
  const entryPct = Math.min(99, Math.max(50, 60 + (C - 1.0) * 22));
  const inPool = compPct >= entryPct;

  // Income needed to ENTER her suitor pool: the local income at her entry percentile.
  const poolEntryIncome = data.dist && data.dist.p20 != null
    ? incomeAtPercentile(entryPct, data.dist) : null;

  // Gross needed to KEEP her: he must net BOTH her lifestyle cost S AND his own
  // after-tax cost of living (selfFloor) out of the same paycheck. Gross up the sum
  // so the after-tax amount covers her S in cash while he still funds his own life.
  const grossToKeep = grossFromAfterTax(S + selfFloor);
  // The binding requirement is the higher of: clearing her pool entry, or funding the keep.
  const totalToCompete = Math.max(grossToKeep, poolEntryIncome || 0);

  const grossGap = grossToKeep - yourIncome; // positive = deficit, negative = surplus
  let verdict, vClass;
  if (importLevel === 2) {
    if (grossGap <= 0) { verdict = "Funded today, you can afford her"; vClass = "fund"; }
    else { verdict = "Funded today, can't afford her"; vClass = "fund"; }
  }
  else if (!inPool) { verdict = "Priced out of her pool"; vClass = "below"; }
  else if (clears && margin > S * 0.25 && importLevel === 0) { verdict = "You can keep her"; vClass = "clear"; }
  else if (clears) { verdict = "Marginal — clears, but barely"; vClass = "marginal"; }
  else { verdict = "Below what it takes"; vClass = "below"; }

  // What percentile of local men earns enough to KEEP her (not just enter the pool).
  const keepPct = data.dist && data.dist.p20 != null ? localPercentile(grossToKeep, data.dist) : null;

  return {
    B, C, M, S, sLow, sHigh, Vp, loverOffset, F, delivered, margin, heightMult,
    clears, k, importLevel, bandPct, pct, verdict, vClass,
    grossToKeep, poolEntryIncome, totalToCompete, keepPct, grossGap,
    compPct, entryPct, inPool, localPct,
    maleMed: data.maleMed || null,
  };
}

// ---- Component ------------------------------------------------------------

// Registry of migrated single-select groups, keyed by their allQuestions label. Each new
// single-select migration adds one line here; the explainer resolver reads from this so no
// per-group branching is needed. (Income is multi-select and handled separately.)
const ID_SELECT_REGISTRY = {
  "How desirable is she locally": { byId: TIER_BY_ID, explain: TIER_EXPLAIN },
  "The money she interacts with regularly": { byId: NETWORK_BY_ID, explain: NETWORK_EXPLAIN },
  "How free she is to move": { byId: MOBILITY_BY_ID, explain: MOBILITY_EXPLAIN },
  "Is she all in?": { byId: IMPORT_BY_ID, explain: IMPORT_EXPLAIN },
  "Do you come from generational wealth": { byId: PEDIGREE_BY_ID, explain: PEDIGREE_EXPLAIN },
  "How her past reads": { byId: HISTORY_BY_ID, explain: HISTORY_EXPLAIN },
  "Are you her type?": { byId: SORTING_BY_ID, explain: SORTING_EXPLAIN },
  "Your children": { byId: FATHERHOOD_BY_ID, explain: FATHERHOOD_EXPLAIN },
};

// Registry of migrated multi-select groups, keyed by their allQuestions label. multiText is the
// fallback shown when more than one option is selected (no single explainer applies).
const ID_MULTI_REGISTRY = {
  "Her fitness": { byId: FITNESS_BY_ID, explain: FITNESS_EXPLAIN,
    multiText: "Her fitness raises both how she reads and the upkeep cost of her floor, and tightens the local pool of comparably fit women." },
  "What she earns": { byId: HERINCOME_BY_ID, explain: HERINCOME_EXPLAIN,
    multiText: "Her own income sets how much provision matters and how high her comparison set sits." },
  "Her children": { byId: HERKIDS_BY_ID, explain: HERKIDS_EXPLAIN,
    multiText: "Her children shape how anchored she is in place, which sets her reach to alternatives." },
  "Her BMI band": { byId: BMI_BY_ID, explain: BMI_EXPLAIN,
    multiText: "Averaging several BMI bands widens the body type you'd accept, which softens her looks-scarcity and lowers the price." },
};

const SECTIONS = [
  { id: "her", label: "Her market position", sub: "Sets the retention price S" },
  { id: "you", label: "Your delivered value", sub: "Sets your value V, considers friction F" },
  { id: "gate", label: "The gates", sub: "Is she all in, and where you stand" },
];

function RetentionCalculatorInner() {
  // Persist the user's entries across refreshes/returns. Loaded once here; written by an
  // effect below. The live-recompute is untouched — it still memoizes over these inputs.
  const SAVE_KEY = "rpm.inputs.v1";
  const saved = useRef((() => {
    try { return (typeof window !== "undefined" && JSON.parse(window.localStorage.getItem(SAVE_KEY))) || {}; }
    catch { return {}; }
  })()).current;
  const sv = (k, d) => (saved[k] !== undefined ? saved[k] : d);

  const [tier, setTier] = useState(() => sv("tier", ""));
  const [fitness, setFitness] = useState(() => sv("fitness", ["any"]));
  const [bmi, setBmi] = useState(() => sv("bmi", ["any"]));
  const [height, setHeight] = useState(() => sv("height", ""));
  const [network, setNetwork] = useState(() => sv("network", ""));
  const [herIncome, setHerIncome] = useState(() => sv("herIncome", ["any"]));
  const [herEdu, setHerEdu] = useState(() => sv("herEdu", ""));
  const [eduSelected, setEduSelected] = useState(() => sv("eduSelected", ["any"])); // checkboxes; "any" = neutral price + unfiltered count; else highest drives model, combo drives funnel
  const [mobility, setMobility] = useState(() => sv("mobility", ""));
  const [herKids, setHerKids] = useState(() => sv("herKids", ["any"]));
  const [ageBand, setAgeBand] = useState(() => sv("ageBand", ""));
  const [importB, setImportB] = useState(() => sv("importB", ""));
  const [pedigree, setPedigree] = useState(() => sv("pedigree", ""));
  const [history, setHistory] = useState(() => sv("history", ""));
  const [sorting, setSorting] = useState(() => sv("sorting", ""));
  const [fatherhood, setFatherhood] = useState(() => sv("fatherhood", ""));

  const [yourIncome, setYourIncome] = useState(() => sv("yourIncome", 200000));
  const [incomeGrowth, setIncomeGrowth] = useState(() => sv("incomeGrowth", 5)); // % expected annual income growth
  const [loverValue, setLoverValue] = useState(() => sv("loverValue", 100)); // Relational value, 0-100 step 10
  const [friction, setFriction] = useState(() => sv("friction", 0)); // Friction she absorbs, 0-100 step 10

  const [openSecs, setOpenSecs] = useState(["her"]);
  const isOpen = (id) => openSecs.includes(id);
  const toggleSec = (id) => setOpenSecs((cur) => cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]);
  const [calcExpanded, setCalcExpanded] = useState(false); // when results show, calc collapses unless user reopens
  const [explainOpen, setExplainOpen] = useState(false);
  const [formulaOpen, setFormulaOpen] = useState(false);
  const [disclaimOpen, setDisclaimOpen] = useState(false);
  const [footerOpen, setFooterOpen] = useState(false);
  const [matchesOpen, setMatchesOpen] = useState(false);
  const [oliveTheme, setOliveTheme] = useState(() => sv("oliveTheme", true));
  const [activeExplain, setActiveExplain] = useState(null); // label of the most recently changed question
  const [explainVisible, setExplainVisible] = useState(true); // drives the fade out/in on change
  const [confirmReset, setConfirmReset] = useState(false); // centered "start over" confirm modal
  const [explainerOpen, setExplainerOpen] = useState(false); // expandable explainer card beside the accordion once results show

  // ---- federal data (bundled snapshot) ----
  const [targetZip, setTargetZip] = useState(() => sv("targetZip", ""));
  const [live, setLive] = useState(() => sv("live", null)); // { medHHIncome, eduShareBplus, obesity, label }
  // availability funnel inputs
  const [availRace, setAvailRace] = useState(() => sv("availRace", ["any"]));
  const [availMarital, setAvailMarital] = useState(() => sv("availMarital", ["any"]));
  const [ageLo, setAgeLo] = useState(() => sv("ageLo", 18));
  const [ageHi, setAgeHi] = useState(() => sv("ageHi", 65));
  const [ageTouched, setAgeTouched] = useState(() => sv("ageTouched", false));
  const [radiusMi, setRadiusMi] = useState(() => sv("radiusMi", 50));
  const [liveStatus, setLiveStatus] = useState(() => (sv("live", null) ? "ok" : "idle")); // idle|ok|error
  const [liveMsg, setLiveMsg] = useState(() => { const L = sv("live", null); return L && L.label ? "Loaded ZIP " + L.label : ""; });

  const fetchLive = useCallback(() => {
    const z = targetZip.trim();
    if (!/^\d{5}$/.test(z)) {
      setLiveStatus("error"); setLiveMsg("Enter a 5-digit ZIP."); return;
    }
    const data = lookupZip(z);
    if (!data || data.medHHIncome == null) {
      setLiveStatus("error");
      setLiveMsg("No data for ZIP " + z + ". Some ZIPs aren't tabulated by the Census. Try a nearby ZIP.");
      setLive(null);
      return;
    }
    setLive({ ...data, label: z });
    setLiveStatus("ok");
    setLiveMsg("Loaded ZIP " + z);
  }, [targetZip]);

  // Save every entry so a refresh or return preserves the user's work.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(SAVE_KEY, JSON.stringify({
        tier, fitness, bmi, height, network, herIncome, herEdu, eduSelected, mobility,
        herKids, ageBand, importB, pedigree, history, sorting, fatherhood,
        yourIncome, incomeGrowth, loverValue, friction, oliveTheme,
        targetZip, live, availRace, availMarital, ageLo, ageHi, ageTouched, radiusMi,
      }));
    } catch {}
  }, [tier, fitness, bmi, height, network, herIncome, herEdu, eduSelected, mobility,
      herKids, ageBand, importB, pedigree, history, sorting, fatherhood,
      yourIncome, incomeGrowth, loverValue, friction, oliveTheme,
      targetZip, live, availRace, availMarital, ageLo, ageHi, ageTouched, radiusMi]);

  // Start over: clear the saved entries and reset every input to its default.
  const resetAll = useCallback(() => {
    try { if (typeof window !== "undefined") window.localStorage.removeItem(SAVE_KEY); } catch {}
    setTier(""); setFitness(["any"]); setBmi(["any"]); setHeight(""); setNetwork("");
    setHerIncome(["any"]); setHerEdu(""); setEduSelected(["any"]); setMobility(""); setHerKids(["any"]);
    setAgeBand(""); setImportB(""); setPedigree(""); setHistory(""); setSorting(""); setFatherhood("");
    setYourIncome(200000); setIncomeGrowth(5); setLoverValue(100); setFriction(0);
    setTargetZip(""); setLive(null); setAvailRace(["any"]); setAvailMarital(["any"]);
    setAgeLo(18); setAgeHi(65); setAgeTouched(false); setRadiusMi(50);
    setLiveStatus("idle"); setLiveMsg(""); setCalcExpanded(false); setActiveExplain(null);
    setOpenSecs(["her"]);
    setConfirmReset(false);
  }, []);


  // Route the new questionnaire controls to the model. Age range -> population-weighted
  // optionality (ageOverride). Education checkboxes -> highest level for pricing (eduOverride).
  // herEdu / ageBand strings are kept in sync so the gate, stack, and Explore keep working.
  const modelHighestEdu = highestEdu(eduSelected);
  const ageOverride = live ? ageRangeToBand(ageLo, ageHi, live.women) : null;

  useEffect(() => {
    if (modelHighestEdu && modelHighestEdu !== herEdu) setHerEdu(modelHighestEdu);
  }, [modelHighestEdu]);
  useEffect(() => {
    // mark age as "picked" for the gate once a range exists (always true), using a stable token.
    if (!ageBand) setAgeBand("__range__");
  }, [ageBand]);

  const resultsShowing = useRef(false);
  const inputs = useMemo(() => ({ tier, fitness, network, herIncome, herEdu, mobility, herKids, ageBand, importB, pedigree,
    history, sorting, fatherhood, bmi, height, yourIncome, incomeGrowth, loverValue, friction,
    ageOverride, eduOverride: modelHighestEdu }),
    [tier, fitness, network, herIncome, herEdu, mobility, herKids, ageBand, importB, pedigree,
    history, sorting, fatherhood, bmi, height, yourIncome, incomeGrowth, loverValue, friction,
    ageOverride, modelHighestEdu]);

  // Primary result computes once a ZIP has been pulled AND every dropdown is picked.
  const allPicked = tier && fitness && network && herIncome && eduSelected.length && mobility && herKids && ageBand &&
    importB && pedigree && history && sorting && fatherhood && bmi.length && height;
  const r = useMemo(() => {
    if (!live || !live.medHHIncome || !allPicked) return null;
    // Radius aggregate (pop-weighted COL/obesity/housing + male-earnings sample) drives B/C/M.
    const agg = (targetZip && ZIP_DATA[targetZip]) ? radiusAggregate(ZIP_DATA, targetZip, radiusMi) : null;
    const data = agg
      ? { medHH: agg.medHH, col: agg.col, obesity: agg.obesity, housingAnnual: agg.housingAnnual, maleEarns: agg.maleEarns, dist: live.dist }
      : { medHH: live.medHHIncome, dist: live.dist };
    return computeModel(data, inputs);
  }, [live, allPicked, inputs, targetZip, radiusMi]);

  // When results first appear (calc auto-collapses), bring the user to the top so they land
  // on the verdict instead of staying scrolled at the bottom of the inputs.
  useEffect(() => {
    const showing = !!r && !calcExpanded;
    if (showing && !resultsShowing.current) {
      setOpenSecs([]); // collapse all three accordion sections when results first appear
      if (typeof window !== "undefined" && window.scrollTo) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
    resultsShowing.current = showing;
  }, [r, calcExpanded]);

  const ladder = useMemo(() => {
    if (!live || !live.medHHIncome) return null;
    return classLadder({
      medHH: live.medHHIncome,
      ownerCostMortgage: live.ownerCostMortgage,
      grossRent: live.grossRent,
      homeValue: live.homeValue,
    });
  }, [live]);

  const availability = useMemo(() => {
    if (!live || !targetZip || !ZIP_DATA[targetZip]) return null;
    return computeAvailability(ZIP_DATA, targetZip, {
      ageLo, ageHi, radius: radiusMi,
      race: availRace, maritalSet: availMarital,
      tier, fitness, eduSelected, incomeSet: herIncome,
      kidsOk: FATHERHOOD_BY_ID[fatherhood] ? FATHERHOOD_BY_ID[fatherhood].kidsOk : false,
    });
  }, [live, targetZip, ageLo, ageHi, radiusMi, availRace, availMarital, tier, fitness, eduSelected, herIncome, fatherhood]);

  // Of the potential matches, how many are likely both attracted to him AND would commit.
  // Two graduated gates built only from quantities the model already computes (no new
  // free constants — both spreads ride the model's existing uncertainty band, bandPct):
  //   attracted  = his local-male income percentile (compPct) vs her suitor-pool entry bar
  //                (entryPct), softened over bandPct expressed in percentile points.
  //   commits    = his delivered-value surplus over her price (margin / S), centered at the
  //                break-even and softened over the same relative band.
  const mutual = useMemo(() => {
    if (!availability || !r) return null;
    const sigmoid = (x) => 1 / (1 + Math.exp(-x));
    const spreadPts = Math.max(6, r.bandPct * 100);
    const attractShare = Math.max(0, Math.min(1, sigmoid((r.compPct - r.entryPct) / spreadPts)));
    const commitShare = Math.max(0, Math.min(1, sigmoid((r.margin / r.S) / r.bandPct)));
    const realistic = Math.round(availability.final * attractShare * commitShare);
    return { attractShare, commitShare, realistic };
  }, [availability, r]);

  // Explore: run the same profile across every candidate metro, rank by single women
  // 18-64 (the once-a-year harvested count), and slice to the displayed top 40. Starting
  // from a 100-metro pool guarantees the displayed 40 are the true top 40.
  const exploreRows = useMemo(() => {
    return Object.entries(METRO_DATA).map(([name, d]) => {
      const res = computeModel(
        { medHH: d.medHH, dist: { p20: d.p20, p40: d.p40, p60: d.p60, p80: d.p80, p95: d.p95 } },
        inputs
      );
      const singleWomen = (d.singleWomen != null ? d.singleWomen : METRO_SINGLE_WOMEN[name]) || 0;
      return { name, medHH: d.medHH, S: res.S, compPct: res.compPct, entryPct: res.entryPct, inPool: res.inPool, vClass: res.vClass, grossGap: res.grossGap, singleWomen };
    }).sort((a, b) => b.singleWomen - a.singleWomen || b.S - a.S).slice(0, 40);
  }, [inputs]);

  // Running explainer stack: one entry per dropdown the user has picked, in calculator order.
  const eduStackText = !eduSelected.length
    ? null
    : eduSelected.includes("any")
    ? "Any education: pricing applies a neutral expectation nudge, and the availability count includes every education level."
    : "Pricing uses the highest level selected (" + (EDU_BY_ID[modelHighestEdu] ? EDU_BY_ID[modelHighestEdu].label : "") + "); the availability count uses all "
      + eduSelected.length + " selected. More schooling tends to raise her expectations of a partner.";
  const ageStackText = "Her age range " + ageLo + " to " + ageHi + ". Pricing population-weights this range into one optionality multiplier; the count uses it to size the age pool.";
  // Full question list with current choices, BEFORE filtering. Tracking must see every
  // question (even unanswered ones) so a first-time answer registers as a change. The
  // rendered stack is the filtered subset (only answered questions with explainer text).
  const allQuestions = [
    ["How desirable is she locally", tier, "B"],
    ["Her fitness", fitness, "B"],
    ["Her BMI band", bmi, "B"],
    ["The money she interacts with regularly", network, "C"],
    ["What she earns", herIncome, "C"],
    ["Her education", eduSelected.length ? eduSelected.map((id) => EDU_BY_ID[id] ? EDU_BY_ID[id].label : id) : "", "C"],    ["How free she is to move", mobility, "M"],
    ["Her children", herKids, "M"],
    ["Her age range", ageTouched ? (ageLo + " to " + ageHi) : "", "M"],
    ["Is she all in?", importB, "gate"],
    ["Do you come from generational wealth", pedigree, "k"],
    ["How her past reads", history, "k"],
    ["Are you her type?", sorting, "F"],
    ["Your children", fatherhood, "F"],
    ["Your height", height, "V"],
  ].map(([label, v, vr]) => {
    // Migrated multi-selects stored as ids: resolve labels + explainer via the registry.
    if (ID_MULTI_REGISTRY[label]) {
      const { byId, explain, multiText } = ID_MULTI_REGISTRY[label];
      const ids = Array.isArray(v) ? v.filter((x) => x && x !== "any") : [];
      const labels = ids.map((id) => (byId[id] ? byId[id].label : id));
      const text = ids.length === 1 ? explain[ids[0]] : (ids.length ? multiText : null);
      return { label, choice: labels.length ? labels : null, text, vr };
    }
    // Migrated single-selects stored as ids: resolve label + explainer by id via the registry.
    if (ID_SELECT_REGISTRY[label]) {
      const { byId, explain } = ID_SELECT_REGISTRY[label];
      const rec = byId[v];
      return { label, choice: rec ? rec.label : null, text: rec ? explain[v] : null, vr };
    }
    return {
      label, choice: v,
      text: label === "Her education" ? eduStackText : label === "Her age range" ? ageStackText
        : (EXPLAIN[v] || (label === "Your height" ? heightExplain(v) : null)),
      vr,
    };
  });
  const stack = allQuestions.filter((s) => s.choice && s.text);

  // Track which question changed most recently so only its explainer shows. Signatures cover
  // ALL questions, so going from empty to a value counts as a change no matter the order picked.
  const prevChoices = useRef(null);
  useEffect(() => {
    const cur = {};
    for (const s of allQuestions) cur[s.label] = JSON.stringify(s.choice);
    const prev = prevChoices.current;
    prevChoices.current = cur;
    if (prev === null) return; // first render: seed only, don't flash
    let changed = null;
    for (const s of allQuestions) {
      if (prev[s.label] !== cur[s.label]) changed = s.label; // last change in list order wins
    }
    if (!changed) return;
    // only surface it if that question now has a renderable card
    const card = stack.find((s) => s.label === changed);
    if (!card) return;
    setActiveExplain(changed);
    setExplainVisible(false);
    const t = setTimeout(() => setExplainVisible(true), 140);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allQuestions.map((s) => JSON.stringify(s.choice)).join("|")]);

  // Active card: the last-touched question, or fall back to the most recent answered one.
  const activeCard = stack.find((s) => s.label === activeExplain) || stack[stack.length - 1] || null;

  return (
    <div style={S_.wrap} className={"rpm-app" + (oliveTheme ? " rpm-olive" : "")}>
      <style>{CSS}</style>

      {confirmReset && (
        <div
          onClick={() => setConfirmReset(false)}
          role="dialog" aria-modal="true" aria-label="Start over"
          style={{ position: "fixed", inset: 0, background: "rgba(22,24,29,0.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ background: "var(--surface)", border: `2px solid ${INK}`, boxShadow: "0 18px 50px rgba(22,24,29,0.32)", padding: "26px 28px", maxWidth: 420, width: "100%" }}
          >
            <div style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 400, color: INK, letterSpacing: "-0.01em" }}>Start over?</div>
            <div style={{ fontSize: 13.5, color: "var(--warm1)", lineHeight: 1.55, marginTop: 8 }}>
              This clears every entry — her profile, your numbers, and the ZIP and market settings —
              and resets the calculator to a blank slate. This can't be undone.
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 24 }}>
              <button
                onClick={() => setConfirmReset(false)}
                style={{ padding: "10px 18px", border: `1px solid ${LINE}`, background: "none", color: INK, cursor: "pointer", fontFamily: "inherit", fontWeight: 600, fontSize: 13 }}
              >Cancel</button>
              <button
                onClick={resetAll}
                style={{ padding: "10px 18px", border: `1px solid ${INK}`, background: INK, color: "#fff", cursor: "pointer", fontFamily: "inherit", fontWeight: 600, fontSize: 13 }}
              >Start over</button>
            </div>
          </div>
        </div>
      )}

      <header style={S_.header}>
        <div style={S_.headerInner}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
            <svg width="60" height="60" viewBox="0 -960 960 960" style={{ display: "block", flex: "0 0 auto" }} aria-hidden="true">
              <path fill="var(--ink)" d="M160-240v-320 13-173 480ZM160-640h640v-80H160v80Zm303 480H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v213q-35-25-76.5-39T716-560q-57 0-107.5 21.5T520-480H160v240h279q3 21 9 41t15 39Z" />
              <path fill="var(--accent)" d="M716-140L576-280q-13-13-18.5-28t-5.5-30q0-32 23-57t59-25q28 0 44 13t38 35q20-20 36.5-34t45.5-14q37 0 59.5 25.5T880-337q0 15-6 30t-18 27L716-140Z" />
            </svg>
            <div>
              <h1 style={S_.h1} className="rpm-h1">So You Want A High-Status Woman?</h1>
              <div style={{ ...S_.subtitle, marginTop: 3 }} className="rpm-subtitle">Here is what it takes to attract her / keep her</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }} className="rpm-formula">
            <div style={{ ...S_.eyebrow, marginBottom: 0 }}>A MALE DELUSION CALCULATOR</div>
            <div style={S_.formula}>
              <span style={S_.eqVar}>S = B × C × M</span>
              <svg style={S_.eqArrow} width="20" height="13" viewBox="0 0 24 16" fill="none" stroke={ACCENT} strokeWidth="1.22" strokeLinecap="round" strokeLinejoin="round" aria-label="if and only if">
                <line x1="5" y1="6.4" x2="19" y2="6.4" />
                <line x1="5" y1="9.6" x2="19" y2="9.6" />
                <polyline points="7.5 4 4 8 7.5 12" />
                <polyline points="16.5 4 20 8 16.5 12" />
              </svg>
              <span style={S_.eqVar}>(V<sub>p</sub> + V<sub>ℓ</sub>·k) − F ≥ S</span>
            </div>
          </div>
        </div>
        </div>
      </header>

      <div style={S_.grid} className="rpm-grid">
        {/* INPUT COLUMN */}
        <div style={{ ...S_.col, ...(r ? { gridColumn: "1 / -1" } : {}) }}>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
            <button onClick={() => setConfirmReset(true)} style={{ ...S_.collapseLink, gap: 6 }} title="Clear all entries and start over" aria-label="Start over">
              <span className="material-symbols-outlined" style={{ fontSize: 15, color: ACCENT, display: "block" }} aria-hidden="true">restart_alt</span>
              Start over
            </button>
          </div>
          <div style={r ? S_.resultRow : undefined} className={r ? "rpm-resultrow" : undefined}>
            <div style={S_.col}>
          {SECTIONS.map((sec) => (
            <div key={sec.id} style={S_.accordion}>
              <button
                onClick={() => toggleSec(sec.id)}
                style={{ ...S_.accBtn, borderBottom: isOpen(sec.id) ? `1px solid ${LINE}` : "1px solid transparent", background: isOpen(sec.id) ? "var(--surface)" : "none" }}
              >
                <span>
                  <span style={S_.accLabel}>{sec.label}</span>
                  <span style={S_.accSub}>{sec.sub}</span>
                </span>
                <span style={S_.chev}>{isOpen(sec.id) ? "−" : "+"}</span>
              </button>

              {isOpen(sec.id) && sec.id === "her" && (
                <div style={S_.accBody}>
                  <div style={S_.liveBox}>
                    <div style={S_.liveTitle}>Federal data by ZIP</div>
                    <div style={S_.liveRow}>
                      <input
                        placeholder="Target ZIP (where you'd meet her)"
                        value={targetZip}
                        onChange={(e) => setTargetZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
                        onKeyDown={(e) => { if (e.key === "Enter") fetchLive(); }}
                        style={S_.liveInput}
                      />
                      <button onClick={fetchLive} style={S_.liveBtn}>Load</button>
                    </div>
                    {liveMsg && (
                      <div style={{ ...S_.liveMsg, color: liveStatus === "ok" ? "#1a6b4a" : liveStatus === "error" ? ACCENT : "var(--warm1)" }}>
                        {liveMsg}
                      </div>
                    )}
                    {live && live.medHHIncome && (
                      <div style={S_.liveStats}>
                        <div style={S_.liveStatBox}>
                          <div style={S_.liveStatNum}>{FMT(live.medHHIncome)}</div>
                          <div style={S_.liveStatLbl}>Median HH income</div>
                        </div>
                        <div style={S_.liveStatBox}>
                          <div style={S_.liveStatNum}>{live.obesity != null ? Math.round(live.obesity * 100) + "%" : "—"}</div>
                          <div style={S_.liveStatLbl}>Adult obesity</div>
                        </div>
                        <div style={S_.liveStatBox}>
                          <div style={S_.liveStatNum}>{live.eduShareBplus != null ? Math.round(live.eduShareBplus * 100) + "%" : "—"}</div>
                          <div style={S_.liveStatLbl}>Bachelor's+</div>
                        </div>
                      </div>
                    )}
                    {!(live && live.medHHIncome) && (
                    <div style={S_.liveHint}>
                      Enter the ZIP where you'd meet her. Pulls real ACS income, education, and
                      housing for that ZIP plus CDC obesity for its county, from bundled US Census
                      and CDC data. No account needed.
                    </div>
                    )}
                    {live && (
                      <div style={{ marginTop: 12 }}>
                        <Field label="Search radius" hint="Distance from your ZIP. The availability count sums every ZIP whose center falls inside this radius. Dating apps commonly cap around this range.">
                          <Range v={radiusMi} set={setRadiusMi} min={10} max={250} step={5} unit=" mi" />
                        </Field>
                      </div>
                    )}
                  </div>
                  {live && (
                    <>
                      <Field label="Her race or ethnicity">
                        <Checks opts={RACE_OPTS} selected={availRace} setSelected={setAvailRace} />
                      </Field>
                      <Field label="Relationship status">
                        <Checks opts={MARITAL_OPTS} selected={availMarital} setSelected={setAvailMarital} />
                      </Field>
                    </>
                  )}
                  <Field label="How desirable is she locally" hint="Her visual appeal ranked against other women in the local dating economy.">
                    <Sel v={tier} set={setTier} opts={TIER_OPTS} />
                  </Field>
                  <Field label="Her fitness level" hint="Fitness contextualizes her looks. This raises how attractive she reads in the dating economy and adds real upkeep costs like fitness regimens, studios, trainers, wellness spas, recovery, diet, and other procedures.">
                    <Checks opts={FITNESS_OPTS} selected={fitness} setSelected={setFitness} />
                  </Field>
                  <Field label="Her BMI band" hint="BMI interacts with fitness. Low BMI plus high fitness enhances both her looks and her upkeep cost. High BMI plus low fitness compounds the penalty. Pick several to widen your range, or Any if her body type is open.">
                    <Checks opts={["any", ...BMI_BANDS]} selected={bmi} setSelected={setBmi} />
                  </Field>
                  <Field label="The money she interacts with regularly" hint="The biggest driver of her price. Look at the career paths of her exes and the partners of her five closest friends.">
                    <Sel v={network} set={setNetwork} opts={NETWORK_OPTS} />
                  </Field>
                  <Field label="What she earns herself" hint="Single women will use their own income as the floor for a partner's income expectations with significant attraction preference going to higher earners. Professional women might also create a rough calculation about what it will take for a partner to maintain his status and absorb her current or increased lifestyle costs as a couple along with the cost of having children. This becomes more extreme if she expects to stay at home with the children.">
                    <Checks opts={HERINCOME_OPTS} selected={herIncome} setSelected={setHerIncome} />
                  </Field>
                  <Field label="Her education" hint="Tap any that apply. More schooling tends to come with higher expectations of a partner.">
                    <Checks opts={EDU_OPTS} selected={eduSelected} setSelected={setEduSelected} />
                  </Field>
                  <Field label="How free she is to move" hint="How many options she can reach beyond where she lives.">
                    <Sel v={mobility} set={setMobility} opts={MOBILITY_OPTS} />
                  </Field>
                  <Field label="Does she have children?" hint="Her kids and where their other parent lives shape how freely she can pursue other options.">
                    <Checks opts={HERKIDS_OPTS} selected={herKids} setSelected={setHerKids} />
                  </Field>
                  <Field label="Her age range" hint="Sets her optionality for pricing (population-weighted across the range) and the age pool for the availability count. Snaps to Census bands; partial bands are prorated.">
                    <RangeDual lo={ageLo} hi={ageHi} setLo={(x) => { setAgeLo(x); setAgeTouched(true); }} setHi={(x) => { setAgeHi(x); setAgeTouched(true); }} min={18} max={65} step={1} />
                  </Field>
                </div>
              )}

              {isOpen(sec.id) && sec.id === "you" && (
                <div style={S_.accBody}>
                  <Field label="Your gross annual income" hint={`≈ ${incomePercentile(yourIncome).toFixed(1)}th percentile among US individual earners`}>
                    <Num v={yourIncome} set={setYourIncome} step={25000} min={0} max={5000000} />
                  </Field>
                  <Field label="Your height" hint="A documented preference variable for men. Height and income trade off, so the shorter you are, the more income it takes to land the same.">
                    <Sel v={height} set={setHeight} opts={HEIGHT_PICK} />
                  </Field>
                  <Field label="Expected annual income growth" hint="The rate your income is climbing. She prices your trajectory, not just today's number.">
                    <Range v={incomeGrowth} set={setIncomeGrowth} min={0} max={30} step={1} unit="%" />
                  </Field>
                  <Field label="Relational value you deliver" hint={RELATIONAL_TEXT(loverValue)}>
                    <Range v={loverValue} set={setLoverValue} min={0} max={100} step={10} />
                  </Field>
                  <Field label="Do you have children?" hint="Your fatherhood structure is the biggest friction a partner has to absorb. This sets most of it.">
                    <Sel v={fatherhood} set={setFatherhood} opts={FATHERHOOD_OPTS} />
                  </Field>
                  <Field label="Do you have other frictions in your life that might make dating difficult?" hint={FRICTION_TEXT(friction)}>
                    <Range v={friction} set={setFriction} min={0} max={100} step={10} />
                  </Field>
                </div>
              )}

              {isOpen(sec.id) && sec.id === "gate" && (
                <div style={S_.accBody}>
                  <Field label="Is she all in?" hint="The make-or-break gate. If she's sourcing attention or money elsewhere, your money is funding her, not keeping her.">
                    <Sel v={importB} set={setImportB} opts={IMPORT_OPTS} />
                  </Field>
                  <Field label="Do you come from generational wealth" hint="In a world where safety is code for wealth and financial independence, generational wealth is a premium on top of high wage earnings or entrepreneurialism.">
                    <Sel v={pedigree} set={setPedigree} opts={PEDIGREE_OPTS} />
                  </Field>
                  <Field label="How her past affects long-term value" hint="Only matters for something serious. The louder her options are part of her image, the more it counts against the wife-tier read.">
                    <Sel v={history} set={setHistory} opts={HISTORY_OPTS} />
                  </Field>
                  <Field label="Are you her usual type?" hint="Does she give all types of men a chance or does she stick with a type? As high as 80% of marriages stick to general archetypes and met expectations in a partner.">
                    <Sel v={sorting} set={setSorting} opts={SORTING_OPTS} />
                  </Field>
                </div>
              )}
            </div>
          ))}
            </div>
            {r && (
              <div style={S_.col}>
                <div style={S_.empty}>
                  <div style={S_.emptyHead}>
                    <div style={{ ...S_.emptyTitle, fontSize: 16 }}>Our datasets</div>
                  </div>
                  <div style={S_.emptyText}>
                    Her market is built from real federal data, not estimates: Census ACS 5-year income,
                    earnings, education, and age (2023), CDC PLACES adult obesity (2024), and the national
                    income distribution (2024–25) along with public dating app studies and survey results.
                    We harvest this data for every U.S. ZIP code annually and we refresh that snapshot on a
                    yearly cycle as new federal data publishes.
                  </div>
                </div>
                <div style={S_.exCard}>
                  <button
                    onClick={() => setExplainerOpen((v) => !v)}
                    style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: 0, textAlign: "left" }}
                    aria-expanded={explainerOpen}
                  >
                    <span style={S_.exCardLabel}>Data sources and outcomes</span>
                    <span style={S_.chev}>{explainerOpen ? "−" : "+"}</span>
                  </button>
                  {explainerOpen && (
                    <div style={{ ...S_.disclaim, marginTop: 10 }}>
                      The upkeep floor, the comparison nudge, the fitness-scarcity pressure, and your
                      income rank are anchored to real federal data for her ZIP: Census ACS county income
                      and earnings (2023), CDC PLACES obesity (2024), and the national income
                      distribution (2024–25). The money she interacts with regularly, her mobility, whether she's all in,
                      and her history are things only you can read, and they carry the wider range shown
                      on the right. Read this as a wake-up call, not a scoreboard. Modern hypergamy is real
                      and well-documented, with social media, reality television, and dating apps driving
                      expectations higher and placing more high-status men in front of her than any
                      generation in history. Pretending otherwise is how men get blindsided. The
                      only thing that moves your odds is becoming the man the number says you need to be.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* OUTPUT COLUMN */}
        <div style={{ ...S_.col, ...(r && !calcExpanded ? { gridColumn: "1 / -1" } : {}) }}>
          {!r ? (
            <>
              <div style={S_.empty}>
                <div style={S_.emptyHead}>
                  <div style={S_.emptyTitle}>
                    {live && live.medHHIncome
                      ? "Finish the questions to see the result"
                      : "Enter her ZIP to run the model"}
                  </div>
                  <div style={S_.emptyMark}>S = B × C × M</div>
                </div>
                <div style={S_.emptyText}>
                  {live && live.medHHIncome
                    ? "Her market is loaded for " + live.label + ". Answer each question on the left. Every answer is explained below and tagged with the part of the equation it builds: B her floor, C the comparison, M her options, k the discount, F your friction. The full result appears once they're all in."
                    : "Put the ZIP where you hope to meet her in the panel on the left and hit Pull. As you answer the questions below it, each answer is explained here and tagged with the part of the equation it feeds. The full result appears once the ZIP is in and the questions are answered."}
                </div>
              </div>
              {activeCard ? (
                <div
                  key={activeCard.label}
                  style={{
                    ...S_.exCard,
                    opacity: explainVisible ? 1 : 0,
                    transition: "opacity 0.18s ease",
                  }}
                >
                  <div style={S_.exCardTop}>
                    <div style={S_.exCardLabelRow}>
                      <span style={S_.exCardLabel}>{activeCard.label}</span>
                      <span style={activeCard.vr === "gate" ? S_.exVarGate : S_.exVar}>
                        {activeCard.vr === "gate" ? "GATE" : "→ " + activeCard.vr}
                      </span>
                    </div>
                    <span style={S_.exCardChoice}>{Array.isArray(activeCard.choice) ? activeCard.choice.join(", ") : activeCard.choice}</span>
                  </div>
                  <div style={S_.exCardText}>{activeCard.text}</div>
                </div>
              ) : null}
            </>
          ) : (
          <>
          <div style={S_.resultRow} className="rpm-resultrow">
          <div style={{ ...S_.verdict, ...VERDICT_STYLE[r.vClass] }}>
            <div style={S_.blLabel}>Can You Afford Her Lifestyle</div>
            <div style={{ ...S_.blNum, color: "inherit" }} className="rpm-bignum">{FMT(Math.abs(r.grossGap))}<span style={{ ...S_.blYr, color: "inherit", opacity: 0.7 }}>{r.grossGap > 0 ? "income deficit" : "income surplus"}</span></div>
            <div style={{ ...S_.verdictNote, border: "1px dashed rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.06)", padding: "16px 18px", marginTop: 14, lineHeight: 1.55, fontFamily: "'Inter', system-ui, sans-serif", fontSize: 13 }}>
              {r.importLevel === 2 ? (
                r.grossGap <= 0 ? (
                  <>At her status level today, the odds are she is likely receiving <strong>{FMT(r.S)}</strong> after
                  taxes to maintain her lifestyle. If this doesn't come from her own income or generational wealth
                  or she decides not to work, you will need to deliver roughly <strong>{FMT(r.grossToKeep)}</strong> gross
                  annual income while in a committed relationship. Luckily, you can afford her with a <strong>{FMT(-r.grossGap)}</strong> surplus
                  in annual income.</>
                ) : (
                  <>At her status level today, the odds are she is likely receiving <strong>{FMT(r.S)}</strong> after
                  taxes to maintain her lifestyle. If this doesn't come from her own income or generational wealth
                  or she decides not to work, you will need to deliver roughly <strong>{FMT(r.grossToKeep)}</strong> gross
                  annual income while in a committed relationship. Unfortunately, you are facing a <strong>{FMT(r.grossGap)}</strong> deficit
                  in annual income.</>
                )
              ) : !r.inPool ? (
                <>She likely requires <strong>{FMT(r.S)}</strong> after taxes to maintain her lifestyle. But before
                that matters, she checks whether your income competes in her local pool, and at <strong>{FMT(yourIncome)}</strong> you
                fall below the <strong>{FMT(r.poolEntryIncome)}</strong> entry bar. Unfortunately, you are priced out before your
                ability to fund her lifestyle is ever weighed.</>
              ) : r.grossGap > 0 ? (
                <>She likely requires <strong>{FMT(r.S)}</strong> after taxes to maintain her lifestyle. She will want
                to know you can absorb that amount if she isn't working. To deliver and still fund your own life, you'd
                need to earn roughly <strong>{FMT(r.grossToKeep)}</strong> gross annual income. Unfortunately, you are
                facing a <strong>{FMT(r.grossGap)}</strong> deficit in annual income.</>
              ) : r.vClass === "marginal" ? (
                <>She likely requires <strong>{FMT(r.S)}</strong> after taxes to maintain her lifestyle. She will want
                to know you can absorb that amount if she isn't working. To deliver and still fund your own life, you'd
                need to earn roughly <strong>{FMT(r.grossToKeep)}</strong> gross annual income. You clear that, but by
                only a <strong>{FMT(-r.grossGap)}</strong> margin, thin enough that a lean year or a higher earner closes it.</>
              ) : (
                <>She likely requires <strong>{FMT(r.S)}</strong> after taxes to maintain her lifestyle. She will want
                to know you can absorb that amount if she isn't working. To deliver and still fund your own life, you'd
                need to earn roughly <strong>{FMT(r.grossToKeep)}</strong> gross annual income. You clear that with
                a <strong>{FMT(-r.grossGap)}</strong> surplus in annual income.</>
              )}
            </div>
          </div>

          <div style={S_.bottomLine}>
            <div style={S_.blLabel}>Bottom Line: Can You Keep Her Safe</div>
            <div style={S_.blNum} className="rpm-bignum">{FMT(r.totalToCompete)}<span style={S_.blYr}>/yr annual income</span></div>
            <div style={{ ...S_.blExplain, background: "rgba(255,255,255,0.06)", border: "1px dashed rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.85)" }}>
              In most cases, you must demonstrate you can earn enough to compete in her local suitor
              pool (<strong>{FMT(r.grossToKeep)}</strong> gross income) which absorbs her lifestyle costs
              (<strong>{FMT(r.S)}</strong>) without sacrificing your own lifestyle and status. You have to
              clear both and expect her to run this general calculation as part of her evaluation of you
              as a partner. In today's dating economy, women use a common but coded phrase: "Can you keep me safe?" Can you?
            </div>
          </div>
          </div>
          </>
          )}
        </div>
      </div>

      {/* FULL-WIDTH RESULTS */}
      {r && (
        <div style={S_.fwWrap}>
          <div style={S_.fwPair} className="rpm-fwpair">
            <div style={S_.priceCard}>
              <div style={S_.cardTitle}>
                What it takes to keep her
                <span style={S_.liveBadge}>●&nbsp; {live.label}</span>
              </div>
              <div style={S_.bigNum} className="rpm-bignum">{FMT(r.S)}<span style={S_.perYr}>in expenses</span></div>
              <div style={S_.band}>
                Her floor {FMT(r.sLow)} · her ceiling {FMT(r.sHigh)} (±{Math.round(r.bandPct * 100)}%)
              </div>
              <BandBar low={r.sLow} mid={r.S} high={r.sHigh} delivered={r.delivered} />
            </div>

            <div style={S_.priceCard}>
              <div style={S_.cardTitle}>
                You vs other men
                <span style={S_.liveBadge}>●&nbsp; {live.label}</span>
              </div>
              <div style={S_.bigNum} className="rpm-bignum">
                {Math.round(r.compPct)}<span style={S_.ord}>{ordinal(Math.round(r.compPct))}</span>
                <span style={S_.perYr}>percentile locally</span>
              </div>
              <div style={S_.band}>
                {r.maleMed ? <>Local male median earnings {FMT(r.maleMed)}. </> : null}
                To be a real option for her you'd need about the {Math.round(r.entryPct)}{ordinal(Math.round(r.entryPct))} percentile
                {r.poolEntryIncome ? <>, roughly <strong>{FMT(r.poolEntryIncome)}/yr</strong> here</> : null} (higher the pickier her circle).
              </div>
              <TierBar entry={r.entryPct} you={r.compPct} inPool={r.inPool} />
            </div>

            <div style={S_.priceCard}>
              <div style={S_.cardTitle}>What this means</div>
              <div style={S_.meansText}>
                That <strong>{FMT(r.S)}</strong> is what she'd need to receive, after tax. To deliver it and still
                fund your own life, you'd have to earn roughly{" "}
                <strong>{FMT(r.grossToKeep)}/yr</strong> gross income. You're paying for two lives at
                once, not grossing up one number.
              </div>
              <div style={S_.meansDivide} />
              <div style={S_.meansText}>
                {r.inPool
                  ? <>You're in her suitor pool: your income sits <strong>{Math.max(0, Math.round(r.compPct - r.entryPct))} points</strong> above the line just to be considered. That is a different, lower bar than keeping her. {r.keepPct != null && <>Actually meeting her retention price takes about the <strong>{Math.round(r.keepPct)}{ordinal(Math.round(r.keepPct))} percentile</strong> of local men{r.keepPct >= r.compPct ? <>, above where you land, which is why the price card shows a shortfall even though you clear the pool</> : null}.</>}</>
                  : <>Your income lands <strong>{Math.round(r.entryPct - r.compPct)} points below</strong> the line to even be considered here. Keeping her is a still-higher bar{r.keepPct != null ? <>, around the {Math.round(r.keepPct)}{ordinal(Math.round(r.keepPct))} percentile of local men</> : null}.</>}
              </div>
            </div>
          </div>

          <div style={S_.fwQuad} className="rpm-fwquad">
            <Term label="Her lifestyle cost" val={FMT(r.B)} note="real local dollars" />
            <Term label="Comparison pressure" val={"×" + r.C.toFixed(2)} note="how rich her circle is" hot={r.C >= 2.0} />
            <Term label="Her reach" val={"×" + r.M.toFixed(2)} note="her ability to leave" />
            <Term label="Attraction discount" val={"×" + r.k.toFixed(2)} note="your green flags' value" />
          </div>

          <div style={S_.fwDuo} className="rpm-fwduo">
            <div style={S_.vCard}>
              <div style={{ ...S_.cardTitle, marginBottom: 14 }}>Your delivered value</div>
              <VRow label="Provider value (Vp)" val={FMT(r.Vp)} pos />
              <VRow label="Relational value after discount" val={"+ " + FMT(r.loverOffset)} pos />
              <VRow label="Friction she absorbs (F)" val={"− " + FMT(r.F)} />
              <div style={S_.vTotal}>
                <span>Net delivered</span>
                <span>{FMT(r.delivered)}</span>
              </div>
            </div>

            <div style={S_.priceCard}>
              <div style={S_.cardTitle}>What this means</div>
              <div style={S_.meansText}>
                {!r.inPool
                  ? <><strong>Priced out, not just outbid.</strong> Your income sits below the entry line for the men competing for her here. Whether you can keep her is the second question; the first is whether you're in the pool at all, and at her comparison intensity you're not yet.</>
                  : r.importLevel === 1
                  ? <><strong>Import is ambiguous.</strong> The single most decisive variable is unresolved. Until it reads zero under real exclusivity, treat the price as unpayable regardless of margin, because the gate sits before the inequality.</>
                  : r.vClass === "clear"
                  ? <><strong>Clears with margin.</strong> Your value exceeds her price and the import gate is open. The remaining risk is verification: the soft terms confirm only with time under real friction, not at the start.</>
                  : r.vClass === "marginal"
                  ? <><strong>Clears, but only just.</strong> You're over her price with little room. A bad month, a richer entrant in her network, or any rise in her benchmark erases the margin. A hold, not a lock.</>
                  : <><strong>Below what it takes.</strong> The shortfall is structural, not effort. Turning up relational value won't close it, because that value is capped and discounted.</>}
              </div>
              <div style={S_.meansDivide} />
              <div style={S_.meansText}>
                {!r.inPool
                  ? <>To improve your odds, the lever is income relative to local male competition, not anything inside the relationship. Worth asking honestly: are the women you're pursuing a realistic match for the life you lead today, or are you fishing in a pool priced above you?</>
                  : r.importLevel === 1
                  ? <>Resolve the ambiguity before spending another dollar of effort. Get to real exclusivity and re-run this; nothing else you do counts until that gate reads zero.</>
                  : r.vClass === "clear"
                  ? <>Hold the line you're on. Don't overpay to a benchmark you already clear, and let time under real friction confirm the soft terms rather than buying them upfront.</>
                  : r.vClass === "marginal"
                  ? <>Protect the thin margin: reduce friction in your life where you can, and don't anchor to a woman whose benchmark is still climbing. A small shift in her network closes the gap against you.</>
                  : <>The real levers are a woman who isn't comparing you to a richer field, less friction in your life, or materially more income. Ask whether this tier of woman fits the life you actually lead, or whether you're competing for a price you're not built to pay today.</>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DIVIDER before already-full-width sections */}
      {r && (
        <div style={S_.fwDivider}><div style={S_.fwDividerLine} /></div>
      )}

      {/* AVAILABILITY FUNNEL */}
      {availability && r && (
        <div style={S_.ladderWrap}>
          <div style={S_.ladderHead}>
            <h2 style={S_.ladderTitle}>How many like her are actually around</h2>
            <p style={{ ...S_.ladderSub, maxWidth: "none" }}>
              Starting from every woman in your age range within {availability.radius} miles of ZIP{" "}
              {targetZip} ({availability.zipsInRange.toLocaleString()} ZIPs, {availability.popInRange.toLocaleString()} people),
              each filter narrows the pool. Race, marital, and age come from the Census; they are
              published separately, so the combined count is a modeled estimate, not a single
              cross-tabulated figure.
            </p>
          </div>
          <div className="rpm-fwpair" style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 28, alignItems: "stretch", marginBottom: 16 }}>
            {/* LEFT — potential matches + likely-to-date + relationship potential */}
            <div style={{ ...S_.availBox, marginBottom: 0 }}>
              <div style={S_.availBoxNum}>{availability.final.toLocaleString()}<span style={S_.availBoxNumLbl}>potential matches</span></div>
              {mutual && (
                <div style={{ ...S_.availBoxNum, marginTop: 14 }}>{Math.round(availability.final * mutual.attractShare).toLocaleString()}<span style={S_.availBoxNumLbl}>likely to date you</span></div>
              )}
              {mutual && (
                <div style={{ ...S_.availBoxNum, marginTop: 14 }}>{mutual.realistic.toLocaleString()}<span style={S_.availBoxNumLbl}>relationship potential</span></div>
              )}
              <div style={S_.availBoxText}>
                Estimated women within {availability.radius} miles who match the age, race,
                single status, attractiveness, education, and openness filters you set.
                {availability.singleWomenAll > 0 && (
                  <> That is <strong>{fmtTinyPct(availability.final, availability.singleWomenAll)}</strong> of
                  the {availability.singleWomenAll.toLocaleString()} single women (18-64)
                  in the radius you specified, or about <strong>{Math.max(0, Math.round(availability.final / availability.singleWomenAll * 10000)).toLocaleString()}</strong> in
                  every 10,000 single women within {availability.radius} miles.</>
                )}
              </div>
            </div>

            {/* RIGHT — pool in context, styled like the delivered-value (V−F) card */}
            <div style={S_.vCard}>
              <div style={{ ...S_.cardTitle, marginBottom: 14 }}>Your pool in context</div>
              {availability.singleWomenAll > 0 && (
                <VRow label="Of single women 18-64" val={fmtTinyPct(availability.final, availability.singleWomenAll)} />
              )}
              {availability.singleWomenInRange > 0 && (
                <VRow label={"Of single women, ages " + ageLo + "-" + ageHi} val={fmtTinyPct(availability.final, availability.singleWomenInRange)} />
              )}
              {availability.singleWomenAll > 0 && availability.final > 0 && (
                <VRow label="Single women per match" val={"1 in " + Math.max(1, Math.round(availability.singleWomenAll / availability.final)).toLocaleString()} />
              )}
              {mutual && (
                <div style={S_.meansText}>
                  Of the women you would match with, about <strong>{Math.round(mutual.attractShare * 100)}%</strong> are likely
                  drawn to a man at your standing in the local field ({Math.round(availability.final * mutual.attractShare).toLocaleString()} likely
                  to date you), and of those roughly <strong>{Math.round(mutual.commitShare * 100)}%</strong> would
                  commit given your delivered value against her price. The overlap is your best chance at a relationship locally.
                </div>
              )}
            </div>
          </div>
          <div style={S_.funnelWrap}>
            {availability.steps.map((s, i) => {
              const top = availability.steps[0].n || 1;
              const pct = Math.max(1, Math.round((s.n / top) * 100));
              return (
                <div key={i} style={S_.funnelRow}>
                  <div style={S_.funnelLabel}>{s.label}</div>
                  <div style={S_.funnelBarTrack}>
                    <div style={{ ...S_.funnelBar, width: pct + "%" }} />
                  </div>
                  <div style={S_.funnelNum}>{s.n.toLocaleString()}</div>
                </div>
              );
            })}
          </div>
          <div style={S_.ladderNote}>
            Single status, race, and age are real Census shares for ZIP {targetZip}, combined
            proportionally. Attractiveness uses the local obesity rate and your looks and fitness
            inputs. Openness to a partner with children is a modeled assumption applied only
            because you indicated you have children. Treat the final number as an order-of-magnitude
            estimate, not a roster.
          </div>
        </div>
      )}

      {/* DIVIDER before already-full-width sections */}
      {ladder && r && (
        <div style={S_.fwDivider}><div style={S_.fwDividerLine} /></div>
      )}

      {/* FAMILY OF FOUR OUTLOOK */}
      {ladder && r && (
        <div style={S_.ladderWrap}>
          <div style={S_.ladderHead}>
            <h2 style={S_.ladderTitle}>Family of four outlook</h2>
            <p style={{ ...S_.ladderSub, maxWidth: "none" }}>
              The class bands are national household-income thresholds, shown next to what the
              same standing costs in this ZIP once cost of living is weighted in. Discretionary
              spending is a modeled estimate for a family of four: after-tax income minus local
              housing (real ACS data) and COL-weighted childcare, transport, food, healthcare,
              K-12, and college savings. The vacation markers show what's left over.
            </p>
          </div>
          <div style={S_.ladderTableWrap}>
            <table style={S_.ladderTable}>
              <thead>
                <tr>
                  <th style={S_.ladderTh}>Class</th>
                  <th style={S_.ladderThR}>National income</th>
                  <th style={S_.ladderThR}>Local income</th>
                  <th style={S_.ladderThR}>Discretionary spending</th>
                  <th style={S_.ladderThC}>Staycation</th>
                  <th style={S_.ladderThC}>Domestic trip</th>
                  <th style={S_.ladderThC}>Int'l trip</th>
                </tr>
              </thead>
              <tbody>
                {ladder.bands.map((b) => (
                  <tr key={b.name}>
                    <td style={S_.ladderTdName}>{b.name}</td>
                    <td style={S_.ladderTdR}>
                      {FMT(b.natLow)}{b.natHigh ? "–" + FMT(b.natHigh) : "+"}
                    </td>
                    <td style={S_.ladderTdR}>
                      {FMT(Math.round(b.localLow))}{b.localHigh ? "–" + FMT(Math.round(b.localHigh)) : "+"}
                    </td>
                    <td style={{ ...S_.ladderTdR, color: b.net < 0 ? ACCENT : "#1a6b4a", fontWeight: 600 }}>
                      {b.net < 0 ? "−" + FMT(Math.abs(Math.round(b.net))) : FMT(Math.round(b.net))}
                    </td>
                    <td style={S_.ladderTdC}>{b.canStaycation ? "✓" : "—"}</td>
                    <td style={S_.ladderTdC}>{b.canDomestic ? "✓" : "—"}</td>
                    <td style={S_.ladderTdC}>{b.canIntl ? "✓" : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={S_.ladderNote}>
            Modeled annual cost of living for a family of four in this ZIP: housing{" "}
            <strong>{FMT(Math.round(ladder.lines.housing))}</strong>, plus childcare, transport,
            food, healthcare, K-12, and college savings, totaling about{" "}
            <strong>{FMT(Math.round(ladder.baseExpenses))}</strong> before any discretionary
            spending. A negative net means that income can't cover a family-of-four life here
            without cutting into it.
          </div>
        </div>
      )}

      {/* DIVIDER before already-full-width sections */}
      {r && (
        <div style={S_.fwDivider}><div style={S_.fwDividerLine} /></div>
      )}

      {/* DIVORCE REALITY CHECK */}
      {r && (
      <div style={S_.divorceWrap}>
        <div style={S_.ladderHead}>
          <h2 style={S_.ladderTitle}>And if you clear her price, the other half of the math</h2>
          <p style={{ ...S_.ladderSub, maxWidth: "none" }}>
            Winning her is one number. Keeping the marriage is another. Public data on who ends
            marriages, and why, is the part most men never price in.
          </p>
        </div>
        <div style={S_.divorceGrid}>
          <div style={S_.divorceCard}>
            <div style={S_.divorceStat}>≈ 69–70%</div>
            <div style={S_.divorceLabel}>of US divorces are initiated by women</div>
            <div style={S_.divorceSrc}>
              American Sociological Association (2015) and Stanford research (Rosenfeld) both put
              it near 69–70%, higher among college-educated couples and as high as 75% in some
              years.
            </div>
          </div>
          <div style={S_.divorceCard}>
            <div style={S_.divorceStat}>≈ 30%</div>
            <div style={S_.divorceLabel}>of divorces are driven by money</div>
            <div style={S_.divorceSrc}>
              The Institute for Divorce Financial Analysts ranks money issues a leading cause. A
              TD Bank study found 41% of Gen X and 29% of Boomers ended their marriages over
              financial disagreements. Income and debt are central, not incidental.
            </div>
          </div>
          <div style={S_.divorceCard}>
            <div style={S_.divorceStat}>$84.9k vs $118.6k</div>
            <div style={S_.divorceLabel}>median household income, divorced vs first-married</div>
            <div style={S_.divorceSrc}>
              Pew Research (2025). Divorced working-age adults hold lower household income and less
              wealth than those in a first marriage, before child support and split assets.
            </div>
          </div>
        </div>
      </div>
      )}

      {/* DIVIDER before already-full-width sections */}
      {r && (
        <div style={S_.fwDivider}><div style={S_.fwDividerLine} /></div>
      )}

      {r && (
        <div style={S_.explore}>
          <div style={S_.exploreHead}>
            <h2 style={S_.exploreTitle}>Explore the 40 largest metros</h2>
            <div style={S_.exploreSub}>
              Same woman, same you. Only the metro changes. Real Census and CDC data for each
              market's principal county. Ranked by single women 18-64 in the area.
            </div>
          </div>
          <div style={S_.ladderTableWrap}>
            <table style={S_.ladderTable}>
              <thead>
                <tr>
                  <th style={S_.ladderTh}>Metro</th>
                  <th style={S_.ladderThR}>Single women 18-64</th>
                  <th style={S_.ladderThR}>Median income</th>
                  <th style={S_.ladderThR}>Price to keep her</th>
                  <th style={S_.ladderThR}>Your income rank</th>
                  <th style={S_.ladderThR}>In her pool</th>
                  <th style={S_.ladderThR}>Can you afford her</th>
                </tr>
              </thead>
              <tbody>
                {exploreRows.map((row) => (
                  <tr key={row.name}>
                    <td style={S_.ladderTdName}>{row.name}</td>
                    <td style={S_.ladderTdR}>{row.singleWomen.toLocaleString()}</td>
                    <td style={S_.ladderTdR}>{FMT(row.medHH)}</td>
                    <td style={{ ...S_.ladderTdR, fontWeight: 600 }}>{FMT(row.S)}</td>
                    <td style={S_.ladderTdR}>{Math.round(row.compPct)}{ordinal(Math.round(row.compPct))}</td>
                    <td style={{ ...S_.ladderTdC, textAlign: "right", color: row.inPool ? "#1a6b4a" : ACCENT, fontWeight: 600 }}>
                      {row.inPool ? "in" : "priced out"}
                    </td>
                    <td style={{ ...S_.ladderTdC, textAlign: "right", color: row.grossGap <= 0 ? "#1a6b4a" : ACCENT, fontWeight: 600 }}>
                      {row.grossGap <= 0 ? "yes" : "no"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={S_.exploreNote}>
            Price to keep her moves with local income, the cost of her presentation tier, and
            local fitness scarcity. Your income rank moves with each metro's male earner
            distribution. The verdict can flip from priced out to in across markets on identical
            inputs, which is the geographic reality the model is built to show.
          </div>
        </div>
      )}

      <footer style={S_.footer}>
        <div style={S_.footerInner}>
        <div className={"rpm-glide" + (explainOpen ? " open" : "")}>
          <div style={{ overflow: "hidden" }}>
            <div style={{ paddingBottom: 12 }}>
              This is a calculator that does something we train men never to do out loud: it
              assigns a number to what it would take to attract and keep a high-status woman in
              today's market. Not a vibe, not a pep talk, a figure, in dollars. It runs in two
              movements. First it prices her, using three inputs that actually govern the outcome:
              how she looks and what that presentation costs to maintain, how wealthy the men in
              her orbit are, since they are your real competitive set rather than the men you
              imagine you're beating, and how many options she perceives she has, which in the
              current environment is close to unlimited. Then it prices you, your income and the
              partner you are, less the weight she takes on by choosing you, your children, the
              distance, the support, the occasional matter of height. The output is the income
              you'd need to be a credible bid.
              <br /><br />
              What makes the number high is not that women have changed. It's that the market has.
              A generation ago a woman's pool was geographic, the men within driving distance.
              Today it's algorithmic. Every man who can reach her phone is a candidate, and the
              wealthiest among them is one notification away at all hours. Dating apps, social
              platforms, and a culture that recodes trading up as personal growth have
              simultaneously expanded her field and raised her reference point. She is pricing
              herself against that global field, not against the man in the room, and any of us with
              the same options would do precisely the same thing. The error men make is to price
              themselves against the world that existed when they formed their expectations, while
              competing in the one that exists now.
              <br /><br />
              The cost compounds because upkeep has migrated from luxury to baseline. The gym
              membership becomes the Pilates studio, the sculpting class, the sauna, the spa, then
              the longevity regimen. The annual vacation becomes a calendar of trips that are
              themselves a form of social production. Skincare, aesthetics, the maintained body, the
              curated life: these are no longer discretionary, they are recurring line items, and
              they escalate every year. The man who can underwrite that life advances to the front
              of her consideration set, and the man who cannot is quietly removed from it, usually
              without ever being told that's what happened. The uncomfortable mechanics are these:
              the standard rises each cycle while real wages do not, so the distance between what is
              expected and what most men can provide grows on its own, structurally, while the
              culture pretends the line hasn't moved.
              <br /><br />
              The logic of the tool is simple. Clear her price and you are a live contender. Fall
              short and you are not. There is also a gate that sits above the math entirely: if she
              is still drawing attention or resources from wealthier men on the side, the
              calculation is moot, because the position was never genuinely open. None of this is
              editorial. It is built on public data from the Census Bureau, the CDC, and the
              observable behavior of the modern dating economy. I am not arguing the market should
              operate this way. I am showing you that it does. The beginning of competence in any
              arena is an honest description of the game you are actually playing. This is yours,
              rendered in numbers. Read it, and then go do the unglamorous work of becoming the man
              she wants. And if those opportunities don't present themselves to earn more, you need
              to lower your expectations in the type of woman you can attract and keep.
            </div>
          </div>
        </div>
        <div className={"rpm-glide" + (formulaOpen ? " open" : "")}>
          <div style={{ overflow: "hidden" }}>
            <div style={{ paddingBottom: 12 }}>
              Her price to keep (<strong>S</strong>) is her maintenance floor (<strong>B</strong>),
              set by local cost of living and how she presents: her desirability, her fitness, and
              the upkeep her body and beauty routine actually cost, multiplied by the intensity of
              who she compares you to (<strong>C</strong>), driven by the money in her circle, her own
              income and education, and how educated her market is, multiplied by how freely she can
              reach alternatives (<strong>M</strong>), her age, her mobility, and whether children
              anchor her in place. Against that price you put your delivered value: what you provide
              as a partner plus your relational value, discounted by how much her past and your
              standing weigh on a serious match (<strong>k</strong>), minus the friction she has to
              absorb (<strong>F</strong>), chiefly your children, the distance, and support. You keep
              her only if delivered value clears S, and only if she is genuinely all in rather than
              sourcing attention or money from higher-tier men elsewhere, a gate that fails before
              price is even counted. Enter the ZIP where you hope to meet her to run it on real local
              data.
            </div>
          </div>
        </div>
        <div className={"rpm-glide" + (footerOpen ? " open" : "")}>
          <div style={{ overflow: "hidden" }}>
            <div style={{ paddingBottom: 12 }}>
              This is a pricing model, not a judgment of anyone's worth. The structure and direction
              come from recent mate-preference literature, along with dollar, regional trends, and
              prevalence anchors as real data. Hypergamy, the tendency to seek a partner of equal or
              higher status, is a well-documented pattern, and researchers tie its spread into nearly
              every local market to social media and dating apps, which widen the field of higher-status
              men a woman can see and compare against far beyond the people she actually meets.
            </div>
          </div>
        </div>
        <div className={"rpm-glide" + (matchesOpen ? " open" : "")}>
          <div style={{ overflow: "hidden" }}>
            <div style={{ paddingBottom: 12 }}>
              The availability count estimates how many women near a ZIP actually fit the profile
              you built, not just how many live there. It starts from the real female population in
              your age range across every ZIP inside your radius, then applies each filter in turn:
              race or ethnicity, relationship status, her own income band, the desirability and
              fitness tier you set, education, and an openness adjustment for whether she has
              children. Every cut except the children adjustment reads off a real federal share for
              that ZIP, so the final number is a grounded estimate of the local pool, not a guess.
              It is deliberately strict. A small count is the point, not an error.
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
          <button
            onClick={() => { setExplainOpen((v) => !v); setFormulaOpen(false); setFooterOpen(false); setMatchesOpen(false); }}
            style={S_.collapseLink}
            aria-expanded={explainOpen}
          >
            <span style={{ ...S_.collapseChev, transform: explainOpen ? "rotate(45deg)" : "none" }}><PlusIcon /></span>
            About the calculator
          </button>
          <button
            onClick={() => { setFormulaOpen((v) => !v); setExplainOpen(false); setFooterOpen(false); setMatchesOpen(false); }}
            style={S_.collapseLink}
            aria-expanded={formulaOpen}
          >
            <span style={{ ...S_.collapseChev, transform: formulaOpen ? "rotate(45deg)" : "none" }}><PlusIcon /></span>
            Our algorithm
          </button>
          <button
            onClick={() => { setFooterOpen((v) => !v); setMatchesOpen(false); setExplainOpen(false); setFormulaOpen(false); }}
            style={S_.collapseLink}
            aria-expanded={footerOpen}
          >
            <span style={{ ...S_.collapseChev, transform: footerOpen ? "rotate(45deg)" : "none" }}><PlusIcon /></span>
            Our pricing model
          </button>
          <button
            onClick={() => { setMatchesOpen((v) => !v); setFooterOpen(false); setExplainOpen(false); setFormulaOpen(false); }}
            style={S_.collapseLink}
            aria-expanded={matchesOpen}
          >
            <span style={{ ...S_.collapseChev, transform: matchesOpen ? "rotate(45deg)" : "none" }}><PlusIcon /></span>
            Available local matches
          </button>
          <button
            onClick={() => setOliveTheme((v) => !v)}
            style={{ ...S_.collapseLink, marginLeft: "auto", gap: 6 }}
            aria-pressed={oliveTheme}
            aria-label={oliveTheme ? "Switch to default theme" : "Switch to greyscale theme"}
            title={oliveTheme ? "Default theme" : "Greyscale theme"}
          >
            <PaintBrushIcon />
            Theme
          </button>
        </div>
        </div>
      </footer>
    </div>
  );
}

// ---- Small components -----------------------------------------------------

function Field({ label, hint, children }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const btnRef = useRef(null);
  const popRef = useRef(null);
  const [pos, setPos] = useState({ left: 0, top: 0, arrowLeft: 0, ready: false });

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") { setOpen(false); btnRef.current && btnRef.current.focus(); } };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, [open]);

  // place the popover ABOVE the icon so it never covers the control below. Measure the rendered
  // popover height, then sit its bottom just above the icon, arrow on the bottom edge pointing down.
  useEffect(() => {
    if (!open || !btnRef.current || !wrapRef.current) return;
    const POP_W = 260;
    const wrap = wrapRef.current.getBoundingClientRect();
    const btn = btnRef.current.getBoundingClientRect();
    const iconCenter = btn.left - wrap.left + btn.width / 2;
    let left = iconCenter - 18;
    const maxLeft = wrap.width - POP_W;
    if (left > maxLeft) left = maxLeft;
    if (left < 0) left = 0;
    const arrowLeft = Math.max(10, Math.min(POP_W - 18, iconCenter - left - 5));
    const popH = popRef.current ? popRef.current.offsetHeight : 0;
    const top = (btn.top - wrap.top) - popH - 9; // gap above the icon
    setPos({ left, top, arrowLeft, ready: true });
  }, [open]);

  return (
    <div style={{ ...S_.field, position: "relative" }} className="rpm-field" ref={wrapRef}>
      <div style={S_.fieldLabelRow}>
        <span style={S_.fieldLabel}>{label}{hint && " "}
        {hint && (
          <button
            type="button"
            ref={btnRef}
            style={{ ...S_.infoBtn, verticalAlign: "middle", marginLeft: 1, position: "relative", top: -1 }}
            aria-label="More information"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="11" x2="12" y2="16" /><line x1="12" y1="7.5" x2="12" y2="7.6" />
            </svg>
          </button>
        )}
        </span>
      </div>
      {children}
      {hint && open && (
        <div
          ref={popRef}
          style={{ ...S_.pop, left: pos.left, top: pos.top, visibility: pos.ready ? "visible" : "hidden" }}
          role="tooltip"
        >
          {hint}
          <span style={{ ...S_.popArrow, left: pos.arrowLeft, bottom: -6, borderLeft: "none", borderTop: "none", borderRight: `1px solid ${INK}`, borderBottom: `1px solid ${INK}` }} />
        </div>
      )}
    </div>
  );
}
function Checks({ opts, selected, setSelected }) {
  // opts may be plain strings (label === id) or {id, label} records. Normalize.
  const items = opts.map((o) => (typeof o === "string" ? { id: o, label: o } : o));
  const toggle = (id) => {
    const has = selected.includes(id);
    if (id === "any") { setSelected(["any"]); return; }
    let next = has ? selected.filter((x) => x !== id) : [...selected.filter((x) => x !== "any"), id];
    if (!next.length) next = items.some((i) => i.id === "any") ? ["any"] : [];
    setSelected(next);
  };
  return (
    <div style={S_.checksWrap}>
      {items.map((it) => {
        const on = selected.includes(it.id);
        return (
          <button key={it.id} type="button" onClick={() => toggle(it.id)}
            style={{ ...S_.checkChip, ...(on ? S_.checkChipOn : {}) }}>
            <span style={S_.checkBox}>{on ? "✓" : ""}</span>{it.label}
          </button>
        );
      })}
    </div>
  );
}
// Custom, non-native dropdown. Same props as before (v, set, opts). Fully keyboard
// accessible (Enter/Space/Arrows/Home/End/Esc/type-ahead), ARIA listbox roles, click-outside
// to close. Renders identically across browsers and platforms; no OS-native list.
function Sel({ v, set, opts }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1); // highlighted index while open
  const rootRef = useRef(null);
  const listRef = useRef(null);
  const btnRef = useRef(null);
  const typeBuf = useRef({ str: "", t: 0 });

  // opts may be plain strings (label === id) or {id, label} records. Normalize.
  const items = opts.map((o) => (typeof o === "string" ? { id: o, label: o } : o));
  const selectedIdx = items.findIndex((it) => it.id === v);
  const selectedLabel = selectedIdx >= 0 ? items[selectedIdx].label : "";

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  // keep the active option scrolled into view
  useEffect(() => {
    if (!open || active < 0 || !listRef.current) return;
    const el = listRef.current.children[active];
    if (el && el.scrollIntoView) el.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  const openList = (toIdx) => {
    setActive(toIdx != null ? toIdx : (selectedIdx >= 0 ? selectedIdx : 0));
    setOpen(true);
  };
  const choose = (i) => { set(items[i].id); setOpen(false); btnRef.current && btnRef.current.focus(); };

  const onBtnKey = (e) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault(); openList(null);
    } else if (e.key === "ArrowUp") {
      e.preventDefault(); openList(Math.max(0, (selectedIdx < 0 ? items.length : selectedIdx) - 1));
    }
  };
  const onListKey = (e) => {
    if (e.key === "Escape") { e.preventDefault(); setOpen(false); btnRef.current && btnRef.current.focus(); return; }
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(items.length - 1, a + 1)); return; }
    if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); return; }
    if (e.key === "Home") { e.preventDefault(); setActive(0); return; }
    if (e.key === "End") { e.preventDefault(); setActive(items.length - 1); return; }
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); if (active >= 0) choose(active); return; }
    if (e.key === "Tab") { setOpen(false); return; }
    if (e.key.length === 1) {
      const now = Date.now();
      typeBuf.current.str = (now - typeBuf.current.t < 700 ? typeBuf.current.str : "") + e.key.toLowerCase();
      typeBuf.current.t = now;
      const hit = items.findIndex((it) => it.label.toLowerCase().startsWith(typeBuf.current.str));
      if (hit >= 0) setActive(hit);
    }
  };

  return (
    <div className="rpm-dd" ref={rootRef}>
      <button
        type="button"
        ref={btnRef}
        className="rpm-dd-btn"
        data-placeholder={v ? "false" : "true"}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => (open ? setOpen(false) : openList(null))}
        onKeyDown={onBtnKey}
      >
        {selectedLabel || "Pick one…"}
        <svg className="rpm-dd-chev" viewBox="0 0 24 24" fill="none" stroke="var(--warm2)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <ul
          className="rpm-dd-list"
          role="listbox"
          tabIndex={-1}
          onKeyDown={onListKey}
          ref={(el) => { listRef.current = el; if (el) el.focus(); }}
        >
          {items.map((it, i) => (
            <li
              key={it.id}
              role="option"
              aria-selected={it.id === v}
              data-active={i === active}
              className="rpm-dd-opt"
              onMouseEnter={() => setActive(i)}
              onClick={() => choose(i)}
            >
              {it.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
function Num({ v, set, step, min, max }) {
  return (
    <input
      type="text"
      inputMode="numeric"
      value={v != null && v !== "" ? "$" + Number(v).toLocaleString() : ""}
      onChange={(e) => {
        const digits = e.target.value.replace(/[^0-9]/g, "");
        const n = digits === "" ? min : Number(digits);
        set(Math.max(min, Math.min(max, n)));
      }}
      style={S_.numInput}
    />
  );
}
function RangeDual({ lo, hi, setLo, setHi, min = 0, max = 100, step = 1, unit = "" }) {
  const pct = (x) => ((x - min) / (max - min)) * 100;
  const onLo = (e) => { const x = Math.min(Number(e.target.value), hi - step); setLo(x); };
  const onHi = (e) => { const x = Math.max(Number(e.target.value), lo + step); setHi(x); };
  return (
    <div style={S_.rangeWrap}>
      <div style={S_.dualWrap}>
        <div style={S_.dualTrack}>
          <div style={{ ...S_.dualFill, left: pct(lo) + "%", right: (100 - pct(hi)) + "%" }} />
        </div>
        <input type="range" className="rpm-dual" min={min} max={max} step={step} value={lo} onChange={onLo}
          style={{ ...S_.dualInput, zIndex: lo > max - (max - min) * 0.1 ? 5 : 3 }} />
        <input type="range" className="rpm-dual" min={min} max={max} step={step} value={hi} onChange={onHi}
          style={{ ...S_.dualInput, zIndex: 4 }} />
      </div>
      <span style={S_.rangeVal}>{lo}{unit}–{hi}{unit}</span>
    </div>
  );
}
function Range({ v, set, min = 0, max = 100, step = 1, unit = "" }) {
  const pct = ((v - min) / (max - min)) * 100;
  return (
    <div style={S_.rangeWrap}>
      <div style={S_.dualWrap}>
        <div style={S_.dualTrack}>
          <div style={{ ...S_.dualFill, left: 0, right: (100 - pct) + "%" }} />
        </div>
        <input type="range" className="rpm-dual" min={min} max={max} step={step} value={v}
          onChange={(e) => set(Number(e.target.value))} style={{ ...S_.dualInput, zIndex: 4 }} />
      </div>
      <span style={S_.rangeVal}>{v}{unit}</span>
    </div>
  );
}
function Term({ label, val, note, hot }) {
  return (
    <div style={{ ...S_.term, ...(hot ? S_.termHot : {}) }}>
      <div style={S_.termVal}>{val}</div>
      <div style={S_.termLabel}>{label}</div>
      <div style={S_.termNote}>{note}</div>
    </div>
  );
}
function VRow({ label, val, pos }) {
  return (
    <div style={S_.vRow}>
      <span style={S_.vRowLabel}>{label}</span>
      <span style={{ ...S_.vRowVal, color: pos ? "#1a6b4a" : "var(--accent-neg)" }}>{val}</span>
    </div>
  );
}
function BandBar({ low, mid, high, delivered }) {
  const span = high - low || 1;
  const dPos = Math.max(0, Math.min(100, ((delivered - low) / span) * 100));
  return (
    <div style={S_.barTrack}>
      <div style={S_.barBand} />
      <div style={{ ...S_.barMid, left: "50%" }} />
      <div
        style={{
          ...S_.barDeliver,
          left: `${dPos}%`,
          background: delivered >= mid ? "#1a6b4a" : "var(--accent-neg)",
        }}
        title={`delivered ${FMT(delivered)}`}
      />
    </div>
  );
}

// Competition tier bar: a 0–100 percentile track with the cohort's entry line marked
// and the man's own placement. Green when inside the pool, red when priced out.
function TierBar({ entry, you, inPool }) {
  const ePos = Math.max(0, Math.min(100, entry));
  const yPos = Math.max(0, Math.min(100, you));
  return (
    <div>
      <div style={S_.tierTrack}>
        {/* competitive zone: from entry line to the top */}
        <div style={{ ...S_.tierZone, left: `${ePos}%`, right: 0 }} />
        {/* entry line */}
        <div style={{ ...S_.tierEntry, left: `${ePos}%` }} title={`entry ${Math.round(entry)}th`} />
        {/* you */}
        <div
          style={{ ...S_.tierYou, left: `${yPos}%`, background: inPool ? "#1a6b4a" : ACCENT }}
          title={`you ${Math.round(you)}th`}
        />
      </div>
      <div style={S_.tierScale}>
        <span>0</span><span>median</span><span>top 20%</span><span>top 5%</span><span>1%</span>
      </div>
      <div style={S_.tierLegend}>
        <span><i style={{ background: ACCENT }} /> entry line · top of her suitor pool</span>
        <span><i style={{ background: inPool ? "#1a6b4a" : ACCENT }} /> you</span>
      </div>
    </div>
  );
}

// Error boundary so a single bad value shows a readable message instead of a white screen,
// and a mount key forces a clean remount when the code reloads.
class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { err: null }; }
  static getDerivedStateFromError(err) { return { err }; }
  render() {
    if (this.state.err) {
      return (
        <div style={{ fontFamily: "Inter, system-ui, sans-serif", padding: 32, color: "#16181d", background: "#f3f1ec", minHeight: "100vh" }}>
          <h2 style={{ fontWeight: 600 }}>Something failed to render.</h2>
          <p style={{ color: "var(--warm1)" }}>The calculator hit an error. The message below says where.</p>
          <pre style={{ whiteSpace: "pre-wrap", background: "#fff", border: "1px solid #d8d3c8", padding: 16, fontSize: 13 }}>
            {String(this.state.err && this.state.err.message || this.state.err)}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function RetentionCalculator() {
  return (
    <ErrorBoundary>
      <RetentionCalculatorInner />
    </ErrorBoundary>
  );
}

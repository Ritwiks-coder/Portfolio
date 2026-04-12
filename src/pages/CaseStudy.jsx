import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// ── Scroll reveal ──────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

// ── Floating back button ───────────────────────────────────────────────────────
function FloatingBack({ onClick }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 100);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.3 }}
          onClick={onClick}
          style={{
            position: "fixed", left: 24, top: "50%", transform: "translateY(-50%)",
            zIndex: 200,
            display: "flex", alignItems: "center", gap: 7,
            padding: "10px 16px", borderRadius: 999,
            background: "rgba(13,13,11,0.88)", backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.10)",
            color: "rgba(255,255,255,0.60)", fontSize: 13,
            fontFamily: "DM Sans, sans-serif", cursor: "pointer",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 11L5 7L9 3" stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ── Full-width image block (matches Perry Wang reference) ─────────────────────
function CaseImage({
  src, caption, label, fullBleed = false,
}) {
  return (
    <motion.div
      variants={fadeUp} initial="hidden" whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      style={{ marginTop: 40, marginBottom: 8 }}
    >
      {label && (
        <div style={{
          fontFamily: "DM Mono, monospace", fontSize: 10,
          letterSpacing: "0.14em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.22)", marginBottom: 12,
          display: "flex", alignItems: "center", gap: 10,
        }}>
          {label}
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
          <span style={{ color: "rgba(255,255,255,0.18)" }}>IMAGE</span>
        </div>
      )}
      <div style={{
        borderRadius: fullBleed ? 10 : 10,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
        background: "#111113",
      }}>
        <img
          src={src} alt={caption || ""}
          loading="lazy"
          decoding="async"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>
      {caption && (
        <div style={{
          fontFamily: "DM Mono, monospace", fontSize: 11,
          color: "rgba(255,255,255,0.22)", textAlign: "right",
          letterSpacing: "0.05em", marginTop: 8,
        }}>
          {caption}
        </div>
      )}
    </motion.div>
  );
}

// ── Key insight / callout block ───────────────────────────────────────────────
function Callout({ eyebrow, text }) {
  return (
    <motion.div
      variants={fadeUp} initial="hidden" whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      style={{
        margin: "48px 0",
        padding: "36px 40px",
        borderRadius: 12,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        textAlign: "center",
      }}
    >
      <div style={{
        fontFamily: "DM Mono, monospace", fontSize: 10,
        letterSpacing: "0.16em", textTransform: "uppercase",
        color: "rgba(255,255,255,0.28)", marginBottom: 20,
      }}>
        {eyebrow}
      </div>
      <p style={{
        fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 400,
        color: "rgba(255,255,255,0.85)", lineHeight: 1.6,
        letterSpacing: "-0.01em", maxWidth: 680, margin: "0 auto",
        fontFamily: "DM Sans, sans-serif",
      }}>
        {text}
      </p>
    </motion.div>
  );
}

// ── Inline text helpers ───────────────────────────────────────────────────────
const S = { color: "rgba(255,255,255,0.82)", fontWeight: 500 };

// ═══════════════════════════════════════════════════════════════════════════════
// ERP SVG DIAGRAMS
// ═══════════════════════════════════════════════════════════════════════════════
function ErpWorkflowDiagram() {
  const TH = (c) => ({ fontFamily: "DM Sans, sans-serif", fontSize: 14, fontWeight: 500, fill: c });
  const TS = (c) => ({ fontFamily: "DM Mono, monospace", fontSize: 12, fill: c });
  const A = "rgba(255,255,255,0.28)";
  return (
    <svg width="100%" viewBox="0 0 680 844">
      <defs>
        <marker id="wa" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke={A} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></marker>
        <marker id="wa2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></marker>
        <marker id="wa3" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></marker>
      </defs>
      <line x1="238" y1="20" x2="238" y2="224" stroke="#27272a" strokeWidth="0.5" />
      <line x1="238" y1="284" x2="238" y2="484" stroke="#27272a" strokeWidth="0.5" />
      <line x1="238" y1="524" x2="238" y2="724" stroke="#27272a" strokeWidth="0.5" />
      <line x1="238" y1="764" x2="238" y2="804" stroke="#27272a" strokeWidth="0.5" />
      <text style={TS("#4b5563")} x="233" y="122" textAnchor="end">Commercial</text>
      <text style={TS("#4b5563")} x="233" y="382" textAnchor="end">Planning</text>
      <text style={TS("#4b5563")} x="233" y="622" textAnchor="end">Technical</text>
      <text style={TS("#4b5563")} x="233" y="782" textAnchor="end">Execution</text>
      {[["#1a1335", "#7c3aed", "#c4b5fd", "Sales & marketing", 20], ["#1a1335", "#7c3aed", "#c4b5fd", "Customer entry", 100]].map(([f, s, t, l, y]) => (<g key={l}><rect x="250" y={y} width="180" height="44" rx="8" fill={f} stroke={s} strokeWidth="0.5" /><text style={TH(t)} x="340" y={y + 22} textAnchor="middle" dominantBaseline="central">{l}</text></g>))}
      <rect x="250" y="180" width="180" height="44" rx="8" fill="#1a1a20" stroke="#52525b" strokeWidth="0.5" /><text style={TH("#a1a1aa")} x="340" y="202" textAnchor="middle" dominantBaseline="central">Deal closed?</text>
      {[["#0a1f1e", "#0d9488", "#5eead4", "Project creation", 284], ["#0a1f1e", "#0d9488", "#5eead4", "Pre-bid documents", 364], ["#0a1f1e", "#0d9488", "#5eead4", "Requisition", 444]].map(([f, s, t, l, y]) => (<g key={l}><rect x="250" y={y} width="180" height="44" rx="8" fill={f} stroke={s} strokeWidth="0.5" /><text style={TH(t)} x="340" y={y + 22} textAnchor="middle" dominantBaseline="central">{l}</text></g>))}
      {[["#0c1e31", "#2563eb", "#93c5fd", "Bill of materials", 524], ["#0c1e31", "#2563eb", "#93c5fd", "Design & drawing", 604], ["#0c1e31", "#2563eb", "#93c5fd", "Vendor selection", 684]].map(([f, s, t, l, y]) => (<g key={l}><rect x="250" y={y} width="180" height="44" rx="8" fill={f} stroke={s} strokeWidth="0.5" /><text style={TH(t)} x="340" y={y + 22} textAnchor="middle" dominantBaseline="central">{l}</text></g>))}
      <rect x="250" y="764" width="180" height="44" rx="8" fill="#0a1e0e" stroke="#16a34a" strokeWidth="0.5" /><text style={TH("#86efac")} x="340" y="786" textAnchor="middle" dominantBaseline="central">Site execution</text>
      <rect x="470" y="764" width="155" height="44" rx="8" fill="#0a1e0e" stroke="#16a34a" strokeWidth="0.5" /><text style={TH("#86efac")} x="548" y="786" textAnchor="middle" dominantBaseline="central">Workshop ops</text>
      <rect x="50" y="444" width="155" height="44" rx="8" fill="#1c1204" stroke="#d97706" strokeWidth="0.5" /><text style={TH("#fcd34d")} x="128" y="466" textAnchor="middle" dominantBaseline="central">Master data</text>
      {([[340, 64, 340, 100], [340, 144, 340, 180], [340, 224, 340, 284], [340, 328, 340, 364], [340, 408, 340, 444], [340, 488, 340, 524], [340, 568, 340, 604], [340, 648, 340, 684], [340, 728, 340, 764]]).map(([x1, y1, x2, y2], i) => (<line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={A} strokeWidth="1" markerEnd="url(#wa)" />))}
      <line x1="205" y1="466" x2="250" y2="466" stroke="#d97706" strokeWidth="1" markerEnd="url(#wa2)" />
      <line x1="430" y1="786" x2="470" y2="786" stroke="#16a34a" strokeWidth="1" markerEnd="url(#wa3)" />
      <path d="M 250 202 L 175 202 L 175 88 L 340 88 L 340 100" fill="none" stroke="#374151" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#wa)" />
      <text style={TS("#4b5563")} x="62" y="148" textAnchor="start">Negotiation</text>
      <text style={TS("#4b5563")} x="352" y="257" textAnchor="start">Closed</text>
    </svg>
  );
}

function ErpIaDiagram() {
  const TH = (c) => ({ fontFamily: "DM Sans, sans-serif", fontSize: 13, fontWeight: 500, fill: c });
  const TS = (c) => ({ fontFamily: "DM Mono, monospace", fontSize: 11, fill: c });
  return (
    <svg width="100%" viewBox="0 0 680 375">
      <defs><marker id="ia" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="rgba(255,255,255,0.20)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></marker></defs>
      <rect x="20" y="20" width="640" height="335" rx="16" fill="#111113" stroke="#27272a" strokeWidth="0.5" />
      <text style={TH("rgba(255,255,255,0.30)")} x="36" y="46">ERP System — Indiana Sucro-Tech</text>
      <rect x="40" y="64" width="186" height="56" rx="8" fill="#1a1335" stroke="#7c3aed" strokeWidth="0.5" /><text style={TH("#c4b5fd")} x="133" y="84" textAnchor="middle" dominantBaseline="central">Sales & marketing</text><text style={TS("#8b5cf6")} x="133" y="104" textAnchor="middle" dominantBaseline="central">Customers & deals</text>
      <rect x="247" y="64" width="186" height="56" rx="8" fill="#0a1f1e" stroke="#0d9488" strokeWidth="0.5" /><text style={TH("#5eead4")} x="340" y="84" textAnchor="middle" dominantBaseline="central">Project management</text><text style={TS("#14b8a6")} x="340" y="104" textAnchor="middle" dominantBaseline="central">Projects & sites</text>
      <rect x="454" y="64" width="186" height="56" rx="8" fill="#0c1e31" stroke="#2563eb" strokeWidth="0.5" /><text style={TH("#93c5fd")} x="547" y="84" textAnchor="middle" dominantBaseline="central">HR & employees</text><text style={TS("#3b82f6")} x="547" y="104" textAnchor="middle" dominantBaseline="central">People & attendance</text>
      <rect x="40" y="192" width="186" height="56" rx="8" fill="#0a1f1e" stroke="#0d9488" strokeWidth="0.5" /><text style={TH("#5eead4")} x="133" y="212" textAnchor="middle" dominantBaseline="central">Finance & accounts</text><text style={TS("#14b8a6")} x="133" y="232" textAnchor="middle" dominantBaseline="central">Invoices & POs</text>
      <rect x="247" y="192" width="186" height="56" rx="8" fill="#0a1f1e" stroke="#0d9488" strokeWidth="0.5" /><text style={TH("#5eead4")} x="340" y="212" textAnchor="middle" dominantBaseline="central">Workshop & ops</text><text style={TS("#14b8a6")} x="340" y="232" textAnchor="middle" dominantBaseline="central">Dispatch & packing</text>
      <rect x="454" y="192" width="186" height="56" rx="8" fill="#1a1a20" stroke="#52525b" strokeWidth="0.5" /><text style={TH("#a1a1aa")} x="547" y="212" textAnchor="middle" dominantBaseline="central">Super admin</text><text style={TS("#71717a")} x="547" y="232" textAnchor="middle" dominantBaseline="central">Roles & permissions</text>
      {[133, 340, 547].map(x => <line key={x} x1={x} y1="275" x2={x} y2="248" stroke="rgba(255,255,255,0.18)" strokeWidth="1" markerEnd="url(#ia)" />)}
      <rect x="40" y="275" width="600" height="60" rx="8" fill="#1c1204" stroke="#d97706" strokeWidth="0.5" />
      <text style={TH("#fcd34d")} x="340" y="295" textAnchor="middle" dominantBaseline="central">Master data — core of the system</text>
      <text style={TS("#f59e0b")} x="340" y="318" textAnchor="middle" dominantBaseline="central">Materials · vendors · departments · categories · units of measure</text>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// HSN DIAGRAMS
// ═══════════════════════════════════════════════════════════════════════════════
function HsnUserWorkflow() {
  const TH = (c) => ({ fontFamily: "DM Sans, sans-serif", fontSize: 14, fontWeight: 500, fill: c });
  const TS = (c) => ({ fontFamily: "DM Mono, monospace", fontSize: 11, fill: c });
  const A = "rgba(255,255,255,0.30)";
  const steps = [
    { label: "Search product", sub: "Enter name", fill: "#0c1e31", stroke: "#2563eb", txt: "#93c5fd", x: 40 },
    { label: "Select section", sub: "21 categories", fill: "#0a1f1e", stroke: "#0d9488", txt: "#5eead4", x: 155 },
    { label: "Select chapter", sub: "99 chapters", fill: "#0a1f1e", stroke: "#0d9488", txt: "#5eead4", x: 270 },
    { label: "Select heading", sub: "4-digit code", fill: "#1a1335", stroke: "#7c3aed", txt: "#c4b5fd", x: 385 },
    { label: "Subheading", sub: "6-digit code", fill: "#1a1335", stroke: "#7c3aed", txt: "#c4b5fd", x: 500 },
  ];
  return (
    <svg width="100%" viewBox="0 0 680 320">
      <defs>
        <marker id="hs" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke={A} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></marker>
      </defs>
      {steps.map((s, i) => (
        <g key={s.label}>
          <rect x={s.x} y="40" width="108" height="60" rx="8" fill={s.fill} stroke={s.stroke} strokeWidth="0.5" />
          <text style={TH(s.txt)} x={s.x + 54} y="62" textAnchor="middle" dominantBaseline="central">{s.label}</text>
          <text style={TS(s.stroke)} x={s.x + 54} y="84" textAnchor="middle" dominantBaseline="central">{s.sub}</text>
          {i < 4 && <line x1={s.x + 108} y1="70" x2={s.x + 118} y2="70" stroke={A} strokeWidth="1" markerEnd="url(#hs)" />}
        </g>
      ))}
      <line x1="554" y1="100" x2="554" y2="148" stroke={A} strokeWidth="1" markerEnd="url(#hs)" />
      <path d="M 554 148 L 554 168 L 94 168 L 94 180" fill="none" stroke={A} strokeWidth="1" markerEnd="url(#hs)" />
      <rect x="40" y="180" width="600" height="70" rx="10" fill="#0a1e0e" stroke="#16a34a" strokeWidth="0.5" />
      <text style={TH("#86efac")} x="340" y="206" textAnchor="middle" dominantBaseline="central">Final HSN Code — 8 digits</text>
      <text style={TS("#4ade80")} x="340" y="228" textAnchor="middle" dominantBaseline="central">GST Rate · Basic Custom Duty · Customer Duty · BIS Principles · Case Law · Notes</text>
      <rect x="40" y="272" width="186" height="34" rx="6" fill="#1c1204" stroke="#d97706" strokeWidth="0.5" />
      <text style={TH("#fcd34d")} x="133" y="289" textAnchor="middle" dominantBaseline="central">Bulk upload</text>
      <rect x="247" y="272" width="186" height="34" rx="6" fill="#1a1a20" stroke="#52525b" strokeWidth="0.5" />
      <text style={TH("#a1a1aa")} x="340" y="289" textAnchor="middle" dominantBaseline="central">Save & export results</text>
      <rect x="454" y="272" width="186" height="34" rx="6" fill="#1a1a20" stroke="#52525b" strokeWidth="0.5" />
      <text style={TH("#a1a1aa")} x="547" y="289" textAnchor="middle" dominantBaseline="central">View duty benefits</text>
    </svg>
  );
}

function HsnArchDiagram() {
  const TH = (c) => ({ fontFamily: "DM Sans, sans-serif", fontSize: 13, fontWeight: 500, fill: c });
  const TS = (c) => ({ fontFamily: "DM Mono, monospace", fontSize: 11, fill: c });
  const A = "rgba(255,255,255,0.22)";
  return (
    <svg width="100%" viewBox="0 0 680 400">
      <defs><marker id="aa" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke={A} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></marker></defs>
      <rect x="20" y="20" width="185" height="350" rx="12" fill="#111113" stroke="#27272a" strokeWidth="0.5" />
      <text style={TH("rgba(255,255,255,0.50)")} x="113" y="46" textAnchor="middle">Admin backend</text>
      {[["#0c1e31", "#2563eb", "#93c5fd", "HSN Module", 70], ["#0a1f1e", "#0d9488", "#5eead4", "Sections", 128], ["#0a1f1e", "#0d9488", "#5eead4", "Chapters", 176], ["#0a1f1e", "#0d9488", "#5eead4", "Headings", 224], ["#1a1335", "#7c3aed", "#c4b5fd", "Case Law", 272], ["#1a1335", "#7c3aed", "#c4b5fd", "BIS Principles", 320]].map(([f, s, t, l, y]) => (<g key={l}><rect x="36" y={y} width="153" height="36" rx="6" fill={f} stroke={s} strokeWidth="0.5" /><text style={TH(t)} x="113" y={y + 18} textAnchor="middle" dominantBaseline="central">{l}</text></g>))}
      <rect x="250" y="140" width="180" height="120" rx="12" fill="#1c1204" stroke="#d97706" strokeWidth="0.5" />
      <text style={TH("#fcd34d")} x="340" y="175" textAnchor="middle" dominantBaseline="central">Central database</text>
      <text style={TS("#f59e0b")} x="340" y="198" textAnchor="middle" dominantBaseline="central">HSN codes + duties</text>
      <text style={TS("#f59e0b")} x="340" y="216" textAnchor="middle" dominantBaseline="central">policies + notes</text>
      <text style={TS("#f59e0b")} x="340" y="234" textAnchor="middle" dominantBaseline="central">case law + BIS</text>
      <line x1="205" y1="200" x2="250" y2="200" stroke={A} strokeWidth="1" markerEnd="url(#aa)" />
      <rect x="475" y="20" width="185" height="350" rx="12" fill="#111113" stroke="#27272a" strokeWidth="0.5" />
      <text style={TH("rgba(255,255,255,0.50)")} x="568" y="46" textAnchor="middle">Public tool</text>
      {[["#0c1e31", "#2563eb", "#93c5fd", "Search bar", 70], ["#0a1f1e", "#0d9488", "#5eead4", "Section step", 128], ["#0a1f1e", "#0d9488", "#5eead4", "Chapter step", 176], ["#0a1f1e", "#0d9488", "#5eead4", "Heading step", 224], ["#0a1f1e", "#0d9488", "#5eead4", "Subheading step", 272], ["#0a1e0e", "#16a34a", "#86efac", "Final HSN + duties", 320]].map(([f, s, t, l, y]) => (<g key={l}><rect x="491" y={y} width="153" height="36" rx="6" fill={f} stroke={s} strokeWidth="0.5" /><text style={TH(t)} x="568" y={y + 18} textAnchor="middle" dominantBaseline="central">{l}</text></g>))}
      <line x1="430" y1="200" x2="475" y2="200" stroke={A} strokeWidth="1" markerEnd="url(#aa)" />
      <text style={TS("rgba(255,255,255,0.18)")} x="113" y="388" textAnchor="middle">Admin enters data</text>
      <text style={TS("rgba(255,255,255,0.18)")} x="340" y="278" textAnchor="middle">Single source</text>
      <text style={TS("rgba(255,255,255,0.18)")} x="568" y="388" textAnchor="middle">User queries data</text>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
const erpSections = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "The Problem" },
  { id: "process", label: "Process" },
  { id: "workflow", label: "User Workflow" },
  { id: "architecture", label: "Info Architecture" },
  { id: "design-system", label: "Design System" },
  { id: "modules", label: "The Modules" },
  { id: "decisions", label: "Key Decisions" },
  { id: "outcomes", label: "Outcomes" },
];

const hsnSections = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "The Problem" },
  { id: "process", label: "Process" },
  { id: "architecture", label: "System Architecture" },
  { id: "user-workflow", label: "User Workflow" },
  { id: "admin-workflow", label: "Admin Workflow" },
  { id: "screens", label: "Key Screens" },
  { id: "decisions", label: "Key Decisions" },
  { id: "outcomes", label: "Outcomes" },
];

const habitSections = [
  { id: "preview", label: "Preview" },
];

const erpModules = [
  { label: "HR Administration", desc: "560 employees, attendance tracking, grievance management, department distribution, and upcoming celebrations.", img: "/case-studies/erp/HR_Dashboard.jpg", caption: "HR Admin Dashboard" },
  { label: "Employee Self-Service", desc: "Personal view — leave balance, attendance trend, task completion, timesheet, and grievances.", img: "/case-studies/erp/User_Dashboard__personal_.jpg", caption: "Employee Personal Dashboard" },
  { label: "Project Management", desc: "Active projects, task assignments, inspection count, site visits, task completion trend with time filters.", img: "/case-studies/erp/User_Dashboard.jpg", caption: "Project Manager Dashboard" },
  { label: "Site Execution", desc: "On-ground dashboard — inventory distribution, inward/outward reporting, vehicle and material requisitions.", img: "/case-studies/erp/Site_Dashboard.jpg", caption: "Site Execution Dashboard" },
  { label: "Finance & Purchase", desc: "Pre-bid pipeline, supplier management, purchase order approvals, inventory levels, and invoice workflows.", img: "/case-studies/erp/Purchase_Dashboard.jpg", caption: "Finance & Purchase Dashboard" },
  { label: "Sales & Marketing", desc: "Customer visits (320/mo), active deals, ₹4.8M closed revenue, follow-up pipeline, high-probability deals.", img: "/case-studies/erp/sales_and_marketing.jpg", caption: "Sales & Marketing Dashboard" },
  { label: "Workshop Operations", desc: "Material inward/outward tracking, inspection management, active vehicles, and inventory donut overview.", img: "/case-studies/erp/Workshop_Dashboard.jpg", caption: "Workshop Operations Dashboard" },
  { label: "Dispatch & Logistics", desc: "Material out requests, packing material alerts, transport requests, and pending dispatch approvals.", img: "/case-studies/erp/Dispatch_Dashboard.jpg", caption: "Dispatch & Logistics Dashboard" },
];

export default function CaseStudy() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const isHsn = slug === "hsn-workflow";
  const isHabit = slug === "lazy-habit-tracker";
  const sections = isHsn ? hsnSections : (isHabit ? habitSections : erpSections);
  const accent = isHsn ? "#f59e0b" : (isHabit ? "#6d28d9" : "#22c55e");

  const [activeSection, setActiveSection] = useState(sections[0].id);
  const obsRef = useRef(null);

  useEffect(() => {
    setActiveSection(sections[0].id);
    window.scrollTo({ top: 0 });
    if (obsRef.current) obsRef.current.disconnect();
    obsRef.current = new IntersectionObserver(
      (entries) => { entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }); },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    sections.forEach(({ id }) => { const el = document.getElementById(id); if (el) obsRef.current?.observe(el); });
    return () => obsRef.current?.disconnect();
  }, [slug]);

  const scrollTo = (id) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // shared text styles
  const eyebrow = {
    fontFamily: "DM Mono, monospace", fontSize: 11,
    letterSpacing: "0.16em", textTransform: "uppercase",
    color: "rgba(255,255,255,0.28)", marginBottom: 10,
    display: "flex", alignItems: "center", gap: 10,
  };
  const h2 = {
    fontSize: "clamp(24px, 2.8vw, 32px)", fontWeight: 600,
    color: "rgba(255,255,255,0.92)", letterSpacing: "-0.025em",
    marginBottom: 20, lineHeight: 1.12,
    fontFamily: "DM Sans, sans-serif",
  };
  const body = {
    fontSize: 15, lineHeight: 1.8,
    color: "rgba(255,255,255,0.48)", fontWeight: 300,
    marginBottom: 14, fontFamily: "DM Sans, sans-serif",
  };
  const sec = { marginBottom: 96, scrollMarginTop: 100 };

  // accent bar above headings
  const AccentBar = () => (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }} whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        width: 28, height: 2, borderRadius: 999, marginBottom: 14,
        background: `linear-gradient(to right, ${accent}, transparent)`,
        boxShadow: `0 0 10px ${accent}99`,
        transformOrigin: "left",
      }}
    />
  );

  // diagram wrapper with glow border
  const DiagramBox = ({ children, caption }) => (
    <motion.div
      variants={fadeUp} initial="hidden" whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      style={{ marginTop: 32, marginBottom: 8 }}
    >
      <div style={{
        borderRadius: 14,
        padding: 1,
        background: `linear-gradient(135deg, ${accent}28, ${accent}08)`,
        boxShadow: `0 0 40px ${accent}12, inset 0 0 0 1px ${accent}22`,
        overflow: "hidden",
      }}>
        <div style={{ background: "#0f0f0d", borderRadius: 13 }}>{children}</div>
      </div>
      <p style={{ fontFamily: "DM Mono, monospace", fontSize: 11, color: "rgba(255,255,255,0.22)", textAlign: "right", letterSpacing: "0.05em", marginTop: 8 }}>{caption}</p>
    </motion.div>
  );

  return (
    <div style={{ background: "#0f0f0d", minHeight: "100vh", color: "#f4f4f5" }}>
      <FloatingBack onClick={() => navigate("/")} />

      {/* ── HERO HEADER — centered, like Perry Wang reference ─────── */}
      <div style={{ textAlign: "center", padding: "120px 24px 60px", maxWidth: 760, margin: "0 auto" }}>

        {/* Back button (top of page) */}
        <motion.button
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => navigate("/")}
          style={{
            display: "inline-flex", alignItems: "center", gap: 7, marginBottom: 48,
            background: "none", border: "1px solid rgba(255,255,255,0.10)",
            color: "rgba(255,255,255,0.50)", fontSize: 12, fontFamily: "DM Sans, sans-serif",
            borderRadius: 999, padding: "7px 14px", cursor: "pointer",
          }}
        >
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M9 11L5 7L9 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Back to Work
        </motion.button>

        {/* Tags */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 24 }}>
          {(slug === "lazy-habit-tracker"
            ? ["Mobile App", "React Native", "UI/UX", "Personal"]
            : isHsn
              ? ["HSN Classification", "Web App", "Fintech", "Delivered"]
              : ["Enterprise ERP", "Sugar Manufacturing", "6–12 Months", "In Development"]
          ).map(t => (
            <span key={t} style={{
              fontSize: 11, fontFamily: "DM Mono, monospace",
              padding: "4px 12px", borderRadius: 999,
              background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.40)",
              border: "1px solid rgba(255,255,255,0.09)", letterSpacing: "0.04em",
            }}>{t}</span>
          ))}
        </motion.div>

        {/* Big title — centered like the reference */}
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          style={{
            fontSize: "clamp(40px, 6vw, 68px)", fontWeight: 700,
            letterSpacing: "-0.035em", color: "rgba(255,255,255,0.92)",
            lineHeight: 1.05, marginBottom: 16, fontFamily: "DM Sans, sans-serif",
          }}>
          {slug === "lazy-habit-tracker"
            ? "Lazy Habit Tracker"
            : isHsn
              ? "HSN Classification System"
              : "Indiana Sucro-Tech ERP"}
        </motion.h1>

        {/* Subtitle */}
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
          style={{
            fontSize: 16, color: "rgba(255,255,255,0.42)", lineHeight: 1.65,
            marginBottom: 0, fontFamily: "DM Sans, sans-serif", fontWeight: 300,
          }}>
          {slug === "lazy-habit-tracker"
            ? "Personal Project — 2024"
            : isHsn
              ? "PCS — 2023"
              : "Indiana Sucro-Tech — 2024"}
        </motion.p>
      </div>

      {/* ── HERO IMAGE — full width with MacBook frame ─────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        style={{ maxWidth: 960, margin: "0 auto 80px", padding: "0 24px" }}
      >
        {/* MacBook-style container */}
        <div style={{
          borderRadius: 14, overflow: "hidden",
          background: "#1c1c1e",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 40px 100px rgba(0,0,0,0.7)",
        }}>
          {/* Chrome bar */}
          <div style={{
            height: 42, background: "#2c2c2e",
            borderBottom: "1px solid rgba(0,0,0,0.6)",
            display: "flex", alignItems: "center", padding: "0 16px", position: "relative",
          }}>
            <div style={{ display: "flex", gap: 7 }}>
              {[["#ff5f57"], ["#ffbd2e"], ["#28c840"]].map(([c]) => (
                <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
              ))}
            </div>
            <div style={{
              position: "absolute", left: "50%", transform: "translateX(-50%)",
              width: 220, height: 24, background: "rgba(255,255,255,0.06)",
              borderRadius: 6, border: "1px solid rgba(255,255,255,0.07)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontFamily: "DM Mono, monospace", fontSize: 10, color: "rgba(255,255,255,0.22)" }}>
                {slug}.fig
              </span>
            </div>
          </div>
          {/* Screenshot */}
          <img
            src={
              slug === "hsn-workflow"
                ? "/case-studies/hsn/HSN_home.jpg"
                : slug === "lazy-habit-tracker"
                  ? "/mockups/lazy-habit-tracker.png"
                  : "/case-studies/erp/Site_Dashboard.jpg"
            }
            alt="Hero"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
      </motion.div>

      {/* ── 2-COLUMN BODY ──────────────────────────────────────────── */}
      <div style={{
        maxWidth: 1160, margin: "0 auto",
        padding: "0 24px 120px",
        display: "grid",
        gridTemplateColumns: "1fr 160px",
        gap: "0 60px",
        alignItems: "flex-start",
      }}>

        {/* ── CENTER CONTENT (full width feel) ─────────────────────── */}
        <main style={{ minWidth: 0 }}>

          {/* Meta row */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 80 }}>
            {(slug === "lazy-habit-tracker"
              ? [["Role", "Solo Designer"], ["Platform", "iOS / Android"], ["Tool", "Figma"], ["Status", "In Progress"]]
              : isHsn
                ? [["Role", "Solo UI/UX Designer"], ["Duration", "6–12 Months"], ["Tool", "Figma + Prototyping"], ["Status", "Delivered"]]
                : [["Role", "Solo UI/UX Designer"], ["Duration", "6–12 Months"], ["Tool", "Figma + Prototyping"], ["Status", "In Development"]]
            ).map(([k, v]) => (
              <div key={k} style={{
                padding: "16px 18px", borderRadius: 10,
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
              }}>
                <div style={{ fontFamily: "DM Mono, monospace", fontSize: 10, letterSpacing: "0.08em", color: "rgba(255,255,255,0.28)", textTransform: "uppercase", marginBottom: 6 }}>{k}</div>
                <div style={{ fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.82)", fontFamily: "DM Sans, sans-serif" }}>{v}</div>
              </div>
            ))}
          </motion.div>

          {isHsn ? (
            /* ━━━━━━━━━━━━━━━━━━━━━ HSN CONTENT ━━━━━━━━━━━━━━━━━━━━━ */
            <>
              <motion.section
                id="overview"
                style={sec}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <p style={eyebrow}>01 — Overview</p>
                <AccentBar />
                <h2 style={h2}>A two-sided platform for HSN classification — admin backend and public search tool.</h2>
                <p style={body}>The HSN Classification System is a web-based tool for Indian importers, exporters, and businesses to find the correct 8-digit HSN code for any product, along with GST rates, basic customs duty, BIS principles, and case law.</p>
                <p style={body}>I designed both sides end-to-end: a <span style={S}>guided 5-step public classification wizard</span> and a <span style={S}>secure admin backend</span> where the team manages all HSN data — sections, chapters, headings, duty rates, and legal references.</p>
              </motion.section>

              <motion.section id="problem" style={sec} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
                <p style={eyebrow}>02 — The Problem</p>
                <AccentBar />
                <h2 style={h2}>Thousands of codes. Zero guidance. Expensive mistakes.</h2>
                <p style={body}>India's HSN system contains 21 sections, 99 chapters, and thousands of headings. Businesses must declare the correct 8-digit code for every product — an error means wrong GST, penalties, or delayed shipments.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "24px 0" }}>
                  {[["#ef4444", "Importers manually searched PDFs with hundreds of pages"], ["#ef4444", "A wrong HSN code means wrong GST — leading to penalties"], ["#f59e0b", "No visibility into customs duty, BIS compliance, or case law"], ["#f59e0b", "Bulk classifiers had no tool — each product needed individual lookup"], ["#22c55e", "Existing tools were complex, outdated, and had no guided flow"]].map(([c, t]) => (
                    <div key={t} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                      <div style={{ width: 7, height: 7, borderRadius: "50%", background: c, flexShrink: 0 }} />
                      <span style={{ fontSize: 14, color: "rgba(255,255,255,0.62)", fontFamily: "DM Sans, sans-serif" }}>{t}</span>
                    </div>
                  ))}
                </div>
                <Callout eyebrow="Core challenge" text="Make a legally complex, hierarchical classification system feel simple enough for any business owner — without losing accuracy." />
              </motion.section>

              <motion.section id="process" style={sec} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
                <p style={eyebrow}>03 — Process</p>
                <AccentBar />
                <h2 style={h2}>Research → IA → Admin flow → Public flow → Prototype</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 10, margin: "24px 0 28px" }}>
                  {[["01", "Research", "HSN structure & pain points"], ["02", "IA", "Admin & public architecture"], ["03", "Admin", "Data management backend"], ["04", "Public", "Guided classification wizard"], ["05", "Prototype", "Figma + dev handoff"]].map(([n, t, d]) => (
                    <div key={n} style={{ padding: "16px 14px", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <div style={{ fontSize: 18, fontWeight: 700, color: "#f59e0b", marginBottom: 6, fontFamily: "DM Sans, sans-serif" }}>{n}</div>
                      <div style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.80)", marginBottom: 4, lineHeight: 1.3, fontFamily: "DM Sans, sans-serif" }}>{t}</div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", lineHeight: 1.4, fontFamily: "DM Sans, sans-serif" }}>{d}</div>
                    </div>
                  ))}
                </div>
              </motion.section>

              <motion.section id="architecture" style={sec} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
                <p style={eyebrow}>04 — System Architecture</p>
                <AccentBar />
                <h2 style={h2}>Two sides. One database. Total accuracy.</h2>
                <p style={body}>The system is built around a <span style={S}>single source of truth</span> — a central database the admin team populates and the public tool queries in real time. Every code, duty rate, note, and legal reference flows from the admin side.</p>
                <DiagramBox caption="HSN system architecture — admin backend feeds the public classification tool">
                  <HsnArchDiagram />
                </DiagramBox>
              </motion.section>

              <motion.section id="user-workflow" style={sec} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
                <p style={eyebrow}>05 — User Workflow</p>
                <AccentBar />
                <h2 style={h2}>Search → 5 guided steps → Final 8-digit HSN code.</h2>
                <p style={body}>Instead of presenting thousands of codes at once, the tool narrows the search through 5 sequential steps — each filtering options based on the previous selection.</p>
                <DiagramBox caption="End-to-end user classification flow">
                  <HsnUserWorkflow />
                </DiagramBox>
                <CaseImage src="/case-studies/hsn/hsn-workflow.jpg" caption="HSN Classification Finder — 5-step guided workflow" label="0.1 Classification workflow" />
              </motion.section>

              <motion.section id="admin-workflow" style={sec} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
                <p style={eyebrow}>06 — Admin Workflow</p>
                <AccentBar />
                <h2 style={h2}>The backend that powers it all.</h2>
                <p style={body}>The admin panel is structured to mirror the HSN hierarchy — Sections → Chapters → Headings → Subheadings — so data entry follows the same logical tree that users navigate on the public side.</p>
                <CaseImage src="/case-studies/hsn/hsn-admin.png" caption="HSN Module — Admin backend with data table, import/export, and stat overview" label="0.2 Admin module" />
              </motion.section>

              <motion.section id="screens" style={sec} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
                <p style={eyebrow}>07 — Key Screens</p>
                <AccentBar />
                <h2 style={h2}>Three surfaces. Two user types. One system.</h2>
                <CaseImage src="/case-studies/hsn/hsn-home.jpg" caption="Homepage — Search bar, How It Works, Benefits section, Contact form" label="0.1 Homepage" />
                <CaseImage src="/case-studies/hsn/hsn-workflow.jpg" caption="Classification workflow — guided flow with definitions and duty output" label="0.2 Workflow" />
                <CaseImage src="/case-studies/hsn/hsn-admin.png" caption="Admin HSN Module — section, heading, duty %, coverage, exclusions" label="0.3 Admin" />
              </motion.section>

              <motion.section id="decisions" style={sec} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
                <p style={eyebrow}>08 — Key Decisions</p>
                <AccentBar />
                <h2 style={h2}>Turning a legal hierarchy into a human flow.</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 20, margin: "24px 0" }}>
                  {[["01", "Step-by-step over search-all", "Breaking classification into 5 guided steps mirrors how HSN actually works — dramatically reducing wrong selections compared to a single search bar."], ["02", "Definition panel at every step", "Each step shows a plain-English definition. The most requested feature in research — people needed to understand what they were selecting, not just see code numbers."], ["03", "Show all duty information at result", "Most tools showed only the HSN code. The result page shows GST rate, customs duty, BIS requirements, case law, and notes — everything a business needs in one place."], ["04", "Bulk upload for power users", "Importers dealing with hundreds of SKUs needed a different solution. The bulk upload feature processes entire product lists at once."], ["05", "Admin mirrors the public hierarchy", "The admin sidebar follows the exact same structure users navigate on the public side — making data entry intuitive for the operations team."]].map(([n, t, d]) => (
                    <div key={n} style={{ display: "flex", gap: 20, padding: "22px 24px", borderRadius: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <div style={{ fontSize: 20, fontWeight: 700, color: "#f59e0b", flexShrink: 0, fontFamily: "DM Mono, monospace", minWidth: 32 }}>{n}</div>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.85)", marginBottom: 8, fontFamily: "DM Sans, sans-serif" }}>{t}</div>
                        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.46)", lineHeight: 1.75, fontFamily: "DM Sans, sans-serif" }}>{d}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>

              <motion.section id="outcomes" style={sec} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
                <p style={eyebrow}>09 — Outcomes</p>
                <AccentBar />
                <h2 style={h2}>A complex system made simple. Delivered.</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, margin: "24px 0 28px" }}>
                  {[["3", "Surfaces"], ["5", "Step flow"], ["8+", "Admin modules"], ["1", "Designer"]].map(([n, l]) => (
                    <div key={l} style={{ padding: "24px 20px", borderRadius: 12, textAlign: "center", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <div style={{ fontSize: 36, fontWeight: 700, color: "#f59e0b", letterSpacing: "-0.02em", marginBottom: 6, fontFamily: "DM Sans, sans-serif" }}>{n}</div>
                      <div style={{ fontFamily: "DM Mono, monospace", fontSize: 10, color: "rgba(255,255,255,0.32)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{l}</div>
                    </div>
                  ))}
                </div>
                <p style={body}>Delivered as fully annotated Figma files covering both admin and public tool — with component documentation, interactive prototypes, and developer handoff notes.</p>
              </motion.section>
            </>
          ) : isHabit ? (
            /* ━━━━━━━━━━━━━━━━━━━━━ HABIT TRACKER CONTENT (SIMPLIFIED) ━━━━━━━━━━━━━━━━━━━━━ */
            <>
              <motion.section
                id="preview"
                style={sec}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <p style={eyebrow}>01 — Preview</p>
                <AccentBar />
                <h2 style={h2}>Research and design are done. Project is currently in development.</h2>
                <p style={body}>The "Lazy" approach focuses on the <span style={S}>Minimum Viable Habit (MVH)</span> — making habits so small they are "too easy to fail." I have completed the final <span style={S}>research and high-fidelity design phases</span>, and the project is currently in <span style={S}>active development</span>.</p>
                <p style={body}>The full case study and documentation will be uploaded as soon as the development phase is complete. Stay tuned for the release.</p>
              </motion.section>
            </>
          ) : (
            /* ━━━━━━━━━━━━━━━━━━━━━ ERP CONTENT ━━━━━━━━━━━━━━━━━━━━━ */
            <>
              <motion.section
                id="overview"
                style={sec}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <p style={eyebrow}>01 — Overview</p>
                <AccentBar />
                <h2 style={h2}>A complete ERP designed end to end, solo.</h2>
                <p style={body}>Indiana Sucro-Tech is a sugar manufacturing company operating across factory floors, construction sites, purchase departments, HR, and sales — all running as separate silos with no shared digital system.</p>
                <p style={body}>I was brought in as the sole designer to create an enterprise platform that would unify every department. The result: 10 role-specific dashboards, a shared design system, and a fully interactive Figma prototype — all delivered for development handoff.</p>
              </motion.section>

              <motion.section id="problem" style={sec} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
                <p style={eyebrow}>02 — The Problem</p>
                <AccentBar />
                <h2 style={h2}>Six departments. Zero shared system.</h2>
                <p style={body}>Before this ERP, operations were held together by spreadsheets, WhatsApp messages, and paper records.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "24px 0" }}>
                  {[["#22c55e", "HR tracked 560+ employees in Excel sheets"], ["#f59e0b", "Site engineers reported progress over WhatsApp"], ["#f59e0b", "Purchase orders were approved via email chains"], ["#ef4444", "Workshop maintenance had no digital tracking"], ["#ef4444", "Sales follow-ups lived in individual notebooks"]].map(([c, t]) => (
                    <div key={t} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                      <div style={{ width: 7, height: 7, borderRadius: "50%", background: c, flexShrink: 0 }} />
                      <span style={{ fontSize: 14, color: "rgba(255,255,255,0.62)", fontFamily: "DM Sans, sans-serif" }}>{t}</span>
                    </div>
                  ))}
                </div>
                <Callout eyebrow="Core challenge" text="Understanding 10 completely different user roles — each with different needs, different tech literacy, and different workflows." />
              </motion.section>

              <motion.section id="process" style={sec} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
                <p style={eyebrow}>03 — Process</p>
                <AccentBar />
                <h2 style={h2}>Discovery → Architecture → Design → Prototype → Handoff</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 10, margin: "24px 0 28px" }}>
                  {[["01", "Stakeholder Interviews", "Understanding workflows"], ["02", "Info Architecture", "Mapping roles & screens"], ["03", "Design System", "Components before modules"], ["04", "Module Design", "All 10 dashboards"], ["05", "Dev Handoff", "Annotated Figma"]].map(([n, t, d]) => (
                    <div key={n} style={{ padding: "16px 14px", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <div style={{ fontSize: 18, fontWeight: 700, color: "#22c55e", marginBottom: 6, fontFamily: "DM Sans, sans-serif" }}>{n}</div>
                      <div style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.80)", marginBottom: 4, lineHeight: 1.3, fontFamily: "DM Sans, sans-serif" }}>{t}</div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", lineHeight: 1.4, fontFamily: "DM Sans, sans-serif" }}>{d}</div>
                    </div>
                  ))}
                </div>
                <p style={body}>A shared component library was built first — sidebar navigation, metric cards, data tables, form patterns, status chips, charts. Every module was designed using these components, making the product feel like one system.</p>
              </motion.section>

              <motion.section id="workflow" style={sec} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
                <p style={eyebrow}>04 — User Workflow</p>
                <AccentBar />
                <h2 style={h2}>From first client contact to factory execution.</h2>
                <p style={body}>The ERP maps the entire business lifecycle. The <span style={S}>Master Data module</span> is the core — all materials, vendors, and categories must be defined here before any other module can function.</p>
                <DiagramBox caption="End-to-end user workflow — Indiana Sucro-Tech ERP">
                  <ErpWorkflowDiagram />
                </DiagramBox>
              </motion.section>

              <motion.section id="architecture" style={sec} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
                <p style={eyebrow}>05 — Information Architecture</p>
                <AccentBar />
                <h2 style={h2}>Six modules. One foundation.</h2>
                <p style={body}><span style={S}>Master Data is the foundation</span> every module depends on. Commercial modules (Sales, Project, HR) handle people; operational modules (Finance, Workshop, Super Admin) handle execution.</p>
                <DiagramBox caption="System information architecture — Master Data powers all modules">
                  <ErpIaDiagram />
                </DiagramBox>
              </motion.section>

              <motion.section id="design-system" style={sec} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
                <p style={eyebrow}>06 — Design System</p>
                <AccentBar />
                <h2 style={h2}>One system. Ten modules. Zero inconsistency.</h2>
                <p style={body}>Green as the sole primary color. White backgrounds for readability. 4-metric stat row on every dashboard. Green / amber / red status language across all modules — learn it once, it works everywhere.</p>
                <CaseImage src="/case-studies/erp/Role_Management.jpg" caption="Role & Permission Management — Super Admin View" label="0.1 Design system" />
              </motion.section>

              <motion.section id="modules" style={sec} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
                <p style={eyebrow}>07 — The Modules</p>
                <AccentBar />
                <h2 style={h2}>10 role-specific dashboards. One consistent product.</h2>
                {erpModules.map((m, i) => (
                  <motion.div key={m.label} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }} style={{ marginBottom: 56 }}>
                    <p style={{ ...eyebrow, marginBottom: 6 }}>{m.label}</p>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.46)", lineHeight: 1.7, marginBottom: 0, fontFamily: "DM Sans, sans-serif" }}>{m.desc}</p>
                    <CaseImage src={m.img} caption={m.caption} label={`0.${i + 1} ${m.label}`} />
                  </motion.div>
                ))}
              </motion.section>

              <motion.section id="decisions" style={sec} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
                <p style={eyebrow}>08 — Key Decisions</p>
                <AccentBar />
                <h2 style={h2}>Designing for users who had never used enterprise software.</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 20, margin: "24px 0 32px" }}>
                  {[["01", "Role-based navigation", "Factory workers, site engineers, and C-suite managers all use the same platform. The sidebar shows only what each role is permitted to see."], ["02", "The 4-metric card pattern", "Every dashboard opens with the same 4-stat pattern. Any user switching modules knows exactly where to look."], ["03", "Status colors as a language", "Green = approved. Amber = pending. Red = overdue. Applied identically across all 10 modules."], ["04", "Pending Actions as daily driver", "Most users' daily workflow was just clearing pending approvals. Pending Actions became the primary widget on every manager dashboard."]].map(([n, t, d]) => (
                    <div key={n} style={{ display: "flex", gap: 20, padding: "22px 24px", borderRadius: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <div style={{ fontSize: 20, fontWeight: 700, color: "#22c55e", flexShrink: 0, fontFamily: "DM Mono, monospace", minWidth: 32 }}>{n}</div>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.85)", marginBottom: 8, fontFamily: "DM Sans, sans-serif" }}>{t}</div>
                        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.46)", lineHeight: 1.75, fontFamily: "DM Sans, sans-serif" }}>{d}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <CaseImage src="/case-studies/erp/Project_Dashboard.jpg" caption="Project Manager Dashboard — Pending Actions as primary workflow" label="0.1 Key screen" />
              </motion.section>

              <motion.section id="outcomes" style={sec} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
                <p style={eyebrow}>09 — Outcomes</p>
                <AccentBar />
                <h2 style={h2}>10 modules. 50+ screens. 1 designer. Now in development.</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, margin: "24px 0 28px" }}>
                  {[["10", "Dashboards"], ["50+", "Screens"], ["6mo", "Duration"], ["1", "Designer"]].map(([n, l]) => (
                    <div key={l} style={{ padding: "24px 20px", borderRadius: 12, textAlign: "center", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <div style={{ fontSize: 36, fontWeight: 700, color: "#22c55e", letterSpacing: "-0.02em", marginBottom: 6, fontFamily: "DM Sans, sans-serif" }}>{n}</div>
                      <div style={{ fontFamily: "DM Mono, monospace", fontSize: 10, color: "rgba(255,255,255,0.32)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{l}</div>
                    </div>
                  ))}
                </div>
                <p style={body}>The complete ERP was delivered as a fully annotated Figma file. Indiana Sucro-Tech's development team is currently building the platform — once live, it will serve 560+ employees across all factory operations.</p>
                <CaseImage src="/case-studies/erp/Site_Dashboard.jpg" caption="Site Execution Dashboard — Final delivered design" label="Final" />
              </motion.section>
            </>
          )}
        </main>

        {/* ── STICKY TOC (right) — minimal like Perry Wang reference ── */}
        <aside style={{ position: "sticky", top: 96 }}>
          <p style={{
            fontFamily: "DM Mono, monospace", fontSize: 10,
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.22)", marginBottom: 16,
          }}>
            Contents
          </p>
          <div style={{ position: "relative" }}>
            {/* Vertical track */}
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1, background: "rgba(255,255,255,0.07)" }} />
            <nav style={{ display: "flex", flexDirection: "column", gap: 2, paddingLeft: 14 }}>
              {sections.map(s => (
                <button key={s.id} onClick={() => scrollTo(s.id)}
                  style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", padding: "5px 0", cursor: "pointer", fontFamily: "DM Sans, sans-serif", position: "relative" }}>
                  {/* Sliding dot on the track */}
                  {activeSection === s.id && (
                    <motion.div
                      layoutId="toc-indicator"
                      style={{
                        position: "absolute", left: -17, top: "50%",
                        transform: "translateY(-50%)",
                        width: 5, height: 5, borderRadius: "50%",
                        background: accent,
                        boxShadow: `0 0 8px ${accent}cc`,
                      }}
                      transition={{ type: "spring", bounce: 0.25, duration: 0.35 }}
                    />
                  )}
                  <motion.span
                    animate={{
                      color: activeSection === s.id ? "rgba(255,255,255,0.90)" : "rgba(255,255,255,0.25)",
                      fontWeight: activeSection === s.id ? 500 : 400,
                    }}
                    transition={{ duration: 0.22 }}
                    style={{ display: "block", fontSize: 12, lineHeight: 1.55 }}
                  >
                    {s.label}
                  </motion.span>
                </button>
              ))}
            </nav>
          </div>
        </aside>
      </div>
    </div>
  );
}
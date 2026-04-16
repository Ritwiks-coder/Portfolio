import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const icons = ["RG", "✦", "◈", "⬡", "RG"];
const glows  = [
  "rgba(255,255,255,0.15)",
  "rgba(139,92,246,0.40)",
  "rgba(0,212,255,0.35)",
  "rgba(255,180,0,0.35)",
  "rgba(255,255,255,0.15)",
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  // Using location.pathname to derive active tab
  const activeTab = location.pathname === '/info' ? 'info' : 'work';

  const [iconIdx, setIconIdx] = useState(0);

  function handleIconClick() {
    setIconIdx((prev) => (prev + 1) % icons.length);
  }

  return (
    <div 
      className="fixed top-0 left-0 right-0 z-50 h-[64px] md:h-[72px] flex items-center justify-between px-4 md:px-8"
      style={{
        background: "rgba(13,13,11,0.92)",
        backdropFilter: "blur(12px)",
        transform: "translateZ(0)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* ── LEFT ZONE ───────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Logo icon */}
        <div style={{ position:"relative", cursor:"pointer" }} onClick={handleIconClick}>

          {/* Outer pulse ring */}
          <motion.div
            key={iconIdx}
            initial={{ scale:0.8, opacity:0.8 }}
            animate={{ scale:1.8, opacity:0 }}
            transition={{ duration:1.0, ease:"easeOut" }}
            style={{
              position:"absolute", inset:0,
              borderRadius:"14px",
              background: glows[iconIdx],
              pointerEvents:"none",
            }}
          />

          {/* Blur glow behind */}
          <motion.div
            key={`glow-${iconIdx}`}
            initial={{ opacity:0, scale:0.6 }}
            animate={{ opacity:0.6, scale:1 }}
            exit={{ opacity:0 }}
            transition={{ duration:0.4 }}
            style={{
              position:"absolute", inset:"-8px",
              borderRadius:"20px",
              background: glows[iconIdx],
              filter:"blur(12px)",
              pointerEvents:"none",
              zIndex:0,
            }}
          />

          {/* Icon box */}
          <AnimatePresence mode="wait">
            <motion.div
              key={iconIdx}
              initial={{ scale:0.5, opacity:0, rotate:-20 }}
              animate={{ scale:1,   opacity:1, rotate:0   }}
              exit={{    scale:1.3, opacity:0, rotate:20  }}
              transition={{ duration:0.35, ease:[0.16,1,0.3,1] }}
              style={{
                position:"relative", zIndex:1,
                width:32, height:32,
                borderRadius:"8px",
                background:"rgba(255,255,255,0.08)",
                border:`1px solid ${glows[iconIdx]}`,
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:12, fontWeight:700, color:"rgba(255,255,255,0.90)",
                fontFamily:"DM Mono, monospace",
                userSelect:"none",
              }}
            >
              {icons[iconIdx]}
            </motion.div>
          </AnimatePresence>
        </div>
        {/* Text block - Hidden on small mobile */}
        <div className="hidden sm:flex flex-col justify-center">
          <div className="font-sans font-semibold text-[13px] md:text-sm text-white">Rutik Ramdas Gaikwad</div>
          <div className="font-sans text-[10px] md:text-xs text-zinc-500 mt-0.5">UI/UX Designer</div>
        </div>
      </div>

      {/* ── CENTER ZONE ─────────────────────────────────────────────────────── */}
      <div className="relative">
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '2px',
          padding: '3px',
          borderRadius: '999px',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.08)',
          overflow: 'visible',
          position: 'relative'
        }}>
          {['work', 'info'].map((tab) => {
            const isActive = activeTab === tab;
            const label = tab === 'work' ? 'Work' : 'Info';
            const path = tab === 'work' ? '/' : '/info';

            return (
              <button
                key={tab}
                onClick={() => navigate(path)}
                className="relative px-4 sm:px-5 py-1.5 rounded-full cursor-pointer border-none bg-transparent transition-colors duration-300"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  color: isActive ? '#0f0f0d' : 'rgba(255,255,255,0.45)',
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="tab-pill-bg"
                    className="absolute inset-0 rounded-full bg-white/95 z-0"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── RIGHT ZONE ──────────────────────────────────────────────────────── */}
      <div className="hidden md:flex items-center gap-7">
        <a
          href="https://www.behance.net/ritikgaikwad12"
          target="_blank"
          rel="noreferrer"
          className="text-[13px] text-white/45 hover:text-white/85 transition-colors no-underline font-sans"
        >
          Behance ↗
        </a>
        <a
          href="https://www.linkedin.com/in/ritik-gaikwad-17abb6267"
          target="_blank"
          rel="noreferrer"
          className="text-[13px] text-white/45 hover:text-white/85 transition-colors no-underline font-sans"
        >
          LinkedIn ↗
        </a>
        <a
          href="https://drive.google.com/file/d/1Id7CEECKeb06EYRBBkuTOuQZdfzaDFEZ/view?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[13px] text-white/45 hover:text-white/85 transition-colors no-underline font-sans"
        >
          Resume ↗
        </a>
      </div>

      {/* Mobile Action Link (only visible on mobile) */}
      <div className="md:hidden flex items-center">
        <a
          href="mailto:ritikgaikwad109@gmail.com"
          className="text-[12px] font-medium text-white/60 hover:text-white border border-white/10 px-3 py-1.5 rounded-full transition-all"
        >
          Contact
        </a>
      </div>    </div>
  );
}

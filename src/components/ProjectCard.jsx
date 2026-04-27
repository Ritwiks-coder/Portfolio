import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ProjectCard({
  title, company, desc, slug, index,
  glowTop, glowBorder, glowBlob, mockupSrc,
  onHoverEnter, onHoverLeave,
}) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  
  function handleMouseEnter() {
    setHovered(true);
    if (onHoverEnter) onHoverEnter();
  }
  
  function handleMouseLeave() {
    setHovered(false);
    if (onHoverLeave) onHoverLeave();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => navigate(`/case-study/${slug}`)}
      style={{
        position: "relative",
        borderRadius: 14,
        overflow: "hidden",
        cursor: "pointer",
        background: "#161412",
        border: `1px solid ${hovered ? glowBorder : "rgba(255,255,255,0.07)"}`,
        willChange: "transform",
        transition: "border-color 0.4s, transform 0.35s cubic-bezier(0.16,1,0.3,1)",
        transform: hovered ? "translateY(-4px) translateZ(0)" : "translateY(0) translateZ(0)",
        boxShadow: hovered ? `0 20px 40px ${glowBorder}15` : "none",
      }}
    >
      {/* Radial glow blob */}
      <div style={{
        position: "absolute",
        inset: -1,
        borderRadius: 16,
        background: `radial-gradient(ellipse 90% 55% at 50% 0%, ${glowTop} 0%, transparent 60%)`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.4s ease",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      {/* Sweep shimmer */}
      <div style={{
        position: "absolute", top: 0, bottom: 0, left: "-60%", width: "55%",
        background: "linear-gradient(to right, transparent, rgba(255,255,255,0.12) 50%, transparent)",
        transform: "skewX(-12deg)",
        pointerEvents: "none", zIndex: 20,
        animation: hovered ? "sweep 0.75s ease forwards" : "none",
      }} />

      {/* Top accent line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(to right, transparent, ${glowBorder}, transparent)`,
        opacity: hovered ? 1 : 0, transition: "opacity 0.4s", zIndex: 5,
      }} />
      {/* ── Text row ─────────────────────────────────────────────────── */}
      <div
        className="px-6 py-6 sm:px-10 sm:pt-8 sm:pb-6"
        style={{
          display: "flex", alignItems: "flex-start", justifyContent: "space-between",
        }}>
        <div className="flex-1">
          <div style={{
            fontSize: "clamp(18px, 4vw, 22px)", fontWeight: 600,
            color: hovered ? "#f5f5f3" : "rgba(245,245,243,0.92)",
            letterSpacing: "-0.025em", marginBottom: 6,
            transition: "color 0.3s", fontFamily: "DM Sans, sans-serif",
          }}>
            {title}
          </div>
          
          <div className="text-[13px] sm:text-sm text-white/40 font-sans leading-[1.5] font-light">
            <span className="text-white/60 font-medium">{company}</span>
            {" — "}{desc}
          </div>
        </div>
        <div
          className="hidden sm:block"
          style={{
            fontSize: 20,
            color: hovered ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.25)",
            transition: "color 0.3s, transform 0.35s cubic-bezier(0.16,1,0.3,1)",
            transform: hovered ? "translate(4px,-4px)" : "translate(0,0)",
            flexShrink: 0, marginLeft: 18, marginTop: 4,
          }}>
          →
        </div>
      </div>

      {/* ── Floating Browser Window (Inset) ────────────────────────── */}
      <div className="px-8 pb-10 sm:px-24 sm:pb-16">
        <div style={{
          borderRadius: 12, overflow: "hidden",
          background: "#000",
          border: `1px solid ${hovered ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)"}`,
          boxShadow: hovered
            ? `0 30px 90px rgba(0,0,0,0.9), 0 0 0 1px ${glowBorder}40`
            : "0 10px 40px rgba(0,0,0,0.6)",
          transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
          transform: hovered ? "scale(1.015)" : "scale(1)",
        }}>

          {/* Browser Chrome: Tab Bar */}
          <div style={{
            height: 26, background: "#1a1a1a",
            borderBottom: "1px solid rgba(255,255,255,0.03)",
            display: "flex", alignItems: "center",
            padding: "0 10px", gap: 10, position: "relative",
          }}>
            {/* Traffic lights */}
            <div style={{ display: "flex", gap: 5 }}>
              {["#ff5f57", "#ffbd2e", "#28c840"].map((bg) => (
                <div key={bg} style={{ width: 7, height: 7, borderRadius: "50%", background: bg }} />
              ))}
            </div>
            {/* Current Tab */}
            <div className="hidden sm:flex" style={{
              height: 20, background: "#2d2d2d",
              borderRadius: "5px 5px 0 0", padding: "0 10px",
              alignItems: "center", gap: 6,
              border: "1px solid rgba(255,255,255,0.05)",
              borderBottom: "none", marginTop: 7,
            }}>
              <span style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", fontFamily: "DM Mono, monospace" }}>{slug}.fig</span>
              <span style={{ fontSize: 9, color: "rgba(255,255,255,0.2)" }}>×</span>
            </div>
            <div className="hidden sm:block" style={{ fontSize: 12, color: "rgba(255,255,255,0.15)", marginLeft: -4 }}>+</div>
          </div>

          {/* Browser Chrome: Address Bar Row */}
          <div style={{
            height: 28, background: "#2d2d2d",
            display: "flex", alignItems: "center",
            padding: "0 10px", gap: 12,
          }}>
            <div style={{ display: "flex", gap: 10, color: "rgba(255,255,255,0.25)", fontSize: 10 }}>
              <span>←</span><span>→</span><span className="hidden sm:inline">↻</span>
            </div>
            <div style={{
              flex: 1, height: 18, background: "rgba(0,0,0,0.25)",
              borderRadius: 4, border: "1px solid rgba(255,255,255,0.04)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "DM Mono, monospace", fontSize: 9, color: "rgba(255,255,255,0.2)",
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
            }}>
              https://{slug}.design
            </div>
            <div className="hidden sm:block" style={{ width: 12, height: 12, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
          </div>

          {/* ── Mockup Content ─────────── */}
          <div
            className="h-[320px] sm:h-[520px]"
            style={{
              position: "relative",
              width: "100%",
              background: "#0a0a0a",
              overflow: "hidden",
            }}>
            {mockupSrc ? (
              <img
                src={mockupSrc}
                alt={title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top",
                  display: "block",
                  opacity: hovered ? 1 : 0.88,
                  transition: "opacity 0.4s",
                }}
              />
            ) : (
              <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "DM Mono, monospace", fontSize: 10, color: "rgba(255,255,255,0.1)" }}>MOCKUP_MISSING</span>
              </div>
            )}

            {/* Subtle Gradient Overlay */}
            <div style={{
              position: "absolute", inset: 0,
              background: `linear-gradient(to bottom, ${glowBlob} 0%, transparent 60%)`,
              opacity: hovered ? 0.2 : 0,
              transition: "opacity 0.6s", pointerEvents: "none",
            }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
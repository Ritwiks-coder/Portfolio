import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ProjectCard({
  title, company, desc, slug, index,
  glowTop, glowBorder, glowBlob, mockupSrc,
}) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  function handleMouseEnter() {
    setHovered(true);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setHovered(false)}
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
      }}
    >
      {/* Radial glow blob — Fix 3 */}
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

      {/* Sweep shimmer — CSS keyframes Fix 7 */}
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
      <div style={{
        padding: "32px 40px 24px",
        display: "flex", alignItems: "flex-start", justifyContent: "space-between",
      }}>
        <div>
          <div style={{
            fontSize: 22, fontWeight: 600,
            color: hovered ? "#f5f5f3" : "rgba(245,245,243,0.92)",
            letterSpacing: "-0.025em", marginBottom: 6,
            transition: "color 0.3s", fontFamily: "DM Sans, sans-serif",
          }}>
            {title}
          </div>
          <div style={{
            fontSize: 14, color: "rgba(255,255,255,0.42)",
            fontFamily: "DM Sans, sans-serif", lineHeight: 1.5,
            fontWeight: 300,
          }}>
            <span style={{ color: "rgba(255,255,255,0.60)", fontWeight: 500 }}>{company}</span>
            {" — "}{desc}
          </div>
        </div>
        <div style={{
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
      <div style={{ padding: "0 40px 48px" }}>
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
            height: 32, background: "#1a1a1a",
            borderBottom: "1px solid rgba(255,255,255,0.03)",
            display: "flex", alignItems: "center",
            padding: "0 12px", gap: 12, position: "relative",
          }}>
            {/* Traffic lights */}
            <div style={{ display: "flex", gap: 6 }}>
              {["#ff5f57", "#ffbd2e", "#28c840"].map((bg) => (
                <div key={bg} style={{ width: 9, height: 9, borderRadius: "50%", background: bg }} />
              ))}
            </div>
            {/* Current Tab */}
            <div style={{
              height: 24, background: "#2d2d2d",
              borderRadius: "6px 6px 0 0", padding: "0 12px",
              display: "flex", alignItems: "center", gap: 8,
              border: "1px solid rgba(255,255,255,0.05)",
              borderBottom: "none", marginTop: 8,
            }}>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", fontFamily: "DM Mono, monospace" }}>{slug}.fig</span>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)" }}>×</span>
            </div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.15)", marginLeft: -4 }}>+</div>
          </div>

          {/* Browser Chrome: Address Bar Row */}
          <div style={{
            height: 34, background: "#2d2d2d",
            display: "flex", alignItems: "center",
            padding: "0 12px", gap: 15,
          }}>
            <div style={{ display: "flex", gap: 12, color: "rgba(255,255,255,0.25)", fontSize: 12 }}>
              <span>←</span><span>→</span><span>↻</span>
            </div>
            <div style={{
              flex: 1, height: 22, background: "rgba(0,0,0,0.25)",
              borderRadius: 6, border: "1px solid rgba(255,255,255,0.04)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "DM Mono, monospace", fontSize: 10, color: "rgba(255,255,255,0.2)",
            }}>
              https://{slug}.design
            </div>
            <div style={{ width: 14, height: 14, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
          </div>

          {/* ── Mockup Content ─────────── */}
          <div style={{
            position: "relative",
            width: "100%",
            height: 380,
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
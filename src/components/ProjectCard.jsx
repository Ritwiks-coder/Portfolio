import { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ProjectCard({
  title, company, desc, slug, index,
  glowTop, glowBorder, glowBlob, mockupSrc,
}) {
  const navigate  = useNavigate();
  const [hovered, setHovered] = useState(false);
  const sweepAnim = useAnimation();

  async function handleMouseEnter() {
    setHovered(true);
    await sweepAnim.set({ left: "-60%", opacity: 0 });
    sweepAnim.start({
      left: "120%",
      opacity: [0, 0.9, 0.9, 0],
      transition: { duration: 0.75, ease: [0.4, 0, 0.2, 1] },
    });
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
        background: hovered
          ? `radial-gradient(ellipse 90% 50% at 50% 0%, ${glowTop} 0%, #161412 58%)`
          : "#161412",
        border: `1px solid ${hovered ? glowBorder : "rgba(255,255,255,0.07)"}`,
        boxShadow: hovered
          ? `0 0 60px 0 ${glowBlob}, 0 20px 60px rgba(0,0,0,0.55)`
          : "none",
        transition:
          "background 0.5s cubic-bezier(0.16,1,0.3,1), border-color 0.4s, box-shadow 0.5s, transform 0.35s cubic-bezier(0.16,1,0.3,1)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      {/* Sweep shimmer */}
      <motion.div
        animate={sweepAnim}
        style={{
          position: "absolute", top: 0, bottom: 0, left: "-60%", width: "55%",
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.03) 30%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.03) 70%, transparent)",
          transform: "skewX(-12deg)", pointerEvents: "none", zIndex: 20, opacity: 0,
        }}
      />

      {/* Top accent line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(to right, transparent, ${glowBorder}, transparent)`,
        opacity: hovered ? 1 : 0, transition: "opacity 0.4s", zIndex: 5,
      }} />

      {/* ── Text row ─────────────────────────────────────────────────── */}
      <div style={{
        padding: "20px 22px 16px",
        display: "flex", alignItems: "flex-start", justifyContent: "space-between",
      }}>
        <div>
          <div style={{
            fontSize: 19, fontWeight: 600,
            color: hovered ? "#f5f5f3" : "rgba(245,245,243,0.85)",
            letterSpacing: "-0.02em", marginBottom: 5,
            transition: "color 0.3s", fontFamily: "DM Sans, sans-serif",
          }}>
            {title}
          </div>
          <div style={{
            fontSize: 13, color: "rgba(255,255,255,0.38)",
            fontFamily: "DM Sans, sans-serif", lineHeight: 1.4,
          }}>
            <span style={{ color: "rgba(255,255,255,0.52)", fontWeight: 500 }}>{company}</span>
            {" — "}{desc}
          </div>
        </div>
        <div style={{
          fontSize: 20,
          color: hovered ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.20)",
          transition: "color 0.3s, transform 0.35s cubic-bezier(0.16,1,0.3,1)",
          transform: hovered ? "translate(4px,-4px)" : "translate(0,0)",
          flexShrink: 0, marginLeft: 18, marginTop: 2,
        }}>
          →
        </div>
      </div>

      {/* ── MacBook frame ────────────────────────────────────────────── */}
      <div style={{ padding: "0 14px 16px" }}>
        <div style={{
          borderRadius: 10, overflow: "hidden",
          background: "#1c1c1e",
          border: `1px solid ${hovered ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.05)"}`,
          boxShadow: hovered
            ? `0 20px 70px rgba(0,0,0,0.85), 0 0 0 1px ${glowBorder}50`
            : "0 6px 30px rgba(0,0,0,0.55)",
          transition: "box-shadow 0.45s, border-color 0.35s",
        }}>

          {/* Chrome bar */}
          <div style={{
            height: 38, background: "#2c2c2e",
            borderBottom: "1px solid rgba(0,0,0,0.6)",
            display: "flex", alignItems: "center",
            padding: "0 13px", position: "relative", flexShrink: 0,
          }}>
            {/* Traffic lights */}
            <div style={{ display: "flex", gap: 6, alignItems: "center", zIndex: 1 }}>
              {[
                { bg: "#ff5f57", glow: "rgba(255,95,87,0.85)"  },
                { bg: "#ffbd2e", glow: "rgba(255,189,46,0.85)" },
                { bg: "#28c840", glow: "rgba(40,200,64,0.85)"  },
              ].map((d, i) => (
                <div key={i} style={{
                  width: 11, height: 11, borderRadius: "50%",
                  background: d.bg,
                  boxShadow: hovered ? `0 0 7px ${d.glow}` : "none",
                  transition: "box-shadow 0.3s", flexShrink: 0,
                }} />
              ))}
            </div>

            {/* Address bar */}
            <div style={{
              position: "absolute", left: "50%", transform: "translateX(-50%)",
              width: 190, height: 22,
              background: "rgba(255,255,255,0.05)",
              borderRadius: 5, border: "1px solid rgba(255,255,255,0.06)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{
                fontFamily: "DM Mono, monospace", fontSize: 10,
                color: "rgba(255,255,255,0.20)", letterSpacing: "0.03em",
              }}>
                {slug}.fig
              </span>
            </div>

            {/* Right decorative icons */}
            <div style={{ marginLeft: "auto", display: "flex", gap: 8, opacity: 0.15, zIndex: 1 }}>
              {[0, 1].map(i => (
                <div key={i} style={{ width: 13, height: 13, borderRadius: 3, background: "rgba(255,255,255,0.5)" }} />
              ))}
            </div>
          </div>

          {/* ── Screenshot — fixed height, object-fit cover ─────────── */}
          {/*
            Height is fixed at 340px — matches the Perry Wang reference proportions.
            The image is cropped (object-fit: cover, object-position: top) so
            every card is the same height regardless of image dimensions.
          */}
          <div style={{
            position: "relative",
            width: "100%",
            height: 340,           // ← FIXED HEIGHT — same on every card
            background: "#0f0f0d",
            overflow: "hidden",
          }}>
            {mockupSrc ? (
              <img
                src={mockupSrc}
                alt={title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",       // ← crops to fill
                  objectPosition: "top",    // ← shows top of mockup first
                  display: "block",
                  filter: hovered ? "brightness(1.06)" : "brightness(0.82)",
                  transition: "filter 0.45s",
                }}
              />
            ) : (
              <div style={{
                width: "100%", height: "100%",
                background: hovered
                  ? `linear-gradient(135deg, ${glowTop}, #0f0f0d)`
                  : "linear-gradient(135deg, #1a1a1e, #0f0f0d)",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 10,
                transition: "background 0.5s",
              }}>
                <div style={{
                  fontFamily: "DM Mono, monospace", fontSize: 11,
                  color: "rgba(255,255,255,0.16)", letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}>
                  Drop mockup image here
                </div>
                <div style={{
                  fontFamily: "DM Mono, monospace", fontSize: 10,
                  color: "rgba(255,255,255,0.08)",
                }}>
                  public/mockups/{slug}.png
                </div>
              </div>
            )}

            {/* Colour wash on hover */}
            <div style={{
              position: "absolute", inset: 0,
              background: `linear-gradient(to bottom, ${glowTop} 0%, transparent 50%)`,
              opacity: hovered ? 0.25 : 0,
              transition: "opacity 0.5s", pointerEvents: "none",
            }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
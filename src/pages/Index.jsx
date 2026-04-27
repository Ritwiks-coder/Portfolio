import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import ProjectCard from '../components/ProjectCard';

function InfoContent({ mousePos }) {

  const experience = [
    {
      year: "2025 – 2026",
      role: "UI/UX Designer",
      company: "LNETEC",
      type: "Full-time · Startup",
      active: false,
      desc: "Designed end-to-end product experiences for an early-stage startup — including the HSN Classification System and Enterprise ERP.",
    },
  ];

  const education = [
    {
      year: "2024 – Present",
      degree: "M.Voc Software Development",
      school: "PDEA University",
      active: true,
    },
    {
      year: "2021 – 2024",
      degree: "B.Voc Software Development",
      school: "PDEA University",
      active: false,
    },
  ];

  const certifications = [
    {
      name: "UI/UX Design",
      issuer: "Felix Institute",
      icon: "◈",
      url: "https://www.credential.net/fcacaeee-68ec-44b7-b943-215aca6a4406#acc.eA23jgaJ",
      image: "/certificates/Felix IT UI UX certificate.png"
    },
    {
      name: "Google UX Design Certificate",
      issuer: "Google · Coursera",
      icon: "◉",
      url: "https://coursera.org/share/b6cce69bff7e265e61bbe3f5b009f031",
      image: "/certificates/Google certificate.png"
    },
  ];

  const [hoveredCert, setHoveredCert] = useState(null);

  const skills = [
    {
      category: "Design",
      list: ["Figma", "Prototyping", "Design Systems", "User Research", "Wireframing"],
    },
    {
      category: "Front-End",
      list: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "HTML / CSS"],
    },
    {
      category: "Craft",
      list: ["Information Architecture", "Interaction Design", "Visual Design", "UX Writing"],
    },
  ];

  return (
    <motion.div
      key="info"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >

      {/* ── Bio ─────────────────────────────────────────────── */}
      <div style={{ marginBottom: 40 }}>
        <p style={{
          fontSize: "clamp(18px, 4vw, 20px)", fontWeight: 500,
          color: "rgba(245,245,243,0.88)",
          letterSpacing: "-0.02em", lineHeight: 1.5,
          marginBottom: 12,
          fontFamily: "DM Sans, sans-serif",
        }}>
          Rutik Ramdas Gaikwad
        </p>
        <div
          className="text-[14px] text-white/40 leading-[1.8] font-light font-sans"
          style={{ maxWidth: "100%" }}>
          UI/UX Designer & Front-End Developer based in Pune.
          I design digital products that live at the intersection
          of clarity and craft — currently pursuing M.Voc Software
          Development while taking on select design projects.
        </div>
      </div>

      {/* ── Experience ──────────────────────────────────────── */}
      <div style={{ marginBottom: 36 }}>
        <p style={{
          fontFamily: "DM Mono, monospace", fontSize: 10,
          letterSpacing: "0.14em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.22)", marginBottom: 14,
        }}>
          Experience
        </p>

        {experience.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07, duration: 0.35 }}
            style={{
              display: "flex", alignItems: "flex-start", gap: 14,
              padding: "14px 16px", borderRadius: 10,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              marginBottom: 8,
            }}
          >
            {/* Dot */}
            <div style={{
              width: 7, height: 7, borderRadius: "50%",
              background: "rgba(255,255,255,0.30)",
              flexShrink: 0, marginTop: 5,
            }} />
            <div style={{ flex: 1 }}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-y-1 gap-x-3 mb-2">
                <div style={{
                  fontSize: 14, fontWeight: 500,
                  color: "rgba(255,255,255,0.82)",
                  fontFamily: "DM Sans, sans-serif",
                }}>
                  {item.role} · {item.company}
                </div>
                <div style={{
                  fontFamily: "DM Mono, monospace", fontSize: 10,
                  color: "rgba(255,255,255,0.25)", letterSpacing: "0.04em",
                  flexShrink: 0,
                }}>
                  {item.year}
                </div>
              </div>
              <div style={{
                fontSize: 11, color: "rgba(255,255,255,0.28)",
                fontFamily: "DM Mono, monospace", marginBottom: 6,
              }}>
                {item.type}
              </div>
              <div style={{
                fontSize: 13, color: "rgba(255,255,255,0.42)",
                lineHeight: 1.65, fontFamily: "DM Sans, sans-serif",
              }}>
                {item.desc}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Education ───────────────────────────────────────── */}
      <div style={{ marginBottom: 36 }}>
        <p style={{
          fontFamily: "DM Mono, monospace", fontSize: 10,
          letterSpacing: "0.14em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.22)", marginBottom: 14,
        }}>
          Education
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {education.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 + i * 0.07, duration: 0.35 }}
              style={{
                display: "flex", alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 16px", borderRadius: 10,
                background: item.active
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(255,255,255,0.03)",
                border: `1px solid ${item.active
                  ? "rgba(255,255,255,0.10)"
                  : "rgba(255,255,255,0.06)"}`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {/* Dot */}
                <div style={{
                  width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
                  background: item.active
                    ? "#22c55e"
                    : "rgba(255,255,255,0.22)",
                  boxShadow: item.active
                    ? "0 0 8px rgba(34,197,94,0.7)"
                    : "none",
                }} />
                <div>
                  <div style={{
                    fontSize: 13, fontWeight: 500,
                    color: item.active
                      ? "rgba(255,255,255,0.88)"
                      : "rgba(255,255,255,0.55)",
                    fontFamily: "DM Sans, sans-serif",
                    marginBottom: 2,
                  }}>
                    {item.degree}
                  </div>
                  <div style={{
                    fontSize: 11, color: "rgba(255,255,255,0.30)",
                    fontFamily: "DM Mono, monospace",
                  }}>
                    {item.school}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                {item.active && (
                  <div style={{
                    fontSize: 10, fontFamily: "DM Mono, monospace",
                    padding: "3px 8px", borderRadius: 999,
                    background: "rgba(34,197,94,0.12)",
                    color: "#22c55e",
                    border: "1px solid rgba(34,197,94,0.25)",
                    letterSpacing: "0.06em",
                  }}>
                    PURSUING
                  </div>
                )}
                <div style={{
                  fontFamily: "DM Mono, monospace", fontSize: 10,
                  color: "rgba(255,255,255,0.22)",
                }}>
                  {item.year}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Certifications ──────────────────────────────────── */}
      <div style={{ marginBottom: 36 }}>
        <p style={{
          fontFamily: "DM Mono, monospace", fontSize: 10,
          letterSpacing: "0.14em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.22)", marginBottom: 14,
        }}>
          Certifications
        </p>

        <div
          style={{ display: "flex", flexDirection: "column", gap: 8 }}
        >
          {certifications.map((cert, i) => (
            <motion.a
              key={i}
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.35 }}
              style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "12px 16px", borderRadius: 10,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                textDecoration: "none",
                transition: "background 0.2s, border-color 0.2s",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                setHoveredCert(cert);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                setHoveredCert(null);
              }}
            >
              <div style={{
                width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.09)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, color: "rgba(255,255,255,0.55)",
                fontFamily: "DM Mono, monospace",
              }}>
                {cert.icon}
              </div>
              <div>
                <div style={{
                  fontSize: 13, fontWeight: 500,
                  color: "rgba(255,255,255,0.75)",
                  fontFamily: "DM Sans, sans-serif",
                  marginBottom: 2,
                }}>
                  {cert.name}
                </div>
                <div style={{
                  fontSize: 11, color: "rgba(255,255,255,0.28)",
                  fontFamily: "DM Mono, monospace",
                }}>
                  {cert.issuer}
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Floating Certificate Preview */}
        <AnimatePresence>
          {hoveredCert && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: Math.min(mousePos.x + 20, window.innerWidth - 300),
                y: Math.min(mousePos.y + 20, window.innerHeight - 240), 
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", damping: 25, stiffness: 300, mass: 0.6 }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: 280,
                pointerEvents: "none",
                zIndex: 100,
                borderRadius: 12,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.15)",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                background: "rgba(20,20,18,0.9)",
                backdropFilter: "blur(12px)",
                transformOrigin: "center bottom",
              }}
            >
              <motion.img
                src={hoveredCert.image}
                alt={hoveredCert.name}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
                initial={{ filter: "brightness(0.5)" }}
                animate={{ filter: "brightness(1)" }}
              />
              <div style={{
                padding: "10px 14px",
                background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
              }}>
                <div style={{ fontSize: 11, color: "white", fontWeight: 500 }}>{hoveredCert.name}</div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)" }}>{hoveredCert.issuer}</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Skills ──────────────────────────────────────────── */}
      <div style={{ marginBottom: 36 }}>
        <p style={{
          fontFamily: "DM Mono, monospace", fontSize: 10,
          letterSpacing: "0.14em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.22)", marginBottom: 14,
        }}>
          Skills & Tools
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {skills.map((group, gi) => (
            <div key={gi}>
              <div style={{
                fontSize: 11, fontFamily: "DM Mono, monospace",
                color: "rgba(255,255,255,0.28)", letterSpacing: "0.06em",
                marginBottom: 8,
              }}>
                {group.category}
              </div>
              <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                {group.list.map((skill, si) => (
                  <motion.span
                    key={si}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: gi * 0.04 + si * 0.03, duration: 0.28 }}
                    style={{
                      fontSize: 12, padding: "5px 12px",
                      borderRadius: 999,
                      background: "rgba(255,255,255,0.05)",
                      color: "rgba(255,255,255,0.55)",
                      border: "1px solid rgba(255,255,255,0.09)",
                      fontFamily: "DM Sans, sans-serif",
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Stats row ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {[
          ["2", "Projects shipped"],
          ["1.5yr", "Experience"],
          ["2", "Certifications"],
        ].map(([num, label]) => (
          <div key={label} style={{
            padding: "18px 16px", borderRadius: 12,
            textAlign: "center",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}>
            <div style={{
              fontSize: 26, fontWeight: 700,
              color: "rgba(255,255,255,0.85)",
              letterSpacing: "-0.02em", marginBottom: 5,
              fontFamily: "DM Sans, sans-serif",
            }}>
              {num}
            </div>
            <div style={{
              fontFamily: "DM Mono, monospace", fontSize: 10,
              color: "rgba(255,255,255,0.28)", letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}>
              {label}
            </div>
          </div>
        ))}
      </div>

    </motion.div>
  );
}

export default function Home() {
  const [heroHovered, setHeroHovered] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const location = useLocation();
  const activeTab = location.pathname === "/info" ? "info" : "work";

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    setHoveredProject(null);
  }, [activeTab]);

  const projects = [
    {
      title: "Enterprise ERP Model",
      company: "Client, '24",
      desc: "End-to-end ERP system for a sugar manufacturing company.",
      slug: "enterprise-erp",
      about: "A comprehensive enterprise solution designed to unify siloed factory operations into a single digital ecosystem.",
      problemStatement: "Six departments operating in silos with zero shared data, leading to massive inefficiencies and paper-heavy workflows.",
      solution: "Designed 10 role-specific dashboards with a shared design system, centralizing all master data and approvals.",
      glowTop: "rgba(6, 95, 70, 0.60)",
      glowBorder: "rgba(52, 211, 153, 0.45)",
      glowBlob: "rgba(16, 185, 129, 0.25)",
      mockupSrc: "/mockups/enterprise-erp.png",
    },
    {
      title: "HSN Workflow System",
      company: "PCS, '23",
      desc: "Guided 5-step HSN classification tool for importers and exporters.",
      slug: "hsn-workflow",
      about: "A 5-step guided classification tool that simplifies the complex legal process of finding HSN codes for international trade.",
      problemStatement: "Importers manually searching thousands of codes in PDFs, often resulting in expensive legal penalties for wrong declarations.",
      solution: "Created a sequential wizard that filters the HSN hierarchy into human-readable steps with integrated duty info.",
      glowTop: "rgba(223, 136, 13, 0.7)",
      glowBorder: "rgba(235, 153, 10, 0.4)",
      glowBlob: "rgba(236, 181, 19, 0.35)",
      mockupSrc: "/mockups/hsn-workflow.png",
    },
    {
      title: "Habitly — AI & Reward-Led Habits",
      company: "Personal, '24",
      desc: "Reducing habit friction with Claude AI and incentivizing consistency through merchant-led rewards.",
      slug: "lazy-habit-tracker",
      about: "A behavioral habit tracker that uses AI to break down goals and local business rewards to sustain long-term discipline.",
      problemStatement: "Most habit apps fail because they lack immediate external value and have high friction for initial goal setting.",
      solution: "Integrated Claude AI for smart goal expansion and a B2B reward loop that turns streaks into real-world value.",
      glowTop: "rgba(16, 185, 129, 0.55)",   // emerald-green
      glowBorder: "rgba(52, 211, 153, 0.45)",
      glowBlob: "rgba(16, 185, 129, 0.30)",
      mockupSrc: "/mockups/lazy-habit-tracker.png",
    },
  ];



  return (
    <div 
      style={{ backgroundColor: '#0f0f0d', minHeight: '100vh', width: '100%' }}
      onMouseMove={handleMouseMove}
    >
      <div
        className="responsive-container"
        style={{
          paddingTop: 'calc(64px + 32px)', // Navbar height + offset
          paddingBottom: '80px',
        }}>

        <AnimatePresence mode="wait">
          {activeTab === "work" ? (
            <motion.div
              key="work"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* HERO: MAC OS BROWSER WINDOW */}
              <motion.div
                initial={{ opacity: 0, y: 28, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
                onMouseEnter={() => setHeroHovered(true)}
                onMouseLeave={() => setHeroHovered(false)}
                style={{
                  position: "relative",
                  marginBottom: '16px',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.07)',
                  boxShadow: '0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,0,0,0.3)',
                }}
              >
                {/* Sweep line */}
                <div style={{
                  position: "absolute",
                  top: 0, bottom: 0,
                  left: "-60%",
                  width: "50%",
                  background:
                    "linear-gradient(to right, transparent, rgba(255,255,255,0.05) 35%, rgba(255,255,255,0.13) 50%, rgba(255,255,255,0.05) 65%, transparent)",
                  transform: "skewX(-12deg)",
                  pointerEvents: "none",
                  zIndex: 10,
                  animation: heroHovered ? "sweep 0.9s ease forwards" : "none",
                }} />
                {/* WINDOW TITLEBAR */}
                <div style={{
                  height: '40px',
                  background: 'linear-gradient(to bottom, #3d3d3d 0%, #2d2d2d 100%)',
                  borderBottom: '1px solid rgba(0,0,0,0.55)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 14px',
                  position: 'relative'
                }}>
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 0px rgba(255,255,255,0)",
                        "0 0 16px rgba(255,255,255,0.08)",
                        "0 0 0px rgba(255,255,255,0)",
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3,
                      width: 32, height: 32, padding: 5, borderRadius: 8,
                      border: "1.5px solid rgba(255,255,255,0.20)"
                    }}
                  >
                    {[
                      "rgba(255,94,94,0.9)",   // red
                      "rgba(255,189,46,0.9)",  // yellow
                      "rgba(40,200,64,0.9)",   // green
                      "rgba(255,255,255,0.3)", // dim white
                    ].map((color, i) => (
                      <div
                        key={i}
                        style={{
                          background: color,
                          borderRadius: 2,
                          width: "100%", height: "100%",
                          boxShadow: `0 0 6px 1px ${color}, 0 0 14px 2px ${color}`,
                          transition: "box-shadow 0.3s",
                        }}
                      />
                    ))}
                  </motion.div>
                  <div style={{
                    position: 'absolute',
                    right: '14px',
                    fontSize: '18px',
                    color: 'rgba(255,255,255,0.25)',
                    fontWeight: 300,
                    lineHeight: 1
                  }}>
                    +
                  </div>
                </div>

                {/* WINDOW BODY */}
                <div
                  className="flex flex-col min-h-[400px] md:min-h-[440px] relative px-6 py-8 pb-16 md:p-[52px] md:pb-20"
                  style={{
                    background: '#161412',
                    height: '100%'
                  }}>

                  {/* HEADING (top-left) */}
                  <h1 style={{
                    alignSelf: 'flex-start',
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'clamp(46px, 5.8vw, 72px)',
                    fontWeight: 700,
                    lineHeight: 1.06,
                    letterSpacing: '-0.035em',
                    color: '#f5f5f3',
                    margin: 0
                  }}>
                    I craft products,<br />
                    interactions & <span style={{
                      fontFamily: 'var(--font-serif)',
                      fontStyle: 'italic',
                      fontWeight: 500,
                      color: 'rgba(245, 245, 243, 0.52)',
                      letterSpacing: '-0.02em'
                    }}>stories.</span>
                  </h1>

                  {/* SUBTITLE (bottom-right) - Centered or shifted on mobile */}
                  <div className="relative mt-auto mb-10 sm:mb-[52px] self-center sm:self-end text-center sm:text-right">
                    <div className="font-sans text-sm md:text-[15px] font-medium text-white/90">
                      UI/UX Designer & Developer. Based in Pune.
                    </div>
                    <div className="font-sans text-[12px] md:text-sm font-normal text-white/40 mt-1">
                      Previously at LNETEC.
                    </div>
                  </div>

                  {/* DOWN ARROW (absolute center-bottom) */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      bottom: '28px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      color: 'rgba(255,255,255,0.30)',
                      fontSize: '20px',
                      userSelect: 'none',
                      pointerEvents: 'none',
                    }}
                    animate={{ y: [0, 7, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    ↓
                  </motion.div>
                </div>
              </motion.div>

              {/* PROJECT CARDS */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {projects.map((project, index) => (
                  <motion.div
                    key={project.slug}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.15 + index * 0.10, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ProjectCard 
                      {...project} 
                      onHoverEnter={() => setHoveredProject(project)}
                      onHoverLeave={() => setHoveredProject(null)}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <InfoContent mousePos={mousePos} />
          )}
        </AnimatePresence>

        {/* Floating Project Info Card */}
        <AnimatePresence>
          {hoveredProject && activeTab === 'work' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: Math.min(mousePos.x + 20, window.innerWidth - 340),
                y: Math.min(mousePos.y + 20, window.innerHeight - 340),
              }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300, mass: 0.5 }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: 320,
                pointerEvents: "none",
                zIndex: 1000,
                borderRadius: 16,
                padding: "20px",
                background: "rgba(15, 15, 13, 0.85)",
                backdropFilter: "blur(16px)",
                border: `1px solid ${hoveredProject.glowBorder}`,
                boxShadow: `0 20px 50px rgba(0,0,0,0.5), 0 0 20px ${hoveredProject.glowBorder}20`,
              }}
            >
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                style={{ marginBottom: 16 }}
              >
                <div style={{ 
                  fontFamily: "DM Mono, monospace", 
                  fontSize: 10, 
                  color: hoveredProject.glowBorder, 
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 4
                }}>
                  What is this project about?
                </div>
                <div style={{ 
                  fontSize: 13, 
                  color: "rgba(255,255,255,0.85)", 
                  lineHeight: 1.5,
                  fontFamily: "DM Sans, sans-serif"
                }}>
                  {hoveredProject.about}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                style={{ marginBottom: 16 }}
              >
                <div style={{ 
                  fontFamily: "DM Mono, monospace", 
                  fontSize: 10, 
                  color: hoveredProject.glowBorder, 
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 4
                }}>
                  Problem Statement
                </div>
                <div style={{ 
                  fontSize: 13, 
                  color: "rgba(255,255,255,0.6)", 
                  lineHeight: 1.5,
                  fontFamily: "DM Sans, sans-serif"
                }}>
                  {hoveredProject.problemStatement}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                style={{ marginBottom: 20 }}
              >
                <div style={{ 
                  fontFamily: "DM Mono, monospace", 
                  fontSize: 10, 
                  color: hoveredProject.glowBorder, 
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 4
                }}>
                  The Solution
                </div>
                <div style={{ 
                  fontSize: 13, 
                  color: "rgba(255,255,255,0.6)", 
                  lineHeight: 1.5,
                  fontFamily: "DM Sans, sans-serif"
                }}>
                  {hoveredProject.solution}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{ 
                  textAlign: "center",
                  paddingTop: 12,
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  fontFamily: "DM Mono, monospace",
                  fontSize: 10,
                  color: "rgba(255,255,255,0.3)",
                  letterSpacing: "0.05em"
                }}
              >
                Click to view case study →
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { label: "Projects Built",    value: "15+"  },
  { label: "Technologies",      value: "20+"  },
  { label: "Months Experience", value: "12+"  },
  { label: "Dimensions Opened", value: "∞"    },
];

const TRAITS = ["AI Systems", "Full-Stack Dev", "Data Engineering", "VR/AR Builder", "GenAI Products"];

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 40, filter: "blur(6px)" } as const,
  whileInView: { opacity: 1, y: 0,  filter: "blur(0)"  } as const,
  viewport:    { once: true, margin: "-80px" } as const,
  transition:  { duration: 0.75, delay, ease: [0.0, 0.0, 0.2, 1] } as const,
});

export default function About() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      id="about"
      ref={ref}
      style={{
        padding: "8rem 1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dimensional portal shimmer background */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(76,29,149,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="section-container">
        {/* Section label */}
        <motion.div {...fadeUp(0)} style={{ textAlign: "center", marginBottom: "1rem" }}>
          <p className="section-label">✦ Tome of Origins ✦</p>
        </motion.div>

        {/* Section title */}
        <motion.h2
          {...fadeUp(0.1)}
          style={{
            fontFamily: "'Cinzel', var(--font-orbitron), serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            textAlign: "center",
            marginBottom: "4rem",
            background: "linear-gradient(135deg, #fcd34d, #f97316, #a78bfa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          The Mystic&apos;s Chronicle
        </motion.h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            alignItems: "start",
          }}
          className="about-grid"
        >
          {/* Left — Spellbook pages */}
          <motion.div {...fadeUp(0.2)}>
            <div
              className="glass-card"
              style={{
                padding: "2.5rem",
                position: "relative",
                border: "1px solid rgba(249,115,22,0.2)",
              }}
            >
              {/* Book binding line */}
              <div
                style={{
                  position: "absolute",
                  top: 0, bottom: 0, left: "2.2rem",
                  width: 1,
                  background: "linear-gradient(180deg, transparent, rgba(249,115,22,0.3), transparent)",
                }}
              />

              <h3
                style={{
                  fontFamily: "'Cinzel', var(--font-orbitron), serif",
                  fontSize: "1.1rem",
                  color: "#fb923c",
                  marginBottom: "1.25rem",
                  textShadow: "0 0 12px rgba(249,115,22,0.4)",
                }}
              >
                Chapter I — The Engineer
              </h3>
              <p
                style={{
                  color: "#94a3b8",
                  lineHeight: 1.85,
                  marginBottom: "1.25rem",
                  fontSize: "0.95rem",
                }}
              >
                A software engineer who weaves code the way sorcerers weave spells — with precision,
                  creativity, and a relentless drive to push limits. Currently a{" "}
                  <span style={{ color: "#fb923c" }}>Data Software Engineer Intern at EPAM Systems</span>,
                  architecting real-time ETL pipelines that process 10M+ records with sub-minute latency
                  on Azure Databricks.
                </p>
                <p
                  style={{
                    color: "#94a3b8",
                    lineHeight: 1.85,
                    fontSize: "0.95rem",
                  }}
                >
                  I build intelligent data pipelines, deploy conversational AI systems, and craft
                  full-stack applications — bridging the mystical realms of data engineering and
                  modern software development.
                </p>

              <div
                style={{
                  marginTop: "1.75rem",
                  padding: "1rem 1.25rem",
                  borderRadius: "0.5rem",
                  background: "rgba(249,115,22,0.06)",
                  border: "1px solid rgba(249,115,22,0.18)",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Cinzel', var(--font-orbitron), serif",
                    fontSize: "0.72rem",
                    letterSpacing: "0.2em",
                    color: "#f97316",
                    marginBottom: "0.5rem",
                    textTransform: "uppercase",
                  }}
                >
                  Current Realm
                </p>
                <p style={{ color: "#e2e8f0", fontSize: "0.9rem", fontWeight: 500 }}>
                  Data Software Engineer Intern @ EPAM Systems
                </p>
                <p style={{ color: "#64748b", fontSize: "0.78rem", marginTop: "0.3rem" }}>
                  GLA University · B.Tech CS (IIoT) · CGPA 8.08 · 2022–2026
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right — Mystical traits + quote */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <motion.div {...fadeUp(0.3)}>
              <div
                className="glass-card"
                style={{
                  padding: "2rem",
                  border: "1px solid rgba(124,58,237,0.2)",
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Cinzel', var(--font-orbitron), serif",
                    fontSize: "1rem",
                    color: "#a78bfa",
                    marginBottom: "1.25rem",
                    textShadow: "0 0 12px rgba(124,58,237,0.4)",
                  }}
                >
                  Chapter II — The Arts
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                  {TRAITS.map((t, i) => (
                    <motion.span
                      key={t}
                      whileHover={{ scale: 1.05 }}
                      style={{
                        padding: "0.35rem 0.9rem",
                        borderRadius: "2rem",
                        background:
                          i % 2 === 0
                            ? "rgba(249,115,22,0.1)"
                            : "rgba(124,58,237,0.1)",
                        border: `1px solid ${i % 2 === 0 ? "rgba(249,115,22,0.35)" : "rgba(124,58,237,0.35)"}`,
                        color: i % 2 === 0 ? "#fb923c" : "#a78bfa",
                        fontSize: "0.78rem",
                        fontWeight: 500,
                        cursor: "default",
                        transition: "all 0.2s",
                      }}
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Mystical quote */}
            <motion.div {...fadeUp(0.4)}>
              <div
                style={{
                  padding: "1.75rem",
                  borderRadius: "1rem",
                  background: "rgba(7,5,16,0.7)",
                  borderLeft: "3px solid #f97316",
                  boxShadow: "-4px 0 20px rgba(249,115,22,0.15)",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Cinzel', var(--font-orbitron), serif",
                    fontSize: "1rem",
                    fontStyle: "italic",
                    color: "#e2e8f0",
                    lineHeight: 1.7,
                    textShadow: "0 0 8px rgba(249,115,22,0.2)",
                  }}
                >
                  &ldquo;The code is the spell. The architecture is the sorcery.
                  Every function a dimension waiting to be opened.&rdquo;
                </p>
                <p
                  style={{
                    marginTop: "0.75rem",
                    fontSize: "0.75rem",
                    letterSpacing: "0.2em",
                    color: "#f97316",
                    fontFamily: "'Cinzel', var(--font-orbitron), serif",
                  }}
                >
                  — Sanyam Sachan
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats row */}
        <motion.div
          {...fadeUp(0.5)}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.5rem",
            marginTop: "4rem",
          }}
          className="stats-grid"
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              whileHover={{ y: -4 }}
              style={{
                textAlign: "center",
                padding: "1.5rem",
                borderRadius: "1rem",
                background: "rgba(7,5,16,0.8)",
                border: "1px solid rgba(249,115,22,0.15)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(249,115,22,0.4)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(249,115,22,0.1)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(249,115,22,0.15)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  fontFamily: "'Cinzel', var(--font-orbitron), serif",
                  fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                  fontWeight: 800,
                  background: i % 2 === 0
                    ? "linear-gradient(135deg, #fcd34d, #f97316)"
                    : "linear-gradient(135deg, #a78bfa, #7c3aed)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  lineHeight: 1,
                  marginBottom: "0.4rem",
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontSize: "0.72rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#94a3b8",
                  fontFamily: "'Cinzel', var(--font-orbitron), serif",
                }}
              >
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}

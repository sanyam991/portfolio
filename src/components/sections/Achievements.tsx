"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface Achievement {
  value: number;
  suffix: string;
  label: string;
  icon: string;
  color: string;
  description: string;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    value: 15,   suffix: "+",  label: "Projects Built",       icon: "◈", color: "#f97316",
    description: "Full-stack, AI, VR, and data engineering projects shipped to production or open-sourced.",
  },
  {
    value: 20,   suffix: "+",  label: "Technologies",         icon: "◉", color: "#7c3aed",
    description: "Languages, frameworks, and tools mastered across multiple engineering domains.",
  },
  {
    value: 3,    suffix: "",   label: "Dimensions Mastered",  icon: "◎", color: "#3b82f6",
    description: "AI/ML, Full-Stack Web, and Data Engineering — three complete pillars of modern engineering.",
  },
  {
    value: 5,    suffix: "+",  label: "Months Experience",    icon: "⬡", color: "#dc2626",
    description: "Professional experience at EPAM Systems as Data Software Engineer Intern.",
  },
  {
    value: 400,  suffix: "+",  label: "LeetCode Problems",    icon: "✦", color: "#0ea5e9",
    description: "Competitive programming problems solved across arrays, trees, graphs, DP and system design.",
  },
  {
    value: 50,   suffix: "+",  label: "GitHub Contributions", icon: "᛭", color: "#a78bfa",
    description: "Open source contributions, repositories, and collaborative projects.",
  },
];

function CountUp({ target, suffix, color }: { target: number; suffix: string; color: string }) {
  const [count, setCount] = useState(0);
  const ref  = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 1800;
    const raf = requestAnimationFrame(function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    });
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <span
      ref={ref}
      style={{
        fontFamily: "'Cinzel', var(--font-orbitron), serif",
        fontSize: "clamp(2rem, 4vw, 2.8rem)",
        fontWeight: 800,
        color,
        textShadow: `0 0 16px ${color}60`,
        lineHeight: 1,
      }}
    >
      {count.toLocaleString()}{suffix}
    </span>
  );
}

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 40 } as const,
  whileInView: { opacity: 1, y: 0  } as const,
  viewport:    { once: true, margin: "-60px" } as const,
  transition:  { duration: 0.7, delay, ease: [0.0, 0.0, 0.2, 1] } as const,
});

export default function Achievements() {
  return (
    <section id="achievements" style={{ padding: "8rem 1.5rem", position: "relative", overflow: "hidden" }}>
      {/* Background glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "700px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(76,29,149,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="section-container">
        <motion.div {...fadeUp(0)} style={{ textAlign: "center", marginBottom: "1rem" }}>
          <p className="section-label">✦ Arcane Records ✦</p>
        </motion.div>
        <motion.h2
          {...fadeUp(0.1)}
          style={{
            fontFamily: "'Cinzel', var(--font-orbitron), serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            textAlign: "center",
            marginBottom: "1rem",
            background: "linear-gradient(135deg, #93c5fd, #3b82f6, #a78bfa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          By the Numbers
        </motion.h2>
        <motion.p
          {...fadeUp(0.15)}
          style={{
            textAlign: "center",
            color: "#94a3b8",
            fontSize: "0.95rem",
            maxWidth: 500,
            margin: "0 auto 4rem",
          }}
        >
          The scrolls of achievement — a record of dimensions conquered and spells mastered.
        </motion.p>

        {/* Achievement grid */}
        <div
          className="achievements-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {ACHIEVEMENTS.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: i * 0.08, ease: [0.0, 0.0, 0.2, 1] }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="glass-card"
              style={{
                padding: "2rem",
                border: `1px solid ${a.color}20`,
                position: "relative",
                overflow: "hidden",
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = `${a.color}45`;
                el.style.boxShadow = `0 0 25px ${a.color}10`;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = `${a.color}20`;
                el.style.boxShadow = "none";
              }}
            >
              {/* Background rune */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  bottom: 8,
                  right: 12,
                  fontSize: "3.5rem",
                  color: a.color,
                  opacity: 0.05,
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              >
                {a.icon}
              </div>

              {/* Icon */}
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "0.6rem",
                  background: `${a.color}12`,
                  border: `1px solid ${a.color}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.25rem",
                  fontSize: "1.3rem",
                  color: a.color,
                  filter: `drop-shadow(0 0 6px ${a.color}60)`,
                }}
              >
                {a.icon}
              </div>

              {/* Counter */}
              <div style={{ marginBottom: "0.4rem" }}>
                <CountUp target={a.value} suffix={a.suffix} color={a.color} />
              </div>

              {/* Label */}
              <p
                style={{
                  fontFamily: "'Cinzel', var(--font-orbitron), serif",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#e2e8f0",
                  marginBottom: "0.6rem",
                }}
              >
                {a.label}
              </p>

              {/* Description */}
              <p style={{ fontSize: "0.75rem", color: "#64748b", lineHeight: 1.55 }}>
                {a.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

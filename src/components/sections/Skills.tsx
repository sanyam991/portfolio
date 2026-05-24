"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Skill { name: string; level: number; color: string }
interface SkillCategory { label: string; icon: string; color: string; borderColor: string; skills: Skill[] }

const CATEGORIES: SkillCategory[] = [
  {
    label: "Languages",
    icon: "◈",
    color: "#f97316",
    borderColor: "rgba(249,115,22,0.3)",
    skills: [
      { name: "Python", level: 78, color: "#f97316" },
      { name: "Java",   level: 85, color: "#fb923c" },
      { name: "SQL",    level: 88, color: "#fcd34d" },
      { name: "C",      level: 75, color: "#60a5fa" },
      { name: "Bash",   level: 70, color: "#94a3b8" },
    ],
  },
  {
    label: "Backend",
    icon: "◉",
    color: "#7c3aed",
    borderColor: "rgba(124,58,237,0.3)",
    skills: [
      { name: "FastAPI",               level: 85, color: "#0ea5e9" },
      { name: "Spring Boot",           level: 70, color: "#a78bfa" },
      { name: "Django REST Framework", level: 68, color: "#7c3aed" },
      { name: "REST APIs",             level: 90, color: "#8b5cf6" },
      { name: "Microservices",         level: 82, color: "#c4b5fd" },
    ],
  },
  {
    label: "Big Data",
    icon: "◑",
    color: "#3b82f6",
    borderColor: "rgba(59,130,246,0.3)",
    skills: [
      { name: "Apache Spark",    level: 88, color: "#60a5fa" },
      { name: "Apache Kafka",    level: 85, color: "#3b82f6" },
      { name: "Kafka Streams",   level: 80, color: "#93c5fd" },
      { name: "ETL Pipelines",   level: 90, color: "#3b82f6" },
      { name: "Azure Databricks",level: 85, color: "#60a5fa" },
      { name: "Delta Lake",      level: 82, color: "#93c5fd" },
    ],
  },
  {
    label: "Cloud / DevOps",
    icon: "⬡",
    color: "#dc2626",
    borderColor: "rgba(220,38,38,0.3)",
    skills: [
      { name: "AWS (EC2, S3, IAM)", level: 82, color: "#f87171" },
      { name: "Azure",              level: 80, color: "#dc2626" },
      { name: "Docker",             level: 88, color: "#ef4444" },
      { name: "Kubernetes / AKS",   level: 78, color: "#f87171" },
      { name: "CI/CD",              level: 78, color: "#fca5a5" },
    ],
  },
  {
    label: "Databases",
    icon: "◎",
    color: "#0ea5e9",
    borderColor: "rgba(14,165,233,0.3)",
    skills: [
      { name: "PostgreSQL",     level: 85, color: "#38bdf8" },
      { name: "MySQL",          level: 80, color: "#0ea5e9" },
      { name: "MongoDB",        level: 72, color: "#4ade80" },
      { name: "Pinecone (VDB)", level: 78, color: "#7dd3fc" },
    ],
  },
  {
    label: "AI / ML",
    icon: "✦",
    color: "#a78bfa",
    borderColor: "rgba(167,139,250,0.3)",
    skills: [
      { name: "LangChain / LangGraph", level: 85, color: "#a78bfa" },
      { name: "RAG",                  level: 82, color: "#c4b5fd" },
      { name: "Prompt Engineering",   level: 85, color: "#a78bfa" },
      { name: "OpenAI APIs",          level: 80, color: "#c4b5fd" },
      { name: "Pandas",               level: 70, color: "#a78bfa" },
      { name: "NumPy",                level: 75, color: "#c4b5fd" },
    ],
  },
  {
    label: "Tools",
    icon: "᛭",
    color: "#94a3b8",
    borderColor: "rgba(148,163,184,0.3)",
    skills: [
      { name: "Git / GitHub", level: 92, color: "#e2e8f0" },
      { name: "Linux",        level: 80, color: "#94a3b8" },
      { name: "Postman",      level: 85, color: "#cbd5e1" },
      { name: "Streamlit",    level: 80, color: "#94a3b8" },
    ],
  },
];

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 40 } as const,
  whileInView: { opacity: 1, y: 0  } as const,
  viewport:    { once: true, margin: "-60px" } as const,
  transition:  { duration: 0.7, delay, ease: [0.0, 0.0, 0.2, 1] } as const,
});

function SkillOrb({ skill, accent }: { skill: Skill; accent: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="skill-orb"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.06, y: -3 }}
      style={{
        position: "relative",
        padding: "0.6rem 0.9rem",
        borderRadius: "0.6rem",
        background: hovered
          ? `rgba(${skill.color === "#f97316" ? "249,115,22" : "124,58,237"},0.12)`
          : "rgba(7,5,16,0.8)",
        border: `1px solid ${hovered ? skill.color + "80" : "rgba(255,255,255,0.07)"}`,
        boxShadow: hovered ? `0 0 16px ${skill.color}30` : "none",
        transition: "all 0.25s ease",
        cursor: "default",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
        <span style={{ fontSize: "0.78rem", color: "#e2e8f0", fontWeight: 500 }}>{skill.name}</span>
        <span style={{ fontSize: "0.68rem", color: skill.color, fontWeight: 600 }}>{skill.level}%</span>
      </div>
      {/* Progress bar */}
      <div style={{ height: 3, borderRadius: 2, background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          style={{
            height: "100%",
            background: `linear-gradient(90deg, ${skill.color}90, ${skill.color})`,
            boxShadow: `0 0 6px ${skill.color}60`,
            borderRadius: 2,
          }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section
      id="skills"
      style={{ padding: "8rem 1.5rem", position: "relative", overflow: "hidden" }}
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "40%",
          right: "10%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="section-container">
        <motion.div {...fadeUp(0)} style={{ textAlign: "center", marginBottom: "1rem" }}>
          <p className="section-label">✦ Arcane Arsenal ✦</p>
        </motion.div>
        <motion.h2
          {...fadeUp(0.1)}
          style={{
            fontFamily: "'Cinzel', var(--font-orbitron), serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            textAlign: "center",
            marginBottom: "1rem",
            background: "linear-gradient(135deg, #a78bfa, #7c3aed, #f97316)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Mastered Dimensions
        </motion.h2>
        <motion.p
          {...fadeUp(0.15)}
          style={{
            textAlign: "center",
            color: "#94a3b8",
            fontSize: "0.95rem",
            marginBottom: "3.5rem",
            maxWidth: 520,
            margin: "0 auto 3.5rem",
          }}
        >
          Each technology is a spell I&apos;ve mastered — a dimension of knowledge unlocked through practice.
        </motion.p>

        {/* Category tabs */}
        <motion.div
          {...fadeUp(0.2)}
          className="skills-tabs"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.6rem",
            justifyContent: "center",
            marginBottom: "2.5rem",
          }}
        >
          {CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat.label}
              onClick={() => setActiveCategory(i)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.5rem 1.1rem",
                borderRadius: "2rem",
                background: activeCategory === i
                  ? `${cat.color}18`
                  : "rgba(7,5,16,0.8)",
                border: `1px solid ${activeCategory === i ? cat.color + "60" : "rgba(255,255,255,0.08)"}`,
                color: activeCategory === i ? cat.color : "#94a3b8",
                fontSize: "0.72rem",
                fontWeight: 500,
                letterSpacing: "0.05em",
                cursor: "pointer",
                transition: "all 0.25s",
                boxShadow: activeCategory === i ? `0 0 12px ${cat.color}20` : "none",
              }}
            >
              <span style={{ fontSize: "0.9rem" }}>{cat.icon}</span>
              <span>{cat.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div
            className="glass-card"
            style={{
              padding: "2.5rem",
              borderColor: CATEGORIES[activeCategory].borderColor,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Category header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "2rem",
              }}
            >
              <span
                style={{
                  fontSize: "1.5rem",
                  color: CATEGORIES[activeCategory].color,
                  filter: `drop-shadow(0 0 8px ${CATEGORIES[activeCategory].color})`,
                }}
              >
                {CATEGORIES[activeCategory].icon}
              </span>
              <h3
                style={{
                  fontFamily: "'Cinzel', var(--font-orbitron), serif",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: CATEGORIES[activeCategory].color,
                  textShadow: `0 0 12px ${CATEGORIES[activeCategory].color}60`,
                }}
              >
                {CATEGORIES[activeCategory].label}
              </h3>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "0.75rem",
              }}
            >
              {CATEGORIES[activeCategory].skills.map(skill => (
                <SkillOrb
                  key={skill.name}
                  skill={skill}
                  accent={CATEGORIES[activeCategory].color}
                />
              ))}
            </div>

            {/* Corner rune decoration */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                bottom: 16,
                right: 16,
                fontSize: "4rem",
                color: CATEGORIES[activeCategory].color,
                opacity: 0.06,
                fontFamily: "var(--font-jetbrains-mono), monospace",
                userSelect: "none",
                pointerEvents: "none",
              }}
            >
              {CATEGORIES[activeCategory].icon}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  tech: string[];
  color: string;
  accent: string;
  icon: string;
  link?: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "ParkSmart AI — Enterprise Parking Platform",
    category: "Generative AI",
    description: "LangGraph 6-node state-machine AI platform with RAG-powered Q&A, human-in-the-loop admin approval, SMTP notifications, and MCP persistence. 209 automated tests.",
    longDescription: "Architected an AI-driven reservation system using a LangGraph 6-node state machine orchestrating RAG-powered Q&A, human-in-the-loop admin approval, SMTP notifications, and MCP-based persistence end-to-end. Engineered a RAG pipeline with Pinecone vector DB + LangChain for semantic search; built FastAPI + SQLAlchemy backend with Presidio PII redaction, spaCy injection detection, and real-time slot management across 650+ spaces. Delivered full DevOps pipeline with GitHub Actions CI/CD (3 workflows), Docker multi-stage builds, and Terraform IaC — validated by 209 automated tests across 14 modules with zero regressions.",
    tech: ["Python", "LangGraph", "FastAPI", "Pinecone", "Docker", "Terraform", "LangChain"],
    color: "#f97316",
    accent: "rgba(249,115,22,0.15)",
    icon: "◈",
    link: "https://github.com/sanyam991/parking-chatbot",
  },
  {
    id: 2,
    title: "GenAI Customer Support Chatbot",
    category: "Generative AI",
    description: "Production-grade conversational AI using LangChain and OpenAI GPT with stateful multi-turn dialogue and RAG patterns that cut hallucination rate by 35%.",
    longDescription: "Designed and deployed a production-grade conversational AI system using LangChain and OpenAI GPT API, implementing stateful multi-turn dialogue with context-window management to maintain conversation history across 20+ turn exchanges. Engineered a modular REST API backend with prompt chaining and RAG patterns, reducing hallucination rate and improving response relevance by 35% over baseline zero-shot prompting. Built an interactive Streamlit frontend with real-time streaming responses, cutting average response latency to under 2 seconds.",
    tech: ["Python", "LangChain", "OpenAI API", "REST APIs", "Streamlit"],
    color: "#a78bfa",
    accent: "rgba(167,139,250,0.15)",
    icon: "✦",
    link: "https://github.com/sanyam991/genai-chatbot-project",
  },
  {
    id: 3,
    title: "Women Safety Application",
    category: "Full Stack",
    description: "Full-stack safety platform with real-time SOS alerts, live GPS sharing via Twilio API, voice-triggered emergency actions, and multilingual support.",
    longDescription: "Built a full-stack emergency response platform using Django REST Framework with real-time SOS alerts, live GPS tracking, and emergency notifications via Twilio API to pre-configured emergency contacts with sub-3-second notification delivery. Implemented voice-triggered emergency actions, fake-call simulation, automated camera recording, and multilingual accessibility backed by secure PostgreSQL incident management.",
    tech: ["Django", "REST APIs", "Twilio API", "PostgreSQL", "JavaScript"],
    color: "#dc2626",
    accent: "rgba(220,38,38,0.15)",
    icon: "⬡",
    link: "https://github.com/sanyam991/womens-safety-app",
  },
  {
    id: 4,
    title: "Real-time ETL Data Pipeline",
    category: "Data Engineering",
    description: "End-to-end batch & streaming ETL on Azure Databricks with Medallion Architecture, processing 10M+ records. Kafka at 50K+ events/sec with AES-256 PII encryption.",
    longDescription: "Architected and deployed end-to-end batch and real-time ETL pipelines using Apache Spark and Structured Streaming on Azure Databricks, processing 10M+ records with sub-minute latency. Designed Medallion Architecture (Bronze/Silver/Gold) on Delta Lake with Auto Loader — reduced data ingestion failures by 40% across 5+ heterogeneous sources. Built Kafka streaming at 50K+ events/sec, containerized on AKS with Docker. Implemented AES-256 encryption for PII and geospatial enrichment.",
    tech: ["Apache Spark", "Kafka", "Azure Databricks", "Delta Lake", "AKS", "Docker"],
    color: "#3b82f6",
    accent: "rgba(59,130,246,0.15)",
    icon: "◑",
  },
];

const CATEGORIES = ["All", "Generative AI", "Full Stack", "Data Engineering"];

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 40 } as const,
  whileInView: { opacity: 1, y: 0  } as const,
  viewport:    { once: true, margin: "-60px" } as const,
  transition:  { duration: 0.7, delay, ease: [0.0, 0.0, 0.2, 1] } as const,
});

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg) translateZ(8px)`;
  };
  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0)";
  };

  return (
    <motion.div
      ref={cardRef}
      className="neon-card glass-card"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -4 }}
      style={{
        padding: "1.75rem",
        cursor: "pointer",
        transition: "transform 0.15s ease, box-shadow 0.3s ease",
        transformStyle: "preserve-3d",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Corner glow */}
      <div
        style={{
          position: "absolute",
          top: 0, right: 0,
          width: 80, height: 80,
          borderRadius: "0 0 0 80px",
          background: `radial-gradient(circle at top right, ${project.color}20, transparent 60%)`,
          pointerEvents: "none",
        }}
      />

      {/* Category badge + icon */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
        <span
          style={{
            padding: "0.2rem 0.65rem",
            borderRadius: "2rem",
            background: project.accent,
            border: `1px solid ${project.color}40`,
            color: project.color,
            fontSize: "0.68rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {project.category}
        </span>
        <span
          style={{
            fontSize: "1.4rem",
            color: project.color,
            filter: `drop-shadow(0 0 6px ${project.color})`,
            opacity: 0.8,
          }}
        >
          {project.icon}
        </span>
      </div>

      <h3
        style={{
          fontFamily: "'Cinzel', var(--font-orbitron), serif",
          fontSize: "1rem",
          fontWeight: 700,
          color: "#e2e8f0",
          marginBottom: "0.75rem",
          lineHeight: 1.3,
        }}
      >
        {project.title}
      </h3>

      <p style={{ color: "#94a3b8", fontSize: "0.83rem", lineHeight: 1.65, marginBottom: "1.25rem" }}>
        {project.description}
      </p>

      {/* Tech tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
        {project.tech.map(t => (
          <span
            key={t}
            style={{
              padding: "0.15rem 0.55rem",
              borderRadius: "0.3rem",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              color: "#94a3b8",
              fontSize: "0.65rem",
              fontFamily: "var(--font-jetbrains-mono), monospace",
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* View portal link */}
      {project.link ? (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          style={{
            marginTop: "1.25rem",
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
            color: project.color,
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontFamily: "'Cinzel', var(--font-orbitron), serif",
            opacity: 0.8,
            textDecoration: "none",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "0.8")}
        >
          <span>View Source</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
          </svg>
        </a>
      ) : (
        <div
          style={{
            marginTop: "1.25rem",
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
            color: project.color,
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontFamily: "'Cinzel', var(--font-orbitron), serif",
            opacity: 0.5,
          }}
        >
          <span>Open Dimension</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      )}
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        background: "rgba(2,2,7,0.88)",
        backdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
      }}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: [0.0, 0.0, 0.2, 1] }}
        onClick={e => e.stopPropagation()}
        style={{
          background: "rgba(7,5,16,0.98)",
          border: `1px solid ${project.color}40`,
          borderRadius: "1.25rem",
          padding: "2.5rem",
          maxWidth: 600,
          width: "100%",
          boxShadow: `0 0 60px ${project.color}15, 0 30px 80px rgba(0,0,0,0.7)`,
          position: "relative",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1.25rem",
            right: "1.25rem",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "50%",
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#94a3b8",
            fontSize: "1.1rem",
            transition: "all 0.2s",
          }}
        >
          ×
        </button>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
          <span
            style={{
              fontSize: "2rem",
              color: project.color,
              filter: `drop-shadow(0 0 10px ${project.color})`,
            }}
          >
            {project.icon}
          </span>
          <div>
            <span
              style={{
                display: "block",
                padding: "0.15rem 0.6rem",
                borderRadius: "2rem",
                background: project.accent,
                border: `1px solid ${project.color}40`,
                color: project.color,
                fontSize: "0.65rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "0.4rem",
              }}
            >
              {project.category}
            </span>
            <h3
              style={{
                fontFamily: "'Cinzel', var(--font-orbitron), serif",
                fontSize: "1.3rem",
                fontWeight: 700,
                color: "#e2e8f0",
              }}
            >
              {project.title}
            </h3>
          </div>
        </div>

        <p style={{ color: "#94a3b8", lineHeight: 1.8, marginBottom: "1.75rem", fontSize: "0.9rem" }}>
          {project.longDescription}
        </p>

        {/* Tech stack */}
        <div style={{ marginBottom: "1.75rem" }}>
          <p
            style={{
              fontFamily: "'Cinzel', var(--font-orbitron), serif",
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              color: project.color,
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            Spells Used
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {project.tech.map(t => (
              <span
                key={t}
                style={{
                  padding: "0.3rem 0.75rem",
                  borderRadius: "0.4rem",
                  background: project.accent,
                  border: `1px solid ${project.color}30`,
                  color: project.color,
                  fontSize: "0.75rem",
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontWeight: 500,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Holographic divider */}
        <div
          style={{
            height: 1,
            background: `linear-gradient(90deg, transparent, ${project.color}50, transparent)`,
            marginBottom: "1.5rem",
          }}
        />

        <div style={{ display: "flex", gap: "0.75rem" }}>
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-mystical"
              style={{ flex: 1, justifyContent: "center", textDecoration: "none" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
              View Source
            </a>
          ) : (
            <button className="btn-mystical" style={{ flex: 1, justifyContent: "center", opacity: 0.4, cursor: "not-allowed" }} disabled>
              View Source
            </button>
          )}
          <button className="btn-mystical btn-mystical-alt" style={{ flex: 1, justifyContent: "center" }} onClick={onClose}>
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [filter,  setFilter]  = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  return (
    <section id="projects" style={{ padding: "8rem 1.5rem", position: "relative", overflow: "hidden" }}>
      {/* Background */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "10%",
          left: "5%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(249,115,22,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="section-container">
        <motion.div {...fadeUp(0)} style={{ textAlign: "center", marginBottom: "1rem" }}>
          <p className="section-label">✦ Dimensional Works ✦</p>
        </motion.div>
        <motion.h2
          {...fadeUp(0.1)}
          style={{
            fontFamily: "'Cinzel', var(--font-orbitron), serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            textAlign: "center",
            marginBottom: "1rem",
            background: "linear-gradient(135deg, #fcd34d, #f97316, #dc2626)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Crafted Realities
        </motion.h2>
        <motion.p
          {...fadeUp(0.15)}
          style={{
            textAlign: "center",
            color: "#94a3b8",
            fontSize: "0.95rem",
            maxWidth: 520,
            margin: "0 auto 3rem",
          }}
        >
          Each project is a portal — a window into a different dimension of engineering.
        </motion.p>

        {/* Filter */}
        <motion.div
          {...fadeUp(0.2)}
          style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center", marginBottom: "3rem" }}
        >
          {CATEGORIES.map(cat => (
            <motion.button
              key={cat}
              onClick={() => setFilter(cat)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: "0.4rem 1rem",
                borderRadius: "2rem",
                background: filter === cat ? "rgba(249,115,22,0.15)" : "rgba(7,5,16,0.8)",
                border: `1px solid ${filter === cat ? "rgba(249,115,22,0.5)" : "rgba(255,255,255,0.08)"}`,
                color: filter === cat ? "#f97316" : "#94a3b8",
                fontSize: "0.7rem",
                fontWeight: 500,
                letterSpacing: "0.05em",
                cursor: "pointer",
                transition: "all 0.22s",
                boxShadow: filter === cat ? "0 0 12px rgba(249,115,22,0.18)" : "none",
              }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          className="projects-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.35, delay: i * 0.05, ease: [0.0, 0.0, 0.2, 1] }}
              >
                <ProjectCard project={project} onClick={() => setSelected(project)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

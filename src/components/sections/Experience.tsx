"use client";

import { motion } from "framer-motion";

interface TimelineItem {
  period: string;
  role: string;
  org: string;
  location: string;
  type: "work" | "edu";
  color: string;
  points: string[];
}

const TIMELINE: TimelineItem[] = [
  {
    period: "Jan 2026 – Present",
    role: "Data Software Engineer Intern",
    org: "EPAM Systems",
    location: "Hyderabad, India",
    type: "work",
    color: "#f97316",
    points: [
      "Architected end-to-end batch & real-time ETL pipelines using Apache Spark and Structured Streaming on Azure Databricks, processing 10M+ hotel and weather records with sub-minute latency.",
      "Designed Medallion Architecture (Bronze/Silver/Gold) on Delta Lake with Auto Loader — reduced data ingestion failure rates by 40% and enabled schema evolution across 5+ heterogeneous sources.",
      "Built Kafka-based streaming pipelines (Kafka Connect + Kafka Streams) achieving 50K+ events/sec for real-time analytics dashboards.",
      "Implemented AES-256 encryption for PII fields; containerized and deployed workloads on Azure Kubernetes Service (AKS) with Docker — cut environment setup time by 60%.",
    ],
  },
  {
    period: "Jun 2024 – Aug 2024",
    role: "AWS Cloud Training Participant",
    org: "Technical Guftgu",
    location: "Remote",
    type: "work",
    color: "#3b82f6",
    points: [
      "Provisioned and managed scalable cloud infrastructure on AWS (EC2, S3, IAM), applying least-privilege IAM policies and S3 bucket access controls across 3+ hands-on projects.",
      "Containerized and deployed applications using Docker on AWS EC2 — gained foundational expertise in cloud-native DevOps, CI/CD concepts, and cost-optimized resource management.",
    ],
  },
  {
    period: "2022 – 2026",
    role: "B.Tech — Computer Science (IIoT)",
    org: "GLA University",
    location: "Mathura, UP",
    type: "edu",
    color: "#7c3aed",
    points: [
      "Bachelor of Technology in Computer Science with Industrial IoT specialization. CGPA: 8.08 / 10.",
      "Core coursework: Data Structures & Algorithms, OOP, DBMS, Operating Systems, Computer Networks.",
      "Built production-grade AI/ML, Data Engineering, and Full-Stack projects during the course.",
    ],
  },
];

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 40 } as const,
  whileInView: { opacity: 1, y: 0  } as const,
  viewport:    { once: true, margin: "-60px" } as const,
  transition:  { duration: 0.7, delay, ease: [0.0, 0.0, 0.2, 1] } as const,
});

export default function Experience() {
  return (
    <section id="experience" style={{ padding: "8rem 1.5rem", position: "relative", overflow: "hidden" }}>
      {/* Background nebula */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "20%",
          right: "-5%",
          width: "450px",
          height: "450px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="section-container">
        <motion.div {...fadeUp(0)} style={{ textAlign: "center", marginBottom: "1rem" }}>
          <p className="section-label">✦ Journey Through Dimensions ✦</p>
        </motion.div>
        <motion.h2
          {...fadeUp(0.1)}
          style={{
            fontFamily: "'Cinzel', var(--font-orbitron), serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            textAlign: "center",
            marginBottom: "1rem",
            background: "linear-gradient(135deg, #f97316, #a78bfa, #f97316)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "shimmer 5s linear infinite",
          }}
        >
          The Multiverse Timeline
        </motion.h2>
        <motion.p
          {...fadeUp(0.15)}
          style={{
            textAlign: "center",
            color: "#94a3b8",
            fontSize: "0.95rem",
            maxWidth: 520,
            margin: "0 auto 5rem",
          }}
        >
          Each chapter a different realm, each role a new dimension mastered.
        </motion.p>

        {/* Timeline */}
        <div className="timeline-outer" style={{ position: "relative", maxWidth: 800, margin: "0 auto" }}>
          {/* Central line */}
          <div
            className="timeline-line timeline-center-line"
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: 2,
              transform: "translateX(-50%)",
            }}
          />

          {TIMELINE.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={item.role + item.org}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.0, 0.0, 0.2, 1] }}
                className="timeline-row"
                style={{
                  display: "flex",
                  justifyContent: isLeft ? "flex-start" : "flex-end",
                  paddingBottom: "3.5rem",
                  position: "relative",
                }}
              >
                {/* Timeline node */}
                <div
                  className="timeline-node timeline-dot"
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: 20,
                    transform: "translate(-50%, -50%)",
                    zIndex: 2,
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: item.color,
                    border: `2px solid rgba(2,2,7,0.9)`,
                    outline: `2px solid ${item.color}50`,
                  }}
                />

                {/* Card */}
                <div
                  className="glass-card"
                  style={{
                    width: "46%",
                    padding: "1.75rem",
                    border: `1px solid ${item.color}25`,
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${item.color}50`;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 25px ${item.color}12`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${item.color}25`;
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  {/* Top accent */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0, left: 0, right: 0,
                      height: 2,
                      background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`,
                    }}
                  />

                  {/* Type badge */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                    <span
                      style={{
                        padding: "0.15rem 0.6rem",
                        borderRadius: "2rem",
                        background: `${item.color}15`,
                        border: `1px solid ${item.color}35`,
                        color: item.color,
                        fontSize: "0.62rem",
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      {item.type === "work" ? "◈ Work" : "◎ Education"}
                    </span>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        color: "#94a3b8",
                        fontFamily: "var(--font-jetbrains-mono), monospace",
                      }}
                    >
                      {item.period}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: "'Cinzel', var(--font-orbitron), serif",
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      color: "#e2e8f0",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {item.role}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: item.color,
                      fontWeight: 500,
                      marginBottom: "0.2rem",
                    }}
                  >
                    {item.org}
                  </p>
                  <p
                    style={{
                      fontSize: "0.7rem",
                      color: "#64748b",
                      marginBottom: "1rem",
                      fontFamily: "var(--font-jetbrains-mono), monospace",
                    }}
                  >
                    {item.location}
                  </p>

                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    {item.points.map((pt, pi) => (
                      <li
                        key={pi}
                        style={{
                          display: "flex",
                          gap: "0.5rem",
                          alignItems: "flex-start",
                          color: "#94a3b8",
                          fontSize: "0.78rem",
                          lineHeight: 1.55,
                        }}
                      >
                        <span style={{ color: item.color, opacity: 0.7, flexShrink: 0, marginTop: "0.2rem" }}>▸</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .timeline-outer { padding-left: 1rem; padding-right: 1rem; }
          .timeline-center-line { left: 18px !important; transform: none !important; }
          .timeline-row { justify-content: flex-start !important; }
          .timeline-row .glass-card {
            width: calc(100% - 3rem) !important;
            margin-left: 3rem !important;
          }
          .timeline-dot { left: 18px !important; transform: translate(-50%, -50%) !important; }
        }
        @media (max-width: 480px) {
          .timeline-row .glass-card { padding: 1.25rem !important; }
        }
      `}</style>
    </section>
  );
}

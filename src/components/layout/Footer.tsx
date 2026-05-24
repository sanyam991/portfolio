"use client";

import { motion } from "framer-motion";

const NAV_LINKS = [
  { label: "About",      href: "#about"      },
  { label: "Skills",     href: "#skills"     },
  { label: "Projects",   href: "#projects"   },
  { label: "Experience", href: "#experience" },
  { label: "Contact",    href: "#contact"    },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      style={{
        padding: "4rem 1.5rem 2.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top divider */}
      <div className="mystic-divider" style={{ marginBottom: "3rem" }} />

      {/* Rotating eye in center background */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 300,
          height: 300,
          borderRadius: "50%",
          border: "1px solid rgba(249,115,22,0.05)",
          pointerEvents: "none",
        }}
      />

      <div className="section-container">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            style={{ cursor: "pointer" }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <span
              style={{
                fontFamily: "'Cinzel', var(--font-orbitron), serif",
                fontSize: "2rem",
                fontWeight: 900,
                background: "linear-gradient(135deg, #fcd34d, #f97316)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 10px rgba(249,115,22,0.4))",
              }}
            >
              SS
            </span>
          </motion.div>

          {/* Tagline */}
          <p
            style={{
              fontFamily: "'Cinzel', var(--font-orbitron), serif",
              fontSize: "0.72rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#64748b",
              textAlign: "center",
            }}
          >
            Crafting Digital Realities Across the Multiverse
          </p>

          {/* Nav links */}
          <nav style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem 1.5rem", justifyContent: "center" }}>
            {NAV_LINKS.map(link => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Cinzel', var(--font-orbitron), serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#64748b",
                  padding: "0.2rem 0",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#f97316"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#64748b"; }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Bottom row */}
          <div className="mystic-divider" />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              flexWrap: "wrap",
              gap: "0.75rem",
            }}
          >
            <p
              style={{
                fontSize: "0.72rem",
                color: "#475569",
                fontFamily: "var(--font-jetbrains-mono), monospace",
              }}
            >
              © {year} Sanyam Sachan. All rights reserved.
            </p>
            <p
              style={{
                fontSize: "0.68rem",
                color: "#475569",
                fontFamily: "'Cinzel', var(--font-orbitron), serif",
                letterSpacing: "0.1em",
              }}
            >
              Built with{" "}
              <span style={{ color: "#f97316" }}>◈</span>
              {" "}Next.js · Framer Motion · Three.js
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

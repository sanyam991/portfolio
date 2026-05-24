"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { label: "About",      href: "#about"      },
  { label: "Skills",     href: "#skills"     },
  { label: "Projects",   href: "#projects"   },
  { label: "Experience", href: "#experience" },
  { label: "Contact",    href: "#contact"    },
];

export default function WebNav() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [active,    setActive]    = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Smooth scroll via lenis (or fallback)
  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9000,
          padding: "0 1.5rem",
          height: 68,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: scrolled
            ? "rgba(2,2,7,0.88)"
            : "rgba(2,2,7,0.3)",
          backdropFilter: scrolled ? "blur(22px)" : "blur(8px)",
          WebkitBackdropFilter: scrolled ? "blur(22px)" : "blur(8px)",
          borderBottom: scrolled
            ? "1px solid rgba(249,115,22,0.15)"
            : "1px solid transparent",
          transition: "background 0.4s, border-color 0.4s, backdrop-filter 0.4s",
        }}
      >
        {/* Logo */}
        <motion.a
          href="#"
          onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          style={{ textDecoration: "none", cursor: "pointer" }}
          whileHover={{ scale: 1.05 }}
        >
          <span
            style={{
              fontFamily: "'Cinzel', var(--font-orbitron), serif",
              fontSize: "1.5rem",
              fontWeight: 800,
              background: "linear-gradient(135deg, #fcd34d, #f97316)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "none",
              filter: "drop-shadow(0 0 8px rgba(249,115,22,0.5))",
            }}
          >
            SS
          </span>
        </motion.a>

        {/* Desktop nav */}
        <nav style={{ display: "flex", gap: "0.25rem", alignItems: "center" }}>
          {LINKS.map(link => (
            <motion.button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              whileHover={{ y: -1 }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0.4rem 0.9rem",
                fontFamily: "'Cinzel', var(--font-orbitron), serif",
                fontSize: "0.72rem",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: active === link.href ? "#f97316" : "rgba(148,163,184,0.85)",
                transition: "color 0.25s",
                position: "relative",
              }}
              className="nav-link"
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = "#fb923c";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color =
                  active === link.href ? "#f97316" : "rgba(148,163,184,0.85)";
              }}
            >
              {link.label}
            </motion.button>
          ))}

          {/* CTA */}
          <motion.button
            onClick={() => scrollTo("#contact")}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              marginLeft: "0.5rem",
              padding: "0.45rem 1.3rem",
              borderRadius: "2rem",
              background: "rgba(249,115,22,0.08)",
              border: "1px solid rgba(249,115,22,0.45)",
              color: "#fb923c",
              fontFamily: "'Cinzel', var(--font-orbitron), serif",
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.25s",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(249,115,22,0.15)";
              el.style.boxShadow  = "0 0 15px rgba(249,115,22,0.35)";
              el.style.color      = "#fcd34d";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(249,115,22,0.08)";
              el.style.boxShadow  = "none";
              el.style.color      = "#fb923c";
            }}
          >
            Open Portal
          </motion.button>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0.4rem",
            flexDirection: "column",
            gap: 5,
          }}
          className="mobile-menu-btn"
        >
          {[0, 1, 2].map(i => (
            <span
              key={i}
              style={{
                display: "block",
                width: 22,
                height: 1.5,
                background: "#f97316",
                borderRadius: 1,
                boxShadow: "0 0 6px rgba(249,115,22,0.5)",
                transition: "transform 0.3s",
              }}
            />
          ))}
        </button>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              top: 68,
              left: 0,
              right: 0,
              zIndex: 8999,
              background: "rgba(2,2,7,0.97)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(249,115,22,0.2)",
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            {LINKS.map(link => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0.75rem 1rem",
                  fontFamily: "'Cinzel', var(--font-orbitron), serif",
                  fontSize: "0.85rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#94a3b8",
                  textAlign: "left",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  transition: "color 0.2s",
                }}
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}

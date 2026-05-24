"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SOCIAL_LINKS = [
  { label: "GitHub",   href: "https://github.com/sanyam991",          icon: "◈" },
  { label: "LinkedIn", href: "https://linkedin.com/in/sanyam991",     icon: "◉" },
  { label: "Email",    href: "mailto:sachansanyam203@gmail.com",       icon: "◎" },
  { label: "Phone",    href: "tel:+917985819872",                      icon: "✦" },
];

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 40 } as const,
  whileInView: { opacity: 1, y: 0  } as const,
  viewport:    { once: true, margin: "-60px" } as const,
  transition:  { duration: 0.7, delay, ease: [0.0, 0.0, 0.2, 1] } as const,
});

export default function Contact() {
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent]       = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError]     = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setError("");
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
      } else {
        setSent(true);
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" style={{ padding: "8rem 1.5rem", position: "relative", overflow: "hidden" }}>
      {/* Summoning circle background */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "600px",
          height: "600px",
          pointerEvents: "none",
        }}
      >
        {/* Outer ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "1px solid rgba(249,115,22,0.08)",
          }}
        />
        {/* Middle ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            inset: "8%",
            borderRadius: "50%",
            border: "1px dashed rgba(124,58,237,0.1)",
          }}
        />
        {/* Inner glow */}
        <div
          style={{
            position: "absolute",
            inset: "20%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
        <motion.div {...fadeUp(0)} style={{ textAlign: "center", marginBottom: "1rem" }}>
          <p className="section-label">✦ Summon the Engineer ✦</p>
        </motion.div>
        <motion.h2
          {...fadeUp(0.1)}
          style={{
            fontFamily: "'Cinzel', var(--font-orbitron), serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            textAlign: "center",
            marginBottom: "1rem",
            background: "linear-gradient(135deg, #fcd34d, #f97316, #7c3aed)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Open the Portal
        </motion.h2>
        <motion.p
          {...fadeUp(0.15)}
          style={{
            textAlign: "center",
            color: "#94a3b8",
            fontSize: "0.95rem",
            maxWidth: 520,
            margin: "0 auto 4rem",
          }}
        >
          Ready to build something extraordinary? Cast your message into the void and I&apos;ll emerge from the other side.
        </motion.p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            maxWidth: 900,
            margin: "0 auto",
          }}
          className="contact-grid"
        >
          {/* Left — info */}
          <motion.div {...fadeUp(0.2)} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div className="glass-card" style={{ padding: "2rem", border: "1px solid rgba(249,115,22,0.2)" }}>
              <h3
                style={{
                  fontFamily: "'Cinzel', var(--font-orbitron), serif",
                  fontSize: "1rem",
                  color: "#fb923c",
                  marginBottom: "1rem",
                  textShadow: "0 0 10px rgba(249,115,22,0.4)",
                }}
              >
                ◈ The Coordinates
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {[
                  { icon: "⬡", label: "Location", value: "Hyderabad, Telangana · India" },
                  { icon: "◎", label: "Email",    value: "sachansanyam203@gmail.com" },
                  { icon: "◉", label: "Status",   value: "Open to Full-Time Opportunities" },
                ].map(item => (
                  <div key={item.label} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                    <span style={{ color: "#f97316", fontSize: "0.9rem", flexShrink: 0, marginTop: "0.1rem" }}>{item.icon}</span>
                    <div>
                      <p style={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#64748b", marginBottom: "0.15rem" }}>{item.label}</p>
                      <p style={{ fontSize: "0.85rem", color: "#e2e8f0" }}>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div className="glass-card" style={{ padding: "1.75rem", border: "1px solid rgba(124,58,237,0.2)" }}>
              <h3
                style={{
                  fontFamily: "'Cinzel', var(--font-orbitron), serif",
                  fontSize: "1rem",
                  color: "#a78bfa",
                  marginBottom: "1rem",
                  textShadow: "0 0 10px rgba(124,58,237,0.4)",
                }}
              >
                ◉ Dimensional Channels
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem" }}>
                {SOCIAL_LINKS.map(s => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.04, y: -2 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.6rem 0.9rem",
                      borderRadius: "0.6rem",
                      background: "rgba(7,5,16,0.8)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      color: "#94a3b8",
                      textDecoration: "none",
                      fontSize: "0.8rem",
                      transition: "all 0.22s",
                      cursor: "pointer",
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "rgba(249,115,22,0.4)";
                      el.style.color = "#fb923c";
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "rgba(255,255,255,0.07)";
                      el.style.color = "#94a3b8";
                    }}
                  >
                    <span style={{ fontSize: "0.9rem" }}>{s.icon}</span>
                    {s.label}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Contact form */}
          <motion.div {...fadeUp(0.3)}>
            <div
              className="glass-card"
              style={{
                padding: "2.5rem",
                border: "1px solid rgba(249,115,22,0.2)",
                position: "relative",
              }}
            >
              {/* Rune decorations */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: 16, right: 16,
                  fontSize: "1.5rem",
                  color: "#f97316",
                  opacity: 0.08,
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  userSelect: "none",
                }}
              >
                ᚠ ᚱ ᚢ ᚦ
              </div>

              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ textAlign: "center", padding: "2rem 0" }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5 }}
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(249,115,22,0.3), transparent 70%)",
                        border: "2px solid rgba(249,115,22,0.6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 1.5rem",
                        fontSize: "1.8rem",
                        boxShadow: "0 0 30px rgba(249,115,22,0.4)",
                      }}
                    >
                      ◈
                    </motion.div>
                    <h3
                      style={{
                        fontFamily: "'Cinzel', var(--font-orbitron), serif",
                        fontSize: "1.2rem",
                        color: "#f97316",
                        marginBottom: "0.75rem",
                        textShadow: "0 0 12px rgba(249,115,22,0.5)",
                      }}
                    >
                      Portal Opened!
                    </h3>
                    <p style={{ color: "#94a3b8", fontSize: "0.88rem" }}>
                      Your message has been sent across the multiverse. I&apos;ll respond shortly.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    <h3
                      style={{
                        fontFamily: "'Cinzel', var(--font-orbitron), serif",
                        fontSize: "1rem",
                        color: "#fb923c",
                        marginBottom: "0.25rem",
                        textShadow: "0 0 10px rgba(249,115,22,0.4)",
                      }}
                    >
                      Cast Your Message
                    </h3>

                    {[
                      { id: "name", label: "Your Name", type: "text", value: name, setter: setName, placeholder: "The Sorcerer's Name" },
                      { id: "email", label: "Email Dimension", type: "email", value: email, setter: setEmail, placeholder: "your@email.com" },
                    ].map(field => (
                      <div key={field.id} style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                        <label
                          htmlFor={field.id}
                          style={{
                            fontSize: "0.7rem",
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            color: "#64748b",
                            fontFamily: "'Cinzel', var(--font-orbitron), serif",
                          }}
                        >
                          {field.label}
                        </label>
                        <input
                          id={field.id}
                          type={field.type}
                          value={field.value}
                          onChange={e => field.setter(e.target.value)}
                          placeholder={field.placeholder}
                          required
                          style={{
                            background: "rgba(7,5,16,0.9)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            borderRadius: "0.6rem",
                            padding: "0.75rem 1rem",
                            color: "#e2e8f0",
                            fontSize: "0.88rem",
                            outline: "none",
                            transition: "border-color 0.2s, box-shadow 0.2s",
                            fontFamily: "inherit",
                          }}
                          onFocus={e => {
                            e.target.style.borderColor = "rgba(249,115,22,0.5)";
                            e.target.style.boxShadow = "0 0 12px rgba(249,115,22,0.12)";
                          }}
                          onBlur={e => {
                            e.target.style.borderColor = "rgba(255,255,255,0.08)";
                            e.target.style.boxShadow = "none";
                          }}
                        />
                      </div>
                    ))}

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                      <label
                        htmlFor="message"
                        style={{
                          fontSize: "0.7rem",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "#64748b",
                          fontFamily: "'Cinzel', var(--font-orbitron), serif",
                        }}
                      >
                        Your Incantation
                      </label>
                      <textarea
                        id="message"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        placeholder="Describe the dimension you want to build..."
                        required
                        rows={4}
                        style={{
                          background: "rgba(7,5,16,0.9)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          borderRadius: "0.6rem",
                          padding: "0.75rem 1rem",
                          color: "#e2e8f0",
                          fontSize: "0.88rem",
                          outline: "none",
                          resize: "vertical",
                          transition: "border-color 0.2s, box-shadow 0.2s",
                          fontFamily: "inherit",
                          minHeight: 100,
                        }}
                        onFocus={e => {
                          e.target.style.borderColor = "rgba(249,115,22,0.5)";
                          e.target.style.boxShadow = "0 0 12px rgba(249,115,22,0.12)";
                        }}
                        onBlur={e => {
                          e.target.style.borderColor = "rgba(255,255,255,0.08)";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>

                    {/* Error message */}
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                          color: "#f87171",
                          fontSize: "0.78rem",
                          padding: "0.5rem 0.75rem",
                          borderRadius: "0.4rem",
                          background: "rgba(220,38,38,0.08)",
                          border: "1px solid rgba(220,38,38,0.25)",
                        }}
                      >
                        {error}
                      </motion.p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={sending}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        padding: "0.85rem",
                        borderRadius: "0.75rem",
                        background: sending
                          ? "rgba(249,115,22,0.1)"
                          : "linear-gradient(135deg, rgba(249,115,22,0.2), rgba(124,58,237,0.15))",
                        border: "1px solid rgba(249,115,22,0.45)",
                        color: sending ? "#94a3b8" : "#fcd34d",
                        fontFamily: "'Cinzel', var(--font-orbitron), serif",
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        cursor: sending ? "not-allowed" : "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                        transition: "all 0.25s",
                        boxShadow: sending ? "none" : "0 0 20px rgba(249,115,22,0.2)",
                      }}
                    >
                      {sending ? (
                        <>
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            ◎
                          </motion.span>
                          Channeling Energy...
                        </>
                      ) : (
                        <>
                          <span>◈</span>
                          Send Through the Portal
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

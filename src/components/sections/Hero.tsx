"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// â”€â”€ Solar system planet data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
interface Planet {
  name: string;
  abbr: string;
  color: string;
  ring: 1 | 2 | 3;
  delay: number; // negative = start offset into orbit
  cw: boolean;
}

const PLANETS: Planet[] = [
  // Ring 1 â€” 3 planets, 18s CW, spaced 120Â° = 6s apart
  { name: "Python",    abbr: "Py",  color: "#f97316", ring: 1, delay:   0, cw: true  },
  { name: "LangChain", abbr: "LC",  color: "#a78bfa", ring: 1, delay:  -6, cw: true  },
  { name: "Docker",    abbr: "Dk",  color: "#38bdf8", ring: 1, delay: -12, cw: true  },
  // Ring 2 â€” 4 planets, 26s CCW, spaced 90Â° = 6.5s apart
  { name: "Spark",     abbr: "Sp",  color: "#fb923c", ring: 2, delay:    0, cw: false },
  { name: "FastAPI",   abbr: "FA",  color: "#0ea5e9", ring: 2, delay:  -6.5, cw: false },
  { name: "Postgres",  abbr: "PG",  color: "#60a5fa", ring: 2, delay: -13,   cw: false },
  { name: "RAG",       abbr: "RAG", color: "#c4b5fd", ring: 2, delay: -19.5, cw: false },
  // Ring 3 â€” 5 planets, 36s CW, spaced 72Â° = 7.2s apart
  { name: "Kafka",     abbr: "Kf",  color: "#7c3aed", ring: 3, delay:    0, cw: true  },
  { name: "AWS",       abbr: "AWS", color: "#fcd34d", ring: 3, delay:  -7.2, cw: true  },
  { name: "Django",    abbr: "Dj",  color: "#ef4444", ring: 3, delay: -14.4, cw: true  },
  { name: "K8s",       abbr: "K8s", color: "#3b82f6", ring: 3, delay: -21.6, cw: true  },
  { name: "Java",      abbr: "Jv",  color: "#fb923c", ring: 3, delay: -28.8, cw: true  },
];

const RING_CONFIG = {
  1: { r: 95,  dur: 18, border: "rgba(249,115,22,0.22)",  dash: false },
  2: { r: 148, dur: 26, border: "rgba(124,58,237,0.18)",  dash: true  },
  3: { r: 200, dur: 36, border: "rgba(59,130,246,0.14)",  dash: false },
} as const;

// â”€â”€ Spark type â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
interface Spark {
  id: number; left: number; top: number;
  drift: number; dur: number; delay: number; color: string;
}

const SPARK_COUNT = 14;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });
  const parallaxX = useTransform(springX, [-1, 1], [-12, 12]);
  const parallaxY = useTransform(springY, [-1, 1], [-8, 8]);

  // Fix hydration: generate random sparks only on client
  const [sparks, setSparks] = useState<Spark[]>([]);
  useEffect(() => {
    setSparks(
      Array.from({ length: SPARK_COUNT }, (_, i) => ({
        id: i,
        left: 10 + Math.random() * 80,
        top:  10 + Math.random() * 80,
        drift: (Math.random() - 0.5) * 80,
        dur:   1.5 + Math.random() * 2,
        delay: Math.random() * 3,
        color: i % 3 === 0 ? "#f97316" : i % 3 === 1 ? "#7c3aed" : "#3b82f6",
      }))
    );
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      mouseX.set(((e.clientX - rect.left) / rect.width  - 0.5) * 2);
      mouseY.set(((e.clientY - rect.top)  / rect.height - 0.5) * 2);
    };
    section.addEventListener("mousemove", onMove);
    return () => section.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const sunSize = 116; // px â€” profile photo diameter

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "5rem 1.5rem 2rem",
      }}
    >
      {/* â”€â”€ Orbit CSS keyframes (injected once) â”€â”€ */}
      <style>{`
        @keyframes orbit-cw {
          from { transform: rotate(0deg) translateX(var(--orbit-r)) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(var(--orbit-r)) rotate(-360deg); }
        }
        @keyframes orbit-ccw {
          from { transform: rotate(0deg) translateX(var(--orbit-r)) rotate(0deg); }
          to   { transform: rotate(-360deg) translateX(var(--orbit-r)) rotate(360deg); }
        }
        .planet-sphere:hover {
          transform: scale(1.28) !important;
        }
      `}</style>

      {/* â”€â”€ Dimensional fog â”€â”€ */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(124,58,237,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* â”€â”€ Sparks (client-only) â”€â”€ */}
      {sparks.map(s => (
        <motion.div
          key={s.id}
          style={{
            position: "absolute",
            left: `${s.left}%`,
            top:  `${s.top}%`,
            width: 3,
            height: 3,
            borderRadius: "50%",
            background: s.color,
            boxShadow: `0 0 6px ${s.color}`,
            pointerEvents: "none",
          }}
          animate={{
            y: [-80, 0],
            x: [s.drift, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: s.dur,
            delay: s.delay,
            repeat: Infinity,
            repeatDelay: 1.5,
            ease: [0.0, 0.0, 0.2, 1] as const,
          }}
        />
      ))}

      {/* â”€â”€ Main layout â”€â”€ */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "3rem",
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 1100,
        }}
      >
        {/* â”€â”€ SOLAR SYSTEM â”€â”€ */}
        <motion.div
          style={{
            position: "relative",
            width: "min(460px, 90vw)",
            height: "min(460px, 90vw)",
            x: parallaxX,
            y: parallaxY,
          }}
        >
          {/* Outer aura glow */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: -50,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(249,115,22,0.08) 0%, rgba(124,58,237,0.05) 40%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* â”€â”€ Orbit ring paths â”€â”€ */}
          {([1, 2, 3] as const).map(ring => {
            const cfg = RING_CONFIG[ring];
            return (
              <div
                key={ring}
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width:      `${cfg.r * 2}px`,
                  height:     `${cfg.r * 2}px`,
                  marginTop:  `${-cfg.r}px`,
                  marginLeft: `${-cfg.r}px`,
                  borderRadius: "50%",
                  border: `1px ${cfg.dash ? "dashed" : "solid"} ${cfg.border}`,
                  pointerEvents: "none",
                }}
              />
            );
          })}

          {/* â”€â”€ Planets â”€â”€ */}
          {PLANETS.map(planet => {
            const cfg  = RING_CONFIG[planet.ring];
            const anim = planet.cw ? "orbit-cw" : "orbit-ccw";
            const ps   = 38; // planet size px
            return (
              <div
                key={planet.name}
                style={{
                  position: "absolute",
                  top:  "50%",
                  left: "50%",
                  width:      `${ps}px`,
                  height:     `${ps}px`,
                  marginTop:  `${-ps / 2}px`,
                  marginLeft: `${-ps / 2}px`,
                  "--orbit-r": `${cfg.r}px`,
                  animation: `${anim} ${cfg.dur}s linear infinite`,
                  animationDelay: `${planet.delay}s`,
                  zIndex: 2,
                } as React.CSSProperties}
              >
                {/* Sphere */}
                <div
                  className="planet-sphere"
                  title={planet.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    background: `radial-gradient(circle at 35% 30%, ${planet.color}dd, ${planet.color}44)`,
                    border: `1.5px solid ${planet.color}99`,
                    boxShadow: `0 0 10px ${planet.color}44, 0 0 3px ${planet.color}88`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.52rem",
                    fontWeight: 700,
                    color: "#fff",
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    letterSpacing: "0.01em",
                    userSelect: "none",
                    cursor: "default",
                    transition: "box-shadow 0.25s, transform 0.25s",
                  }}
                >
                  {planet.abbr}
                </div>
                {/* Name label */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: "108%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontSize: "0.44rem",
                    color: `${planet.color}bb`,
                    whiteSpace: "nowrap",
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    letterSpacing: "0.06em",
                    pointerEvents: "none",
                    textShadow: `0 0 6px ${planet.color}55`,
                  }}
                >
                  {planet.name}
                </div>
              </div>
            );
          })}

          {/* â”€â”€ SUN corona pulse â”€â”€ */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 9,
              pointerEvents: "none",
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width:  `${sunSize + 18}px`,
                height: `${sunSize + 18}px`,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(249,115,22,0.45) 0%, rgba(249,115,22,0.08) 60%, transparent 80%)",
              }}
            />
          </div>

          {/* â”€â”€ SUN â€” profile photo â”€â”€ */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 10,
            }}
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.9, ease: [0.0, 0.0, 0.2, 1] }}
              style={{
                width:  `${sunSize}px`,
                height: `${sunSize}px`,
                borderRadius: "50%",
                background: "rgba(7,5,16,0.95)",
                border: "2.5px solid rgba(249,115,22,0.75)",
                boxShadow:
                  "0 0 30px rgba(249,115,22,0.55), 0 0 60px rgba(249,115,22,0.18), inset 0 0 18px rgba(249,115,22,0.12)",
                overflow: "hidden",
              }}
            >
              <img
                src="/profile.jpg"
                alt="Sanyam Sachan"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center 15%",
                  borderRadius: "50%",
                  display: "block",
                  filter: "brightness(1.05) contrast(1.02)",
                }}
                onError={e => {
                  const img = e.target as HTMLImageElement;
                  img.style.display = "none";
                  const parent = img.parentElement;
                  if (parent && !parent.querySelector(".ss-fallback")) {
                    const fb = document.createElement("div");
                    fb.className = "ss-fallback";
                    fb.style.cssText =
                      "width:100%;height:100%;display:flex;align-items:center;justify-content:center;" +
                      "font-family:'Cinzel',var(--font-orbitron),serif;font-size:1.4rem;" +
                      "font-weight:800;background:linear-gradient(135deg,#fcd34d,#f97316);" +
                      "-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;";
                    fb.textContent = "SS";
                    parent.appendChild(fb);
                  }
                }}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* â”€â”€ Hero Text â”€â”€ */}
        <div style={{ textAlign: "center", maxWidth: 700 }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="section-label"
            style={{ marginBottom: "0.75rem" }}
          >
            âœ¦ Mystic Arts Practitioner Â· Software Engineer âœ¦
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
            transition={{ delay: 0.8, duration: 0.9 }}
            style={{
              fontFamily: "'Cinzel', var(--font-orbitron), serif",
              fontSize: "clamp(2.8rem, 8vw, 6rem)",
              fontWeight: 900,
              lineHeight: 1.08,
              marginBottom: "0.5rem",
              background: "linear-gradient(135deg, #fcd34d 0%, #f97316 40%, #fb923c 70%, #fcd34d 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 4s linear infinite",
              filter: "drop-shadow(0 0 20px rgba(249,115,22,0.4))",
            }}
          >
            Hi, I&apos;m Sanyam
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            style={{
              fontFamily: "'Cinzel', var(--font-orbitron), serif",
              fontSize: "clamp(0.75rem, 2.2vw, 1rem)",
              letterSpacing: "0.22em",
              color: "#94a3b8",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            Software Engineer&nbsp;Â·&nbsp;AI Builder&nbsp;Â·&nbsp;Full Stack Developer
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.7 }}
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
              color: "#a78bfa",
              fontStyle: "italic",
              marginBottom: "2rem",
              textShadow: "0 0 20px rgba(167,139,250,0.5)",
            }}
          >
            &ldquo;Crafting Digital Realities Across the Multiverse&rdquo;
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.7 }}
            style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
          >
            <button className="btn-mystical" onClick={() => scrollTo("#projects")}>
              <span>Explore My Work</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            <button className="btn-mystical btn-mystical-alt" onClick={() => scrollTo("#contact")}>
              <span>Open Portal</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 8v8M8 12h8"/>
              </svg>
            </button>
          </motion.div>
        </div>

        {/* â”€â”€ Scroll indicator â”€â”€ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: 24, height: 38, borderRadius: 12,
              border: "1.5px solid rgba(249,115,22,0.4)",
              display: "flex", justifyContent: "center", paddingTop: "6px",
            }}
          >
            <div style={{ width: 4, height: 8, borderRadius: 2, background: "rgba(249,115,22,0.7)", boxShadow: "0 0 6px rgba(249,115,22,0.5)" }} />
          </motion.div>
          <span style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(148,163,184,0.5)", fontFamily: "'Cinzel', var(--font-orbitron), serif" }}>
            Scroll
          </span>
        </motion.div>
      </div>
    </section>
  );
}

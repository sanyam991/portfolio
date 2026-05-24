"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const RUNE_SYMBOLS = ["᛫", "ᚱ", "ᚠ", "ᚢ", "ᚦ", "ᚨ", "ᚷ", "ᚹ", "ᚺ", "ᚾ", "ᛁ", "ᛃ", "ᛇ", "ᛈ", "ᛉ", "ᛊ", "ᛏ", "ᛒ", "ᛖ", "ᛗ"];

export default function LoadingScreen() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 2800;

    const raf = requestAnimationFrame(function step(now) {
      const p = Math.min(((now - start) / duration) * 100, 100);
      setProgress(Math.round(p));
      if (p < 100) requestAnimationFrame(step);
      else setTimeout(() => setDone(true), 350);
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "#020207",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
          }}
        >
          {/* Outer rune ring */}
          <div style={{ position: "relative", width: 240, height: 240 }}>
            {/* Rotating rune symbols */}
            {RUNE_SYMBOLS.map((r, i) => {
              const angle = (i / RUNE_SYMBOLS.length) * 360;
              return (
                <motion.span
                  key={i}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transformOrigin: "0 0",
                    transform: `rotate(${angle}deg) translate(105px) rotate(-${angle}deg)`,
                    color: i % 3 === 0 ? "#f97316" : i % 3 === 1 ? "#7c3aed" : "#94a3b8",
                    fontSize: "0.85rem",
                    opacity: 0.7,
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                  }}
                  animate={{ opacity: [0.3, 0.9, 0.3] }}
                  transition={{
                    duration: 2,
                    delay: i * 0.1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {r}
                </motion.span>
              );
            })}

            {/* Ring 1 */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute",
                inset: 12,
                borderRadius: "50%",
                border: "1.5px solid rgba(249,115,22,0.5)",
                boxShadow: "0 0 12px rgba(249,115,22,0.3), inset 0 0 12px rgba(249,115,22,0.1)",
              }}
            />
            {/* Ring 2 */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute",
                inset: 32,
                borderRadius: "50%",
                border: "1px dashed rgba(124,58,237,0.6)",
              }}
            />
            {/* Ring 3 */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute",
                inset: 52,
                borderRadius: "50%",
                border: "1.5px solid rgba(220,38,38,0.4)",
              }}
            />

            {/* Center orb */}
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                inset: 72,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(249,115,22,0.9) 0%, rgba(124,58,237,0.6) 50%, transparent 80%)",
                boxShadow:
                  "0 0 20px rgba(249,115,22,0.6), 0 0 40px rgba(249,115,22,0.3), 0 0 60px rgba(124,58,237,0.2)",
              }}
            />

            {/* SS initials */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Cinzel', var(--font-orbitron), serif",
                fontSize: "2rem",
                fontWeight: 700,
                color: "#fcd34d",
                textShadow: "0 0 20px rgba(249,115,22,0.9)",
                zIndex: 2,
              }}
            >
              SS
            </div>
          </div>

          {/* Text */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              fontFamily: "'Cinzel', var(--font-orbitron), serif",
              fontSize: "0.75rem",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "#f97316",
              textShadow: "0 0 12px rgba(249,115,22,0.6)",
            }}
          >
            Opening the Multiverse...
          </motion.p>

          {/* Progress bar */}
          <div
            style={{
              width: 200,
              height: 2,
              background: "rgba(255,255,255,0.07)",
              borderRadius: 1,
              overflow: "hidden",
            }}
          >
            <motion.div
              style={{
                height: "100%",
                background: "linear-gradient(90deg, #f97316, #7c3aed, #f97316)",
                backgroundSize: "200% 100%",
                animation: "shimmer 2s linear infinite",
                borderRadius: 1,
                width: `${progress}%`,
              }}
            />
          </div>

          <motion.span
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "0.7rem",
              color: "rgba(148,163,184,0.7)",
              letterSpacing: "0.1em",
            }}
          >
            {progress}%
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

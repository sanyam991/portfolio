"use client";

import { motion } from "framer-motion";

// Floating Eye of Agamotto — mystical artifact
export default function SpiderHand() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 3.5, duration: 0.8, ease: "easeOut" }}
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        zIndex: 8000,
        cursor: "pointer",
      }}
      whileHover={{ scale: 1.15 }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      title="Return to the Origin"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          width: 52,
          height: 52,
          borderRadius: "50%",
          border: "1.5px solid rgba(249,115,22,0.5)",
          position: "absolute",
          inset: -6,
          boxShadow: "0 0 12px rgba(249,115,22,0.3)",
        }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          border: "1px dashed rgba(124,58,237,0.5)",
          position: "absolute",
          inset: -2,
        }}
      />

      {/* Eye SVG */}
      <motion.div
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(249,115,22,0.15), rgba(2,2,7,0.9))",
          border: "1px solid rgba(249,115,22,0.4)",
          boxShadow: "0 0 20px rgba(249,115,22,0.3), inset 0 0 12px rgba(249,115,22,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          {/* Eye of Agamotto */}
          <ellipse cx="12" cy="12" rx="9" ry="6" stroke="#f97316" strokeWidth="1.2" opacity="0.8" />
          <circle cx="12" cy="12" r="3" fill="rgba(249,115,22,0.7)" />
          <circle cx="12" cy="12" r="1.2" fill="#fcd34d" />
          {/* Inner rays */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <line
              key={i}
              x1="12"
              y1="12"
              x2={12 + 7 * Math.cos((angle * Math.PI) / 180)}
              y2={12 + 7 * Math.sin((angle * Math.PI) / 180)}
              stroke="#f97316"
              strokeWidth="0.5"
              opacity="0.3"
            />
          ))}
        </svg>
      </motion.div>
    </motion.div>
  );
}

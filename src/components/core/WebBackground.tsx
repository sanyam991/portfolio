"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  alpha: number;
  color: string;
  twinkle: number;
  twinkleSpeed: number;
}

const COLORS = [
  "rgba(249,115,22,",   // gold
  "rgba(124,58,237,",   // purple
  "rgba(220,38,38,",    // crimson
  "rgba(59,130,246,",   // astral blue
  "rgba(148,163,184,",  // silver
];

export default function WebBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width  = W;
    canvas.height = H;

    // ── Stars ──
    const STAR_COUNT = 180;
    const stars: Particle[] = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: 0,
      vy: 0,
      r: Math.random() * 1.4 + 0.3,
      alpha: Math.random() * 0.7 + 0.1,
      color: "rgba(148,163,184,",
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.015 + 0.005,
    }));

    // ── Floating Particles ──
    const PARTICLE_COUNT = 70;
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.18,
      r: Math.random() * 2.5 + 0.5,
      alpha: Math.random() * 0.45 + 0.05,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
    }));

    let raf: number;
    let frame = 0;

    const draw = () => {
      raf = requestAnimationFrame(draw);
      frame++;

      ctx.clearRect(0, 0, W, H);

      // ── Draw nebula blobs (very subtle) ──
      const gradient1 = ctx.createRadialGradient(W * 0.15, H * 0.35, 0, W * 0.15, H * 0.35, W * 0.35);
      gradient1.addColorStop(0, "rgba(76,29,149,0.06)");
      gradient1.addColorStop(1, "transparent");
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, W, H);

      const gradient2 = ctx.createRadialGradient(W * 0.85, H * 0.65, 0, W * 0.85, H * 0.65, W * 0.30);
      gradient2.addColorStop(0, "rgba(124,58,237,0.05)");
      gradient2.addColorStop(1, "transparent");
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, W, H);

      const gradient3 = ctx.createRadialGradient(W * 0.50, H * 0.10, 0, W * 0.50, H * 0.10, W * 0.25);
      gradient3.addColorStop(0, "rgba(249,115,22,0.04)");
      gradient3.addColorStop(1, "transparent");
      ctx.fillStyle = gradient3;
      ctx.fillRect(0, 0, W, H);

      // ── Stars ──
      for (const s of stars) {
        s.twinkle += s.twinkleSpeed;
        const a = s.alpha * (0.5 + 0.5 * Math.sin(s.twinkle));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `${s.color}${a})`;
        ctx.fill();
      }

      // ── Floating Particles ──
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.twinkle += p.twinkleSpeed;

        if (p.x < -5) p.x = W + 5;
        if (p.x > W + 5) p.x = -5;
        if (p.y < -5) p.y = H + 5;
        if (p.y > H + 5) p.y = -5;

        const a = p.alpha * (0.6 + 0.4 * Math.sin(p.twinkle));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${a})`;
        ctx.shadowColor = `${p.color}0.5)`;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // ── Occasional light streaks ──
      if (frame % 240 === 0) {
        const streakY = Math.random() * H;
        const grad = ctx.createLinearGradient(0, streakY, W * 0.4, streakY);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(0.4, "rgba(249,115,22,0.08)");
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fillRect(0, streakY - 1, W * 0.4, 1);
      }
    };

    draw();

    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W;
      canvas.height = H;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
}

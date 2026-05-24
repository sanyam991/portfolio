"use client";

import { useEffect, useRef, useState } from "react";

interface CursorPos { x: number; y: number }

export default function CursorEffect() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement[]>([]);
  const pos      = useRef<CursorPos>({ x: -100, y: -100 });
  const ring     = useRef<CursorPos>({ x: -100, y: -100 });
  const [variant, setVariant] = useState<"default" | "hover" | "click">("default");

  useEffect(() => {
    const TRAIL_COUNT = 8;

    // Build trail elements
    const container = document.createElement("div");
    container.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:99997;";
    document.body.appendChild(container);

    const trails: HTMLDivElement[] = [];
    for (let i = 0; i < TRAIL_COUNT; i++) {
      const t = document.createElement("div");
      const ratio = 1 - i / TRAIL_COUNT;
      t.style.cssText = `
        position:absolute;
        width:${6 * ratio}px;
        height:${6 * ratio}px;
        border-radius:50%;
        background:rgba(249,115,22,${0.5 * ratio});
        box-shadow:0 0 ${8 * ratio}px rgba(249,115,22,${0.4 * ratio});
        transform:translate(-50%,-50%);
        pointer-events:none;
        transition:none;
      `;
      container.appendChild(t);
      trails.push(t);
    }
    trailRef.current = trails;

    const trailPositions: CursorPos[] = Array(TRAIL_COUNT).fill({ x: -100, y: -100 });

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    const onEnter = () => setVariant("hover");
    const onLeave = () => setVariant("default");
    const onDown  = () => setVariant("click");
    const onUp    = () => setVariant("default");

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup",   onUp);

    // Attach hover detection
    const addListeners = () => {
      document.querySelectorAll("a,button,[role='button'],.btn-mystical,.neon-card,.skill-orb").forEach(el => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };
    addListeners();

    let raf: number;
    let frame = 0;

    const loop = () => {
      raf = requestAnimationFrame(loop);
      frame++;

      // Dot snaps instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 5}px, ${pos.current.y - 5}px)`;
      }

      // Ring lerps
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 18}px, ${ring.current.y - 18}px)`;
      }

      // Trail
      if (frame % 2 === 0) {
        trailPositions.unshift({ ...pos.current });
        trailPositions.pop();
        trails.forEach((t, i) => {
          const p = trailPositions[i] ?? pos.current;
          t.style.left = `${p.x}px`;
          t.style.top  = `${p.y}px`;
        });
      }
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup",   onUp);
      document.body.removeChild(container);
    };
  }, []);

  const isHover = variant === "hover";
  const isClick = variant === "click";

  return (
    <>
      {/* Main dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: isHover ? "#fcd34d" : "#f97316",
          boxShadow: isHover
            ? "0 0 15px rgba(252,211,77,0.9), 0 0 30px rgba(252,211,77,0.5)"
            : "0 0 10px rgba(249,115,22,0.8), 0 0 20px rgba(249,115,22,0.4)",
          pointerEvents: "none",
          zIndex: 99999,
          transition: "background 0.2s, box-shadow 0.2s, transform 0.05s",
          mixBlendMode: "screen",
        }}
      />

      {/* Outer ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          width: isClick ? 24 : isHover ? 42 : 36,
          height: isClick ? 24 : isHover ? 42 : 36,
          borderRadius: "50%",
          border: `1.5px solid ${isHover ? "rgba(252,211,77,0.7)" : "rgba(124,58,237,0.65)"}`,
          boxShadow: isHover
            ? "0 0 12px rgba(252,211,77,0.4)"
            : "0 0 12px rgba(124,58,237,0.35)",
          pointerEvents: "none",
          zIndex: 99998,
          transition: "width 0.2s, height 0.2s, border-color 0.2s, box-shadow 0.2s",
          mixBlendMode: "screen",
        }}
      />
    </>
  );
}

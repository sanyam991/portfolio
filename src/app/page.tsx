"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import LoadingScreen from "@/components/ui/LoadingScreen";
import CursorEffect from "@/components/ui/CursorEffect";
import WebBackground from "@/components/core/WebBackground";
import WebNav from "@/components/core/WebNav";
import SpiderHand from "@/components/core/SpiderHand";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Achievements from "@/components/sections/Achievements";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 2.0,
    });

    let rafId: number;
    const tick = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {/* ── Dimensional Void Background Gradients ── */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -2,
          background:
            "radial-gradient(ellipse 80% 60% at 20% 40%, rgba(76,29,149,0.18) 0%, transparent 60%), " +
            "radial-gradient(ellipse 60% 80% at 80% 70%, rgba(124,58,237,0.10) 0%, transparent 60%), " +
            "radial-gradient(ellipse 40% 50% at 50% 10%, rgba(249,115,22,0.08) 0%, transparent 50%), " +
            "#020207",
          pointerEvents: "none",
        }}
      />

      <LoadingScreen />
      <CursorEffect />
      <WebBackground />
      <WebNav />
      <SpiderHand />

      {/* CRT scan lines */}
      <div className="scan-overlay" aria-hidden="true" />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <Contact />
        <Footer />
      </main>
    </>
  );
}




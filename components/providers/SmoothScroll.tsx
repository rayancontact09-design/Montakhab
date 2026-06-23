"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useApp } from "@/lib/store";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Wires Lenis smooth-scroll into GSAP's ticker and ScrollTrigger so all
 * scroll-driven cinematics share a single, buttery scroll source.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const setProgress = useApp((s) => s.setProgress);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !reduced,
      touchMultiplier: 1.6,
    });

    lenis.on("scroll", (e: { progress: number }) => {
      ScrollTrigger.update();
      setProgress(e.progress || 0);
    });

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [setProgress]);

  return <>{children}</>;
}

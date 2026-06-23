"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useApp } from "@/lib/store";

/**
 * The arrival sequence. Zellij lines draw in, a counter climbs, the green
 * star ignites red, and a clip-path curtain lifts to reveal the world.
 * Sets `loaded` so the hero and WebGL layer fade in.
 */
export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const starRef = useRef<SVGSVGElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const setLoaded = useApp((s) => s.setLoaded);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const counter = { v: 0 };
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          setLoaded(true);
          setDone(true);
        },
      });

      gsap.set(".load-meta", { opacity: 0, y: 12 });

      tl.to(".load-meta", { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 })
        .to(
          counter,
          {
            v: 100,
            duration: reduced ? 0.4 : 2.2,
            ease: "power2.inOut",
            onUpdate: () => {
              const v = Math.round(counter.v);
              if (countRef.current)
                countRef.current.textContent = String(v).padStart(3, "0");
              if (barRef.current) barRef.current.style.width = `${v}%`;
            },
          },
          0.1
        )
        .fromTo(
          starRef.current,
          { scale: 0.4, opacity: 0, rotate: -50 },
          { scale: 1, opacity: 1, rotate: 0, duration: 1.3, ease: "power3.out" },
          0.3
        )
        .to(
          ".loader-star path",
          { fill: "#C1272D", duration: 0.5, ease: "power2.in" },
          "-=0.4"
        )
        .to(starRef.current, {
          scale: 1.3,
          filter: "drop-shadow(0 0 50px rgba(193,39,45,0.95))",
          duration: 0.5,
        })
        .to(".load-fade", { opacity: 0, duration: 0.4 }, "<")
        .to(root.current, {
          clipPath: "inset(0 0 100% 0)",
          duration: 1.1,
          ease: "power4.inOut",
        })
        .set(root.current, { display: "none" });
    }, root);

    return () => ctx.revert();
  }, [setLoaded]);

  if (done) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-maghrib-black"
      style={{ clipPath: "inset(0 0 0% 0)" }}
    >
      {/* faint zellij wash */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #E8DCC4 0 1px, transparent 1px 28px), repeating-linear-gradient(-45deg, #E8DCC4 0 1px, transparent 1px 28px)",
        }}
      />

      <div className="load-meta load-fade absolute left-6 top-6 font-display text-[10px] tracking-[0.4em] text-maghrib-sand/60 md:left-10 md:top-10">
        MONTAKHAB AL-MAGHRIB
      </div>
      <div className="load-meta load-fade absolute right-6 top-6 font-display text-[10px] tracking-[0.4em] text-maghrib-sand/60 md:right-10 md:top-10">
        EST. 1955 · ⵣ
      </div>

      <svg
        ref={starRef}
        className="loader-star h-24 w-24"
        viewBox="0 0 100 100"
        aria-hidden
      >
        <path
          fill="#006233"
          d="M50 4 61.8 38.2 97.6 38.2 68.9 59.5 80.7 93.8 50 72.5 19.3 93.8 31.1 59.5 2.4 38.2 38.2 38.2Z"
        />
      </svg>

      <div className="load-fade mt-12 flex w-64 flex-col items-center gap-3 md:w-80">
        <div className="relative h-px w-full bg-maghrib-bone/15">
          <span
            ref={barRef}
            className="absolute left-0 top-0 block h-full bg-maghrib-red"
            style={{ width: "0%" }}
          />
        </div>
        <div className="flex w-full items-center justify-between">
          <span className="font-display text-[10px] tracking-[0.4em] text-maghrib-sand/50">
            LOADING THE EXPERIENCE
          </span>
          <span className="font-display text-[10px] tracking-[0.3em] text-maghrib-sand/70">
            <span ref={countRef}>000</span>
          </span>
        </div>
      </div>
    </div>
  );
}

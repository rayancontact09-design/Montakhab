"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useApp } from "@/lib/store";

/**
 * The arrival sequence: a heartbeat counter, then the green star ignites
 * red and the curtain lifts. Sets `loaded` so the hero can animate in.
 */
export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const starRef = useRef<SVGSVGElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const setLoaded = useApp((s) => s.setLoaded);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counter = { v: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          setLoaded(true);
          setDone(true);
        },
      });

      tl.to(counter, {
        v: 100,
        duration: 1.8,
        ease: "power2.inOut",
        onUpdate: () => {
          if (countRef.current)
            countRef.current.textContent = String(Math.round(counter.v)).padStart(
              3,
              "0"
            );
        },
      })
        .fromTo(
          starRef.current,
          { scale: 0.4, opacity: 0, rotate: -40 },
          { scale: 1, opacity: 1, rotate: 0, duration: 1.2, ease: "power3.out" },
          0.2
        )
        .to(
          ".loader-star path",
          { fill: "#C1272D", duration: 0.6, ease: "power2.in" },
          "-=0.3"
        )
        .to(starRef.current, {
          scale: 1.25,
          filter: "drop-shadow(0 0 40px rgba(193,39,45,0.9))",
          duration: 0.5,
          ease: "power2.out",
        })
        .to(".loader-count", { opacity: 0, duration: 0.3 }, "<")
        .to(root.current, {
          yPercent: -100,
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
    >
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
      <span className="loader-count mt-10 font-display text-sm tracking-[0.4em] text-maghrib-sand/70">
        <span ref={countRef}>000</span>
      </span>
    </div>
  );
}

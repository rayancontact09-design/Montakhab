"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { players, acts } from "@/lib/content";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * Act II — a horizontally pinned procession of the Atlas Lions. Scroll
 * vertically, walk past the statues.
 */
export default function Squad() {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const trackEl = track.current!;
      const distance = trackEl.scrollWidth - window.innerWidth;

      gsap.to(trackEl, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => `+=${distance + window.innerHeight}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={section}
      className="relative z-10 overflow-hidden bg-maghrib-black"
      aria-label="The squad"
    >
      <div ref={track} className="flex h-screen items-center will-change-transform">
        {/* intro panel */}
        <div className="flex h-full w-screen flex-none flex-col justify-center px-8 md:w-[60vw] md:px-20">
          <span className="font-display text-xs tracking-[0.4em] text-maghrib-red">
            {acts.rise.kicker}
          </span>
          <h2 className="display mt-6 text-5xl text-maghrib-bone md:text-7xl">
            {acts.rise.title}
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-maghrib-sand/70 md:text-base">
            {acts.rise.body}
          </p>
          <span className="mt-10 flex items-center gap-3 text-xs tracking-[0.3em] text-maghrib-sand/50">
            SCROLL <span className="h-px w-12 bg-maghrib-sand/40" /> WALK THE LINE
          </span>
        </div>

        {players.map((p) => (
          <article
            key={p.id}
            className="group relative flex h-full w-[78vw] flex-none flex-col justify-end border-l border-maghrib-bone/10 px-8 pb-24 md:w-[34vw] md:px-12"
          >
            <span className="display absolute right-6 top-24 text-[26vw] leading-none text-maghrib-bone/[0.04] md:text-[16vw]">
              {p.number}
            </span>
            <span className="font-display text-xs tracking-[0.35em] text-maghrib-ember">
              {p.position.toUpperCase()}
            </span>
            <h3 className="display mt-3 text-4xl text-maghrib-bone md:text-5xl">
              {p.name}
            </h3>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-maghrib-sand/70">
              {p.line}
            </p>
            <span className="mt-5 text-[11px] tracking-[0.25em] text-maghrib-sand/40">
              {p.club.toUpperCase()}
            </span>
            <span className="mt-6 h-px w-0 bg-maghrib-red transition-all duration-700 group-hover:w-full" />
          </article>
        ))}
      </div>
    </section>
  );
}

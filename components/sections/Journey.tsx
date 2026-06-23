"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { journey, acts } from "@/lib/content";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * Act III — the 2022 run, retold as a scroll-scrubbed timeline. Each match
 * rises and the connecting line draws as you descend.
 */
export default function Journey() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (!reduced) {
        gsap.fromTo(
          ".jline",
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top",
            ease: "none",
            scrollTrigger: {
              trigger: ".jtimeline",
              start: "top 70%",
              end: "bottom 80%",
              scrub: true,
            },
          }
        );
        gsap.utils.toArray<HTMLElement>(".jrow").forEach((row) => {
          gsap.fromTo(
            row,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: { trigger: row, start: "top 80%" },
            }
          );
        });
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="act-journey"
      ref={root}
      className="relative z-10 bg-maghrib-black/85 px-6 py-32 backdrop-blur-md md:px-10 md:py-48"
      aria-label="The 2022 World Cup run"
    >
      <div className="mx-auto max-w-5xl">
        <span className="font-display text-xs tracking-[0.4em] text-maghrib-red">
          {acts.night.kicker}
        </span>
        <h2 className="display mt-6 text-5xl text-maghrib-bone md:text-8xl">
          {acts.night.title}
        </h2>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-maghrib-sand/70 md:text-lg">
          {acts.night.body}
        </p>

        <div className="jtimeline relative mt-24 pl-8 md:pl-16">
          <span className="jline absolute left-0 top-2 h-full w-[2px] bg-maghrib-red md:left-2" />
          {journey.map((m) => (
            <div key={m.opponent} className="jrow relative mb-20 last:mb-0">
              <span className="absolute -left-[39px] top-2 h-3 w-3 rounded-full bg-maghrib-ember ring-4 ring-maghrib-black md:-left-[55px]" />
              <span className="font-display text-xs tracking-[0.3em] text-maghrib-ember">
                {m.stage.toUpperCase()}
              </span>
              <div className="mt-2 flex flex-wrap items-baseline gap-x-6 gap-y-1">
                <h3 className="display text-3xl text-maghrib-bone md:text-5xl">
                  Morocco
                </h3>
                <span className="display text-3xl text-maghrib-red md:text-5xl">
                  {m.score}
                </span>
                <span className="display text-2xl text-maghrib-sand/60 md:text-4xl">
                  {m.opponent}
                </span>
              </div>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-maghrib-sand/60">
                {m.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

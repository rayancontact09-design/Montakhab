"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useApp } from "@/lib/store";
import { acts } from "@/lib/content";
import SplitReveal from "@/components/motion/SplitReveal";
import MagneticButton from "@/components/motion/MagneticButton";
import Squad from "@/components/sections/Squad";
import Journey from "@/components/sections/Journey";

const Experience = dynamic(() => import("@/components/three/Experience"), {
  ssr: false,
});

export default function Home() {
  const loaded = useApp((s) => s.loaded);
  const hero = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loaded) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-line",
        { yPercent: 120 },
        {
          yPercent: 0,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.1,
          delay: 0.1,
        }
      );
      gsap.fromTo(
        ".hero-fade",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1, delay: 0.9, ease: "power3.out" }
      );
    }, hero);
    return () => ctx.revert();
  }, [loaded]);

  return (
    <main className="relative">
      {/* persistent WebGL layer */}
      <Experience />

      {/* ACT 0 — HERO */}
      <section
        ref={hero}
        className="relative z-10 flex h-screen flex-col items-center justify-center px-6 text-center"
      >
        <span className="hero-fade mb-8 font-display text-xs tracking-[0.5em] text-maghrib-sand/70">
          {acts.hero.kicker}
        </span>
        <h1 className="display text-maghrib-bone">
          {acts.hero.title.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <span className="hero-line block text-[15vw] leading-[0.9] md:text-[11vw]">
                {line}
              </span>
            </span>
          ))}
        </h1>
        <p className="hero-fade mt-8 max-w-md text-sm leading-relaxed text-maghrib-sand/70 md:text-base">
          {acts.hero.sub}
        </p>
        <span className="hero-fade absolute bottom-10 flex flex-col items-center gap-3 text-[10px] tracking-[0.3em] text-maghrib-sand/50">
          SCROLL
          <span className="h-10 w-px animate-pulse-slow bg-maghrib-sand/50" />
        </span>
      </section>

      {/* ACT I — ROOTS */}
      <section className="relative z-10 flex min-h-screen items-center px-6 md:px-20">
        <div className="max-w-3xl">
          <span className="font-display text-xs tracking-[0.4em] text-maghrib-red">
            {acts.land.kicker}
          </span>
          <SplitReveal
            as="h2"
            text={acts.land.title}
            className="display mt-6 text-5xl text-maghrib-bone md:text-7xl"
          />
          <p className="mt-8 max-w-xl text-base leading-relaxed text-maghrib-sand/70 md:text-lg">
            {acts.land.body}
          </p>
        </div>
      </section>

      {/* ACT II — THE RISE */}
      <Squad />

      {/* ACT III — THE NIGHTS */}
      <Journey />

      {/* ACT IV — THE ROAR */}
      <section className="relative z-10 flex min-h-screen items-center justify-center px-6 text-center">
        <div className="max-w-4xl">
          <span className="font-display text-xs tracking-[0.4em] text-maghrib-red">
            {acts.roar.kicker}
          </span>
          <SplitReveal
            as="h2"
            text={acts.roar.title}
            className="display mt-6 text-5xl text-maghrib-bone md:text-8xl"
          />
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-maghrib-sand/70 md:text-lg">
            {acts.roar.body}
          </p>
        </div>
      </section>

      {/* ACT V — THE FUTURE + CTA */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <span className="font-display text-xs tracking-[0.4em] text-maghrib-ember">
          {acts.future.kicker}
        </span>
        <SplitReveal
          as="h2"
          text={acts.future.title}
          className="display mt-6 text-6xl text-maghrib-bone md:text-9xl"
        />
        <p className="mx-auto mt-8 max-w-lg text-base leading-relaxed text-maghrib-sand/70 md:text-lg">
          {acts.future.body}
        </p>
        <div className="mt-12">
          <MagneticButton href="/studio">ENTER THE STUDIO</MagneticButton>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-maghrib-bone/10 bg-maghrib-black px-6 py-16 md:px-20">
        <div className="mx-auto flex max-w-[1800px] flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <h3 className="display text-4xl text-maghrib-bone md:text-6xl">
              دير لي صداع
            </h3>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-maghrib-sand/50">
              A concept experience by an Awwwards-minded studio. Three.js,
              GSAP, Next.js. Built to make a nation — and a client — feel
              something.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-maghrib-sand/60">
            <span className="text-[11px] tracking-[0.3em] text-maghrib-red">
              CONCEPT — 2026
            </span>
            <span>Dima Maghrib · ⵣ · #DimaMaghrib</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

"use client";

import Link from "next/link";
import SplitReveal from "@/components/motion/SplitReveal";

/**
 * A lightweight inner-page shell so the deeper routes share the hero
 * language of the homepage without re-running the heavy WebGL layer.
 */
export default function PageShell({
  kicker,
  title,
  intro,
  children,
}: {
  kicker: string;
  title: string;
  intro: string;
  children?: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen bg-maghrib-black">
      {/* ambient ember wash */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-60"
        style={{
          background:
            "radial-gradient(60% 50% at 70% 0%, rgba(255,107,53,0.12), transparent 70%), radial-gradient(50% 50% at 0% 100%, rgba(193,39,45,0.12), transparent 70%)",
        }}
      />
      <section className="relative z-10 px-6 pb-24 pt-40 md:px-20 md:pt-52">
        <span className="font-display text-xs tracking-[0.4em] text-maghrib-red">
          {kicker}
        </span>
        <SplitReveal
          as="h1"
          text={title}
          className="display mt-6 max-w-5xl text-5xl text-maghrib-bone md:text-8xl"
        />
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-maghrib-sand/70 md:text-lg">
          {intro}
        </p>
      </section>

      <section className="relative z-10 px-6 pb-32 md:px-20">{children}</section>

      <footer className="relative z-10 border-t border-maghrib-bone/10 px-6 py-12 md:px-20">
        <Link
          href="/"
          className="text-sm tracking-[0.2em] text-maghrib-sand/60 transition-colors hover:text-maghrib-bone"
        >
          ← BACK TO THE EXPERIENCE
        </Link>
      </footer>
    </main>
  );
}

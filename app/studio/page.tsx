"use client";

import PageShell from "@/components/PageShell";
import MagneticButton from "@/components/motion/MagneticButton";

const capabilities = [
  "Creative Direction",
  "3D / WebGL",
  "Scroll Cinematics",
  "Brand Identity",
  "Motion Design",
  "Performance",
];

export default function StudioPage() {
  return (
    <PageShell
      kicker="STUDIO"
      title="We build feeling."
      intro="Al Maghrib is a concept piece — a demonstration of what a premium digital experience can be when craft, story and engineering meet. If it made you feel something, that's the point."
    >
      <div className="flex flex-wrap gap-3">
        {capabilities.map((c) => (
          <span
            key={c}
            className="rounded-full border border-maghrib-bone/20 px-5 py-2 text-xs tracking-[0.2em] text-maghrib-sand/70"
          >
            {c.toUpperCase()}
          </span>
        ))}
      </div>

      <div className="mt-24 border-t border-maghrib-bone/10 pt-16">
        <h2 className="display max-w-3xl text-4xl text-maghrib-bone md:text-6xl">
          Let&apos;s build the experience your brand deserves.
        </h2>
        <div className="mt-10">
          <MagneticButton href="mailto:hello@almaghrib.studio">
            START A PROJECT
          </MagneticButton>
        </div>
      </div>
    </PageShell>
  );
}

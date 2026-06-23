"use client";

import PageShell from "@/components/PageShell";
import { journey } from "@/lib/content";

export default function JourneyPage() {
  return (
    <PageShell
      kicker="THE RUN"
      title="Qatar, 2022."
      intro="The first African and Arab nation to reach a World Cup semi-final. Match by match, the run that rewrote history."
    >
      <div className="divide-y divide-maghrib-bone/10 border-y border-maghrib-bone/10">
        {journey.map((m) => (
          <div
            key={m.opponent}
            className="group flex flex-col gap-2 py-8 transition-colors hover:bg-maghrib-bone/[0.02] md:flex-row md:items-center md:justify-between"
          >
            <span className="font-display text-xs tracking-[0.3em] text-maghrib-ember md:w-40">
              {m.stage.toUpperCase()}
            </span>
            <div className="flex flex-1 items-baseline gap-4">
              <span className="display text-2xl text-maghrib-bone md:text-4xl">
                Morocco
              </span>
              <span className="display text-2xl text-maghrib-red md:text-4xl">
                {m.score}
              </span>
              <span className="display text-xl text-maghrib-sand/60 md:text-3xl">
                {m.opponent}
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-maghrib-sand/60">
              {m.note}
            </p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}

"use client";

import PageShell from "@/components/PageShell";
import { players } from "@/lib/content";

export default function SquadPage() {
  return (
    <PageShell
      kicker="THE PRIDE"
      title="The Lions of the Atlas."
      intro="Eleven on the pitch, forty million behind them. The names that made the world believe."
    >
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-maghrib-bone/10 sm:grid-cols-2 lg:grid-cols-3">
        {players.map((p) => (
          <article
            key={p.id}
            className="group relative flex flex-col justify-between bg-maghrib-black p-8 transition-colors hover:bg-maghrib-red/10"
          >
            <div className="flex items-start justify-between">
              <span className="font-display text-xs tracking-[0.3em] text-maghrib-ember">
                {p.position.toUpperCase()}
              </span>
              <span className="display text-6xl text-maghrib-bone/10">
                {p.number}
              </span>
            </div>
            <div className="mt-16">
              <h2 className="display text-3xl text-maghrib-bone">{p.name}</h2>
              <p className="mt-3 text-sm leading-relaxed text-maghrib-sand/60">
                {p.line}
              </p>
              <span className="mt-4 block text-[11px] tracking-[0.25em] text-maghrib-sand/40">
                {p.club.toUpperCase()}
              </span>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}

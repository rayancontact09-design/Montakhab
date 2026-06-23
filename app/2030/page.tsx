"use client";

import PageShell from "@/components/PageShell";

const facts = [
  { k: "2030", v: "Co-hosting the FIFA World Cup with Spain & Portugal." },
  { k: "6", v: "Host cities across the Kingdom, from Tangier to Agadir." },
  { k: "1st", v: "World Cup ever staged across two continents." },
  { k: "∞", v: "A generation of children who now believe it's possible." },
];

export default function FuturePage() {
  return (
    <PageShell
      kicker="THE FUTURE"
      title="2030. Coming home."
      intro="The lions reached the summit on someone else's soil. In 2030, the world comes to theirs."
    >
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-maghrib-bone/10 lg:grid-cols-4">
        {facts.map((f) => (
          <div key={f.k} className="bg-maghrib-black p-8 md:p-10">
            <span className="display text-5xl text-maghrib-red md:text-7xl">
              {f.k}
            </span>
            <p className="mt-4 text-sm leading-relaxed text-maghrib-sand/60">
              {f.v}
            </p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}

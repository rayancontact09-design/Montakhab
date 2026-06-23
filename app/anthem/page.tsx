"use client";

import PageShell from "@/components/PageShell";

const pillars = [
  {
    t: "The Flag",
    d: "Red for the descendants of the Prophet, green for peace and the five pillars of Islam. A pentagram stitched in the centre — Khatim Sulayman, the Seal of Solomon.",
  },
  {
    t: "The Sujood",
    d: "After Spain, the whole squad fell into prostration. A celebration that became an image around the world — faith, gratitude and unity in one frame.",
  },
  {
    t: "The Mothers",
    d: "Hakimi kissing his mother. Saïss with his daughter. Boufal dancing with his mum on the pitch. A team that brought its family to the world stage.",
  },
  {
    t: "The Diaspora",
    d: "From Casablanca to Brussels, Paris to Amsterdam — millions who had never met, roaring as one. The twelfth man had no borders.",
  },
];

export default function AnthemPage() {
  return (
    <PageShell
      kicker="HERITAGE"
      title="More than a team."
      intro="Morocco's run was carried by culture, faith and family. These are the threads that made it feel like home for a continent."
    >
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-maghrib-bone/10 md:grid-cols-2">
        {pillars.map((p) => (
          <article key={p.t} className="bg-maghrib-black p-10">
            <h2 className="display text-3xl text-maghrib-bone md:text-4xl">
              {p.t}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-maghrib-sand/60 md:text-base">
              {p.d}
            </p>
          </article>
        ))}
      </div>
    </PageShell>
  );
}

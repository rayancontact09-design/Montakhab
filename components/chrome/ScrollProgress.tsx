"use client";

import { useApp } from "@/lib/store";

/**
 * A slim red progress rail down the right edge — the "match clock" of the
 * scroll — with the current act label set vertically beside it.
 */
export default function ScrollProgress() {
  const progress = useApp((s) => s.progress);
  const act = useApp((s) => s.act);

  return (
    <div className="fixed right-4 top-1/2 z-[70] hidden -translate-y-1/2 items-center gap-4 md:flex">
      {act && (
        <span
          className="font-display text-[10px] tracking-[0.35em] text-maghrib-sand/60 transition-opacity duration-500"
          style={{ writingMode: "vertical-rl" }}
        >
          {act}
        </span>
      )}
      <div className="relative h-40 w-[2px] bg-maghrib-bone/15">
        <div
          className="absolute left-0 top-0 w-full bg-maghrib-red transition-[height] duration-150 ease-out"
          style={{ height: `${Math.round(progress * 100)}%` }}
        />
      </div>
    </div>
  );
}

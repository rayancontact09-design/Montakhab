"use client";

import { useApp } from "@/lib/store";

/**
 * A slim red progress rail down the right edge — the "match clock" of the
 * scroll. Hidden for reduced-motion users via the global CSS.
 */
export default function ScrollProgress() {
  const progress = useApp((s) => s.progress);

  return (
    <div className="fixed right-3 top-1/2 z-[70] hidden h-40 -translate-y-1/2 md:block">
      <div className="relative h-full w-[2px] bg-maghrib-bone/15">
        <div
          className="absolute left-0 top-0 w-full bg-maghrib-red"
          style={{ height: `${Math.round(progress * 100)}%` }}
        />
      </div>
    </div>
  );
}

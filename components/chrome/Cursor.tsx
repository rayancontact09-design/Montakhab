"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/**
 * A two-part custom cursor — an instant dot and a trailing ring that
 * swells over interactive elements. Desktop / fine-pointer only; never
 * shown on touch, and disabled for reduced-motion users.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.body.style.cursor = "none";

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...pos };

    const xTo = gsap.quickTo(dot.current, "x", { duration: 0.08, ease: "power3" });
    const yTo = gsap.quickTo(dot.current, "y", { duration: 0.08, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const tick = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.18;
      ringPos.y += (pos.y - ringPos.y) * 0.18;
      if (ring.current)
        ring.current.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%)`;
    };
    gsap.ticker.add(tick);

    const isInteractive = (el: EventTarget | null) =>
      el instanceof Element &&
      el.closest("a, button, [data-hover], input, textarea");

    const onOver = (e: MouseEvent) => {
      if (isInteractive(e.target))
        gsap.to(ring.current, { scale: 2.4, opacity: 0.5, duration: 0.3 });
    };
    const onOut = (e: MouseEvent) => {
      if (isInteractive(e.target))
        gsap.to(ring.current, { scale: 1, opacity: 1, duration: 0.3 });
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      document.body.style.cursor = "";
      gsap.ticker.remove(tick);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[110] mix-blend-difference">
      <div
        ref={ring}
        className="absolute left-0 top-0 h-8 w-8 rounded-full border border-maghrib-bone"
        style={{ transform: "translate(-50%, -50%)" }}
      />
      <div
        ref={dot}
        className="absolute left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-maghrib-bone"
      />
    </div>
  );
}

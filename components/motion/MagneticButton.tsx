"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";

export default function MagneticButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    gsap.to(el, { x: x * 0.35, y: y * 0.35, duration: 0.6, ease: "power3.out" });
  };

  const onLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
  };

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group relative inline-flex items-center gap-4 rounded-full border border-maghrib-bone/30 px-9 py-5 text-sm tracking-[0.2em] text-maghrib-bone transition-colors hover:border-maghrib-red"
    >
      <span className="absolute inset-0 -z-10 scale-0 rounded-full bg-maghrib-red transition-transform duration-500 group-hover:scale-100" />
      {children}
      <span className="transition-transform duration-500 group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}

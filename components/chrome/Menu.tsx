"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useApp } from "@/lib/store";

const links = [
  { href: "/", label: "The Experience", index: "01" },
  { href: "/squad", label: "The Pride", index: "02" },
  { href: "/journey", label: "The Run", index: "03" },
  { href: "/anthem", label: "Heritage", index: "04" },
  { href: "/2030", label: "The Future", index: "05" },
  { href: "/studio", label: "Studio", index: "06" },
];

export default function Menu() {
  const { menuOpen, setMenuOpen } = useApp();
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (menuOpen) {
        gsap.set(root.current, { display: "flex" });
        gsap.fromTo(
          root.current,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 0.8,
            ease: "power4.inOut",
          }
        );
        gsap.fromTo(
          ".menu-link",
          { yPercent: 120, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.07,
            delay: 0.25,
            ease: "power4.out",
          }
        );
      } else {
        gsap.to(root.current, {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.6,
          ease: "power4.inOut",
          onComplete: () => gsap.set(root.current, { display: "none" }),
        });
      }
    }, root);
    return () => ctx.revert();
  }, [menuOpen]);

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[90] hidden flex-col justify-center overflow-hidden bg-maghrib-red"
      style={{ display: "none" }}
    >
      {/* zellij texture wash */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #000 0 2px, transparent 2px 22px), repeating-linear-gradient(-45deg, #000 0 2px, transparent 2px 22px)",
        }}
      />
      <nav className="relative mx-auto w-full max-w-[1800px] px-6 md:px-10">
        <ul>
          {links.map((l) => (
            <li key={l.href} className="overflow-hidden">
              <Link
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="menu-link group flex items-baseline gap-5 py-1 md:gap-8"
              >
                <span className="font-sans text-xs text-maghrib-black/60 md:text-sm">
                  {l.index}
                </span>
                <span className="display text-[13vw] leading-[0.95] text-maghrib-bone transition-transform duration-500 group-hover:translate-x-4 md:text-[8vw]">
                  {l.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-md text-xs leading-relaxed tracking-wide text-maghrib-black/70">
          A concept experience. Built to feel like a cup run — designed,
          engineered and animated as a portfolio statement.
        </p>
      </nav>
    </div>
  );
}

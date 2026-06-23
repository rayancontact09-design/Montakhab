"use client";

import Link from "next/link";
import { useApp } from "@/lib/store";

export default function Nav() {
  const { menuOpen, setMenuOpen, soundOn, toggleSound } = useApp();

  return (
    <header className="fixed inset-x-0 top-0 z-[80] mix-blend-difference">
      <div className="mx-auto flex max-w-[1800px] items-center justify-between px-5 py-5 md:px-10 md:py-7">
        <Link
          href="/"
          className="flex items-center gap-3 text-bone"
          aria-label="Al Maghrib home"
        >
          <svg className="h-6 w-6" viewBox="0 0 100 100" aria-hidden>
            <path
              fill="#F5F2EC"
              d="M50 4 61.8 38.2 97.6 38.2 68.9 59.5 80.7 93.8 50 72.5 19.3 93.8 31.1 59.5 2.4 38.2 38.2 38.2Z"
            />
          </svg>
          <span className="font-display text-sm font-bold tracking-[0.25em] text-maghrib-bone">
            AL MAGHRIB
          </span>
        </Link>

        <div className="flex items-center gap-5 md:gap-7">
          <button
            onClick={toggleSound}
            className="hidden items-center gap-2 text-[11px] tracking-[0.25em] text-maghrib-bone sm:flex"
            aria-pressed={soundOn}
          >
            <span
              className={`inline-block h-2 w-2 rounded-full ${
                soundOn ? "bg-maghrib-ember animate-pulse-slow" : "bg-maghrib-bone/40"
              }`}
            />
            SOUND {soundOn ? "ON" : "OFF"}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col items-end gap-[5px]"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span
              className={`block h-[2px] bg-maghrib-bone transition-all duration-300 ${
                menuOpen ? "w-6 translate-y-[7px] rotate-45" : "w-7"
              }`}
            />
            <span
              className={`block h-[2px] w-5 bg-maghrib-bone transition-all duration-300 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-[2px] bg-maghrib-bone transition-all duration-300 ${
                menuOpen ? "w-6 -translate-y-[7px] -rotate-45" : "w-4"
              }`}
            />
          </button>
        </div>
      </div>
    </header>
  );
}

"use client";

import { create } from "zustand";

export type Lang = "en" | "fr" | "ar";

interface AppState {
  loaded: boolean;
  setLoaded: (v: boolean) => void;

  soundOn: boolean;
  toggleSound: () => void;

  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;

  lang: Lang;
  setLang: (l: Lang) => void;

  // 0..1 overall scroll progress, driven by Lenis
  progress: number;
  setProgress: (p: number) => void;

  // current act label (e.g. "II · THE RISE"), driven by CameraDirector
  act: string;
  setAct: (a: string) => void;
}

export const useApp = create<AppState>((set) => ({
  loaded: false,
  setLoaded: (v) => set({ loaded: v }),

  soundOn: false,
  toggleSound: () => set((s) => ({ soundOn: !s.soundOn })),

  menuOpen: false,
  setMenuOpen: (v) => set({ menuOpen: v }),

  lang: "en",
  setLang: (l) => set({ lang: l }),

  progress: 0,
  setProgress: (p) => set({ progress: p }),

  act: "",
  setAct: (a) => set({ act: a }),
}));

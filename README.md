# ⵎ AL MAGHRIB — *The Heart of the Atlas*

A portfolio-level **concept experience** for the Morocco national football team — a cinematic, scroll-driven 3D website built to stand beside Apple, Nike, Adidas and FIFA digital work.

> *"From the mountains, a roar."*

---

## The Concept

A digital monument to the Atlas Lions, structured as a short film you control with your scroll. Five acts: **Roots → The Rise → The Nights → The Roar → The Future (2030)**. We sell *feeling*, not stats.

### Visual identity
- **Palette:** Maghrebi Red `#C1272D`, Atlas Black `#0A0A0B`, Star Green `#006233`, Sahara Sand `#E8DCC4`, Bone White `#F5F2EC`, Sunset Ember `#FF6B35`. Dark-first; red is *earned* at emotional peaks.
- **Type:** Bricolage Grotesque (display) + Inter (body), with Arabic/Tifinagh (ⵣ) as a graphic motif.
- **Motifs:** the five-pointed green star, zellij geometry, film grain, liquid-red reveals.

### Sitemap
```
/          The Experience — one-page cinematic scroll (Acts I–V)
/squad     The Pride — the roster
/journey   The Run — the 2022 World Cup timeline
/anthem    Heritage — culture, faith, family, diaspora
/2030      The Future — Morocco as co-host
/studio    The Sell — the (concept) agency + contact
```

---

## Tech

| Concern | Tooling |
|---|---|
| Framework | Next.js 14 (App Router) + TypeScript |
| 3D | Three.js · React Three Fiber · postprocessing (Bloom) |
| Animation | GSAP + ScrollTrigger |
| Smooth scroll | Lenis (wired into GSAP ticker) |
| Styling | Tailwind CSS + design tokens |
| State | Zustand |

### Performance & a11y
- The WebGL layer is **lazy-loaded** (`ssr: false`) and kept out of the shared bundle.
- **Progressive enhancement:** `lib/gpu.ts` drops to a lighter scene (fewer particles, lower DPR, no bloom) on low-tier / small / reduced-motion devices.
- `prefers-reduced-motion` is respected across smooth scroll, split-text and pinned sections.
- Fonts preloaded & subset via `next/font`.

### Signature moments
- **Star-ignition loader** — a heartbeat counter, the green star ignites red, curtain lifts.
- **Faceted star core** — a scroll-reactive 3D jewel that shifts green → red with bloom.
- **Crowd particle sea** — warms and drifts inward toward "The Roar".
- **Pinned squad procession** — scroll vertically, walk past the lions horizontally.
- **Scrubbed match timeline** — the run draws itself as you descend.

---

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

---

## Project structure
```
app/                routes (homepage + 5 deep pages)
components/
  chrome/           loader, nav, full-screen menu, scroll rail
  three/            Experience canvas, StarCore, CrowdField
  sections/         Squad (pinned), Journey (timeline)
  motion/           SplitReveal, MagneticButton
  Home.tsx          assembles the homepage acts
lib/                store (zustand), content, gpu tier, smooth-scroll
```

*Concept piece — 2026. Dima Maghrib. ⵣ*

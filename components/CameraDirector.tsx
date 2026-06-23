"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setWaypoint, WAYPOINTS, ACTS } from "@/lib/scene";
import { useApp } from "@/lib/store";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// section id -> camera waypoint key
const MAP: { id: string; wp: keyof typeof WAYPOINTS }[] = [
  { id: "act-hero", wp: "hero" },
  { id: "act-roots", wp: "roots" },
  { id: "act-crest", wp: "crest" },
  { id: "act-squad", wp: "rise" },
  { id: "act-journey", wp: "nights" },
  { id: "act-roar", wp: "roar" },
  { id: "act-future", wp: "future" },
];

/**
 * Bridges scroll position to the 3D camera. As each act enters the
 * viewport it pushes its waypoint, and the in-canvas Rig eases toward it.
 */
export default function CameraDirector() {
  const setAct = useApp((s) => s.setAct);

  useEffect(() => {
    const triggers = MAP.map(({ id, wp }) =>
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: "top 60%",
        end: "bottom 40%",
        onToggle: (self) => {
          if (self.isActive) {
            setWaypoint(wp);
            setAct(ACTS[wp] ?? "");
          }
        },
      })
    );
    // ensure measurements are correct after pinned sections register
    const refresh = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => {
      clearTimeout(refresh);
      triggers.forEach((t) => t.kill());
    };
  }, [setAct]);

  return null;
}

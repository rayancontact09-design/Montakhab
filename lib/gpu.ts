"use client";

/**
 * Lightweight capability detection so the cinematic 3D layer is
 * progressively enhanced. Low-tier devices fall back to lighter scenes.
 */
export function detectTier(): "high" | "low" {
  if (typeof window === "undefined") return "high";

  const reduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (reduced) return "low";

  const cores = navigator.hardwareConcurrency ?? 4;
  const mem = (navigator as Navigator & { deviceMemory?: number })
    .deviceMemory;
  const small = window.matchMedia("(max-width: 768px)").matches;

  // Probe for a working WebGL context.
  let gl: WebGLRenderingContext | null = null;
  try {
    const canvas = document.createElement("canvas");
    gl =
      (canvas.getContext("webgl2") as WebGLRenderingContext | null) ||
      (canvas.getContext("webgl") as WebGLRenderingContext | null);
  } catch {
    gl = null;
  }
  if (!gl) return "low";

  if (cores <= 4 && small) return "low";
  if (mem !== undefined && mem <= 4) return "low";

  return "high";
}

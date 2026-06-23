import * as THREE from "three";

/**
 * Single source of truth for where 3D objects live in the world and where
 * the camera should travel to feature each one. DOM sections push a
 * waypoint (via setWaypoint) as they scroll into view; the Rig damps the
 * camera toward it every frame for cinematic, eased transitions.
 */

export const POS = {
  star: new THREE.Vector3(0, 0, 0),
  flag: new THREE.Vector3(5.6, -0.3, -3),
  crest: new THREE.Vector3(-4.8, -1.1, -7),
};

export type Waypoint = {
  p: [number, number, number];
  t: [number, number, number];
  fov: number;
};

export const WAYPOINTS: Record<string, Waypoint> = {
  hero: { p: [0, 0.3, 6.8], t: [0, 0, 0], fov: 42 },
  // sweep right to frame the unfurling flag
  roots: { p: [4.6, 0.2, 1.4], t: [POS.flag.x, POS.flag.y, POS.flag.z], fov: 44 },
  // glide left-and-around to the crest, lower and intimate
  crest: { p: [-4.4, -0.6, -2.6], t: [POS.crest.x, POS.crest.y, POS.crest.z], fov: 36 },
  // pull back and rise for the procession of names
  rise: { p: [0, 1.4, 9.5], t: [0, 0, 0], fov: 48 },
  nights: { p: [2.2, 0.6, 7.2], t: [0, 0, 0], fov: 44 },
  // dive into the heart for the roar
  roar: { p: [0, 0, 1.6], t: [0, 0, 0], fov: 64 },
  future: { p: [0, 0.5, 7.6], t: [0, 0, 0], fov: 40 },
};

export const ACTS: Record<string, string> = {
  hero: "",
  roots: "I · ROOTS",
  crest: "I · THE CREST",
  rise: "II · THE RISE",
  nights: "III · THE NIGHTS",
  roar: "IV · THE ROAR",
  future: "V · THE FUTURE",
};

// Mutable target the Rig reads each frame (kept out of React for perf).
export const camTarget = {
  pos: new THREE.Vector3(0, 0.3, 6.8),
  look: new THREE.Vector3(0, 0, 0),
  fov: 42,
};

export function setWaypoint(name: keyof typeof WAYPOINTS) {
  const w = WAYPOINTS[name];
  if (!w) return;
  camTarget.pos.set(w.p[0], w.p[1], w.p[2]);
  camTarget.look.set(w.t[0], w.t[1], w.t[2]);
  camTarget.fov = w.fov;
}

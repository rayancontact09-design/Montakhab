import * as THREE from "three";

/**
 * The five-pointed Moroccan star, extruded and beveled into a faceted
 * jewel. Shared by the hero core and the federation crest emblem.
 */
export function makeStarGeometry(opts?: {
  outer?: number;
  inner?: number;
  depth?: number;
  bevel?: number;
}) {
  const outer = opts?.outer ?? 1;
  const inner = opts?.inner ?? 0.42;
  const depth = opts?.depth ?? 0.34;
  const bevel = opts?.bevel ?? 0.1;

  const shape = new THREE.Shape();
  const spikes = 5;
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (i / (spikes * 2)) * Math.PI * 2 - Math.PI / 2;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: bevel * 1.2,
    bevelSize: bevel,
    bevelSegments: 6,
    curveSegments: 24,
  });
  geo.center();
  geo.computeVertexNormals();
  return geo;
}

/**
 * Draws the Moroccan flag onto a canvas — a crimson field with the green
 * pentagram (Seal of Solomon) stroked as a continuous {5/2} star.
 */
export function makeFlagTexture(): THREE.CanvasTexture {
  const w = 768;
  const h = 512;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;

  // crimson field
  ctx.fillStyle = "#C1272D";
  ctx.fillRect(0, 0, w, h);

  // subtle vertical sheen for depth
  const grad = ctx.createLinearGradient(0, 0, w, 0);
  grad.addColorStop(0, "rgba(0,0,0,0.16)");
  grad.addColorStop(0.5, "rgba(255,255,255,0.05)");
  grad.addColorStop(1, "rgba(0,0,0,0.12)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // pentagram
  const cx = w / 2;
  const cy = h / 2;
  const R = h * 0.26;
  const pts: [number, number][] = [];
  for (let i = 0; i < 5; i++) {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
    pts.push([cx + Math.cos(a) * R, cy + Math.sin(a) * R]);
  }
  const order = [0, 2, 4, 1, 3];
  ctx.beginPath();
  order.forEach((p, idx) => {
    const [px, py] = pts[p];
    if (idx === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  });
  ctx.closePath();
  ctx.lineJoin = "miter";
  ctx.lineWidth = h * 0.028;
  ctx.strokeStyle = "#006233";
  ctx.stroke();

  const tex = new THREE.CanvasTexture(c);
  tex.anisotropy = 8;
  tex.needsUpdate = true;
  return tex;
}

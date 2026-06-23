"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { makeFlagTexture } from "@/lib/geometry";
import { POS } from "@/lib/scene";

/**
 * A Verlet-integrated cloth flag. The pole-side edge is pinned; wind and a
 * touch of gravity ripple the crimson field while the camera frames it in
 * Act I. Quality scales with the device tier.
 */
export default function FlagCloth({ tier }: { tier: "high" | "low" }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const GX = tier === "high" ? 30 : 18;
  const GY = tier === "high" ? 20 : 12;
  const WIDTH = 4.2;
  const HEIGHT = 2.8;

  const texture = useMemo(() => makeFlagTexture(), []);

  const geometry = useMemo(
    () => new THREE.PlaneGeometry(WIDTH, HEIGHT, GX, GY),
    [GX, GY]
  );

  // Verlet state
  const sim = useMemo(() => {
    const cols = GX + 1;
    const rows = GY + 1;
    const n = cols * rows;
    const pos = new Float32Array(n * 3);
    const prev = new Float32Array(n * 3);
    const pinned = new Uint8Array(n);
    const arr = geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < n; i++) {
      pos[i * 3] = arr[i * 3];
      pos[i * 3 + 1] = arr[i * 3 + 1];
      pos[i * 3 + 2] = arr[i * 3 + 2];
      prev[i * 3] = arr[i * 3];
      prev[i * 3 + 1] = arr[i * 3 + 1];
      prev[i * 3 + 2] = arr[i * 3 + 2];
      const ix = i % cols;
      if (ix === 0) pinned[i] = 1; // pole edge
    }
    const restX = WIDTH / GX;
    const restY = HEIGHT / GY;
    const restD = Math.hypot(restX, restY);
    // constraints: structural (right, down) + shear (diagonals)
    const cons: [number, number, number][] = [];
    for (let r = 0; r < rows; r++) {
      for (let cI = 0; cI < cols; cI++) {
        const i = r * cols + cI;
        if (cI < cols - 1) cons.push([i, i + 1, restX]);
        if (r < rows - 1) cons.push([i, i + cols, restY]);
        if (cI < cols - 1 && r < rows - 1)
          cons.push([i, i + cols + 1, restD]);
        if (cI > 0 && r < rows - 1) cons.push([i, i + cols - 1, restD]);
      }
    }
    return { cols, rows, n, pos, prev, pinned, cons };
  }, [GX, GY, geometry]);

  useEffect(() => () => texture.dispose(), [texture]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 1 / 30);
    const { n, pos, prev, pinned, cons, cols } = sim;
    const t = state.clock.elapsedTime;
    const damping = 0.98;
    const gravity = -0.55 * dt * dt;

    for (let i = 0; i < n; i++) {
      if (pinned[i]) continue;
      const ix3 = i * 3;
      const ix = i % cols;

      // wind grows with distance from the pole
      const reach = ix / cols;
      const wind =
        (Math.sin(t * 2.1 + ix * 0.5) * 0.5 +
          Math.sin(t * 1.3 + (i / cols) * 0.4) * 0.5) *
        0.0045 *
        (0.3 + reach);
      const flutter = Math.sin(t * 6 + i) * 0.0008 * reach;

      for (let a = 0; a < 3; a++) {
        const cur = pos[ix3 + a];
        let next = cur + (cur - prev[ix3 + a]) * damping;
        if (a === 1) next += gravity; // y
        if (a === 2) next += wind + flutter; // z
        prev[ix3 + a] = cur;
        pos[ix3 + a] = next;
      }
    }

    // satisfy constraints
    const iterations = 10;
    for (let k = 0; k < iterations; k++) {
      for (let ci = 0; ci < cons.length; ci++) {
        const [a, b, rest] = cons[ci];
        const a3 = a * 3;
        const b3 = b * 3;
        const dx = pos[b3] - pos[a3];
        const dy = pos[b3 + 1] - pos[a3 + 1];
        const dz = pos[b3 + 2] - pos[a3 + 2];
        const d = Math.hypot(dx, dy, dz) || 0.0001;
        const diff = ((d - rest) / d) * 0.5;
        const ox = dx * diff;
        const oy = dy * diff;
        const oz = dz * diff;
        if (!pinned[a]) {
          pos[a3] += ox;
          pos[a3 + 1] += oy;
          pos[a3 + 2] += oz;
        }
        if (!pinned[b]) {
          pos[b3] -= ox;
          pos[b3 + 1] -= oy;
          pos[b3 + 2] -= oz;
        }
      }
    }

    const attr = geometry.attributes.position as THREE.BufferAttribute;
    (attr.array as Float32Array).set(pos);
    attr.needsUpdate = true;
    geometry.computeVertexNormals();
  });

  return (
    <group position={POS.flag} rotation={[0, -0.5, 0]}>
      {/* flag pole */}
      <mesh position={[-WIDTH / 2 - 0.05, 0.2, 0]}>
        <cylinderGeometry args={[0.04, 0.04, HEIGHT + 1.2, 16]} />
        <meshStandardMaterial color="#1a1a1d" metalness={0.9} roughness={0.3} />
      </mesh>
      <mesh ref={meshRef} geometry={geometry} castShadow>
        <meshStandardMaterial
          map={texture}
          side={THREE.DoubleSide}
          metalness={0.05}
          roughness={0.62}
        />
      </mesh>
    </group>
  );
}

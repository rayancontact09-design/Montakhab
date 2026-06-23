"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useApp } from "@/lib/store";

/**
 * A sea of points — part starfield, part crowd. As the scroll progresses
 * toward "The Roar" the field warms from sand to red and drifts inward,
 * as if the camera is descending into the stands.
 */
export default function CrowdField({ count = 2200 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);
  const mat = useRef<THREE.PointsMaterial>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sand = new THREE.Color("#E8DCC4");
    const red = new THREE.Color("#C1272D");
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 16;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

      const c = Math.random() > 0.5 ? sand : red;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, [count]);

  useFrame((state, delta) => {
    if (!points.current) return;
    const progress = useApp.getState().progress;
    points.current.rotation.y += delta * 0.02;
    points.current.rotation.y += progress * delta * 0.15;
    if (mat.current) {
      mat.current.size = THREE.MathUtils.lerp(
        mat.current.size,
        0.03 + progress * 0.05,
        0.05
      );
      mat.current.opacity = 0.35 + progress * 0.45;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={mat}
        size={0.03}
        vertexColors
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

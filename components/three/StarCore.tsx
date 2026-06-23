"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useApp } from "@/lib/store";
import { makeStarGeometry } from "@/lib/geometry";

/**
 * The hero five-pointed star, a faceted metallic jewel. It rotates
 * continuously and reacts to scroll + pointer, shifting its emissive
 * colour from green (roots) toward red (the roar).
 */
export default function StarCore() {
  const group = useRef<THREE.Group>(null);
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  const geometry = useMemo(() => makeStarGeometry(), []);

  const green = useMemo(() => new THREE.Color("#006233"), []);
  const red = useMemo(() => new THREE.Color("#C1272D"), []);
  const tmp = useMemo(() => new THREE.Color(), []);

  useFrame((state, delta) => {
    const progress = useApp.getState().progress;
    if (!group.current) return;

    group.current.rotation.y += delta * 0.25;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -0.2 + state.pointer.y * 0.25,
      0.05
    );
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      state.pointer.x * 0.2,
      0.05
    );

    // gentle scroll-driven scale + emissive colour journey
    const s = 1 + Math.sin(progress * Math.PI) * 0.12;
    group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, s, 0.06));

    if (mat.current) {
      tmp.copy(green).lerp(red, Math.min(1, progress * 1.4));
      mat.current.emissive.copy(tmp);
      mat.current.emissiveIntensity = 0.4 + Math.sin(progress * Math.PI) * 0.5;
    }
  });

  return (
    <group ref={group} rotation={[-0.2, 0, 0]}>
      <mesh geometry={geometry} castShadow>
        <meshStandardMaterial
          ref={mat}
          color="#0d0d10"
          metalness={0.9}
          roughness={0.25}
          emissive="#006233"
          emissiveIntensity={0.4}
        />
      </mesh>
      {/* wireframe halo */}
      <mesh geometry={geometry} scale={1.04}>
        <meshBasicMaterial
          color="#FF6B35"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>
    </group>
  );
}

"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PresentationControls, Float } from "@react-three/drei";
import * as THREE from "three";
import { makeStarGeometry } from "@/lib/geometry";
import { POS } from "@/lib/scene";

/**
 * The federation crest, rendered as a gold medallion with an embossed
 * green-enamel pentagram. Drag to rotate (PresentationControls) with a
 * spring snap-back — the signature interactive object of Act I.
 */
function Medallion() {
  const star = useMemo(
    () => makeStarGeometry({ outer: 0.62, inner: 0.26, depth: 0.12, bevel: 0.04 }),
    []
  );
  const ring = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ring.current) ring.current.rotation.z += delta * 0.05;
  });

  return (
    <group>
      {/* coin body */}
      <mesh castShadow>
        <cylinderGeometry args={[1.15, 1.15, 0.16, 72]} />
        <meshStandardMaterial
          color="#caa24b"
          metalness={1}
          roughness={0.22}
        />
      </mesh>
      {/* inset face */}
      <mesh position={[0, 0.085, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.0, 72]} />
        <meshStandardMaterial color="#0c2a18" metalness={0.6} roughness={0.35} />
      </mesh>
      {/* decorative outer ring */}
      <mesh ref={ring} position={[0, 0.09, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.04, 0.03, 16, 80]} />
        <meshStandardMaterial color="#e7c977" metalness={1} roughness={0.18} />
      </mesh>
      {/* embossed pentagram */}
      <mesh
        geometry={star}
        position={[0, 0.12, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        castShadow
      >
        <meshStandardMaterial
          color="#0a7a3e"
          metalness={0.45}
          roughness={0.2}
          emissive="#063"
          emissiveIntensity={0.25}
        />
      </mesh>
    </group>
  );
}

export default function Crest({ tier }: { tier: "high" | "low" }) {
  if (tier === "low") {
    // Static, non-interactive on low-end devices.
    return (
      <group position={POS.crest} rotation={[0.3, 0.4, 0]} scale={0.9}>
        <Medallion />
      </group>
    );
  }

  return (
    <group position={POS.crest}>
      <PresentationControls
        global={false}
        cursor
        snap
        speed={1.4}
        zoom={1}
        rotation={[0.25, 0.3, 0]}
        polar={[-Math.PI / 4, Math.PI / 4]}
        azimuth={[-Math.PI / 1.6, Math.PI / 1.6]}
        config={{ mass: 1.2, tension: 240, friction: 26 }}
      >
        <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.5}>
          <Medallion />
        </Float>
      </PresentationControls>
    </group>
  );
}

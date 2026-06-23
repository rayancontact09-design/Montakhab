"use client";

import { useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import StarCore from "./StarCore";
import CrowdField from "./CrowdField";
import { detectTier } from "@/lib/gpu";
import { useApp } from "@/lib/store";

function Rig() {
  const { camera } = useThree();
  useFrame((state) => {
    const progress = useApp.getState().progress;
    // Slow dolly-in across the whole scroll, with a parallax sway.
    const targetZ = 6.5 - progress * 2.2;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      state.pointer.x * 0.5,
      0.04
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      0.2 + state.pointer.y * 0.3,
      0.04
    );
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Experience() {
  const [tier, setTier] = useState<"high" | "low">("high");
  const loaded = useApp((s) => s.loaded);

  useEffect(() => {
    setTier(detectTier());
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0.2, 6.5], fov: 42 }}
        dpr={tier === "high" ? [1, 1.8] : [1, 1.2]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 1.2s ease" }}
      >
        <color attach="background" args={["#0A0A0B"]} />
        <fog attach="fog" args={["#0A0A0B", 8, 26]} />

        <ambientLight intensity={0.25} />
        <directionalLight position={[5, 6, 5]} intensity={1.4} color="#FF6B35" />
        <directionalLight position={[-6, -2, -4]} intensity={0.8} color="#C1272D" />
        <pointLight position={[0, 0, 4]} intensity={2} color="#E8DCC4" distance={12} />

        <StarCore />
        <CrowdField count={tier === "high" ? 2400 : 900} />

        <Rig />

        {tier === "high" && (
          <EffectComposer>
            <Bloom
              intensity={0.9}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.5}
              mipmapBlur
            />
            <Vignette eskil={false} offset={0.2} darkness={0.9} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}

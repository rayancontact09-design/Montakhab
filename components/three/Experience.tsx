"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Vignette,
  Noise,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import StarCore from "./StarCore";
import CrowdField from "./CrowdField";
import FlagCloth from "./FlagCloth";
import Crest from "./Crest";
import { detectTier } from "@/lib/gpu";
import { useApp } from "@/lib/store";
import { camTarget } from "@/lib/scene";

/**
 * Damps the camera toward whatever waypoint the active DOM section pushed,
 * layering in a subtle pointer parallax. Eased per-axis so transitions feel
 * like considered camera moves, not snaps.
 */
function Rig() {
  const { camera } = useThree();
  const look = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    const cam = camera as THREE.PerspectiveCamera;
    const px = state.pointer.x;
    const py = state.pointer.y;

    cam.position.x = THREE.MathUtils.damp(
      cam.position.x,
      camTarget.pos.x + px * 0.5,
      2.4,
      delta
    );
    cam.position.y = THREE.MathUtils.damp(
      cam.position.y,
      camTarget.pos.y + py * 0.35,
      2.4,
      delta
    );
    cam.position.z = THREE.MathUtils.damp(
      cam.position.z,
      camTarget.pos.z,
      2.0,
      delta
    );

    look.current.x = THREE.MathUtils.damp(look.current.x, camTarget.look.x, 2.4, delta);
    look.current.y = THREE.MathUtils.damp(look.current.y, camTarget.look.y, 2.4, delta);
    look.current.z = THREE.MathUtils.damp(look.current.z, camTarget.look.z, 2.4, delta);
    cam.lookAt(look.current);

    const targetFov = THREE.MathUtils.damp(cam.fov, camTarget.fov, 2.2, delta);
    if (Math.abs(targetFov - cam.fov) > 0.01) {
      cam.fov = targetFov;
      cam.updateProjectionMatrix();
    }
  });
  return null;
}

/** A warm studio rig built from Lightformers — no HDRI fetch, gorgeous metal. */
function StudioEnv() {
  return (
    <Environment resolution={256}>
      <Lightformer
        intensity={3}
        color="#FF6B35"
        position={[4, 3, 4]}
        scale={[6, 6, 1]}
      />
      <Lightformer
        intensity={2}
        color="#C1272D"
        position={[-5, -1, -3]}
        scale={[5, 5, 1]}
      />
      <Lightformer
        intensity={1.4}
        color="#E8DCC4"
        position={[0, 4, -6]}
        scale={[10, 4, 1]}
      />
      <Lightformer
        intensity={1}
        color="#006233"
        position={[-3, 2, 5]}
        scale={[3, 3, 1]}
      />
    </Environment>
  );
}

export default function Experience() {
  const [tier, setTier] = useState<"high" | "low">("high");
  const loaded = useApp((s) => s.loaded);
  const caOffset = useMemo(() => new THREE.Vector2(0.0006, 0.0009), []);

  useEffect(() => {
    setTier(detectTier());
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0.3, 6.8], fov: 42 }}
        dpr={tier === "high" ? [1, 1.8] : [1, 1.2]}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 1.4s ease" }}
      >
        <color attach="background" args={["#0A0A0B"]} />
        <fog attach="fog" args={["#0A0A0B", 9, 30]} />

        <StudioEnv />
        <ambientLight intensity={0.12} />
        <directionalLight position={[5, 6, 5]} intensity={1.1} color="#FF6B35" />
        <pointLight position={[0, 0, 4]} intensity={1.4} color="#E8DCC4" distance={14} />

        <StarCore />
        <FlagCloth tier={tier} />
        <Crest tier={tier} />
        <CrowdField count={tier === "high" ? 2600 : 900} />

        <Rig />

        {tier === "high" && (
          <EffectComposer multisampling={4}>
            <Bloom
              intensity={1.0}
              luminanceThreshold={0.18}
              luminanceSmoothing={0.5}
              mipmapBlur
            />
            <ChromaticAberration
              blendFunction={BlendFunction.NORMAL}
              offset={caOffset}
              radialModulation
              modulationOffset={0.4}
            />
            <Vignette eskil={false} offset={0.18} darkness={0.95} />
            <Noise premultiply blendFunction={BlendFunction.OVERLAY} opacity={0.035} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}

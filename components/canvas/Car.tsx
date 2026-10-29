"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useControls } from "leva";
import { CAR_SCALE, DRACO_DECODER_PATH, MODEL_PATH } from "@/lib/constants";
import { samplePose } from "@/lib/camera-poses";
import { scrollRef, useSceneStore } from "@/lib/store";

// Preload once at module scope — avoids any duplicate fetch/parse if Car
// were ever mounted more than once, and starts the download immediately
// rather than waiting for first render.
useGLTF.preload(MODEL_PATH, DRACO_DECODER_PATH);

const damp = THREE.MathUtils.damp;

export default function Car({ debug = false }: { debug?: boolean }) {
  const group = useRef<THREE.Group>(null);
  const setModelLoaded = useSceneStore((s) => s.setModelLoaded);

  const { scene } = useGLTF(MODEL_PATH, DRACO_DECODER_PATH);

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = false;
        mesh.frustumCulled = true;
      }
    });
    setModelLoaded(true);
  }, [scene, setModelLoaded]);

  // Offsets de depuración (solo se aplican con ?debug=1).
  const { scale, rotationOffset, heightOffset } = useControls("Coche (debug)", {
    scale: {
      value: CAR_SCALE,
      min: 2,
      max: 8,
      step: 0.05,
      label: "Escala (≈ long. en m)",
    },
    rotationOffset: {
      value: 0,
      min: -Math.PI,
      max: Math.PI,
      step: 0.01,
      label: "Offset rotación Y",
    },
    heightOffset: {
      value: 0,
      min: -0.5,
      max: 0.5,
      step: 0.005,
      label: "Offset altura",
    },
  });

  const dbg = useRef({ scale, rotationOffset, heightOffset });
  useEffect(() => {
    dbg.current = { scale, rotationOffset, heightOffset };
  }, [scale, rotationOffset, heightOffset]);

  useFrame((_, delta) => {
    if (!group.current) return;
    const d = dbg.current;
    const pose = samplePose(scrollRef.progress);
    const dt = Math.min(delta, 0.1);

    group.current.scale.setScalar(debug ? d.scale : CAR_SCALE);
    group.current.rotation.y = damp(
      group.current.rotation.y,
      pose.rotationY + (debug ? d.rotationOffset : 0),
      4,
      dt
    );
    group.current.position.y = damp(
      group.current.position.y,
      pose.positionY + (debug ? d.heightOffset : 0),
      4,
      dt
    );
  });

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
}

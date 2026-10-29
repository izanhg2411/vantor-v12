"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { samplePose } from "@/lib/camera-poses";
import { scrollRef } from "@/lib/store";

// ---------------------------------------------------------------------------
// CameraRig
// ---------------------------------------------------------------------------
// Única autoridad sobre la cámara. Cada frame:
//   1. lee el progreso continuo de scroll desde `scrollRef` (sin setState),
//   2. muestrea la pose interpolada de lib/camera-poses,
//   3. amortigua (damp) posición / target / fov hacia esa pose.
//
// Los sliders de Leva SOLO existen en modo debug y actúan como OFFSET sobre la
// pose calculada, de modo que se pueden anotar valores nuevos sin desconectar
// el sistema de scroll.
// ---------------------------------------------------------------------------

// Última pose aplicada — la lee el panel de debug para "Copiar pose".
export const livePose = {
  id: "hero",
  position: [0, 0, 0] as [number, number, number],
  target: [0, 0, 0] as [number, number, number],
  fov: 32,
};

const damp = THREE.MathUtils.damp;

export default function CameraRig({ debug = false }: { debug?: boolean }) {
  const { camera, size } = useThree();

  const { offX, offY, offZ, offFov } = useControls(
    "Cámara (offset debug)",
    {
      offX: { value: 0, min: -6, max: 6, step: 0.05, label: "offset X" },
      offY: { value: 0, min: -4, max: 4, step: 0.05, label: "offset Y" },
      offZ: { value: 0, min: -6, max: 6, step: 0.05, label: "offset Z" },
      offFov: { value: 0, min: -20, max: 20, step: 0.5, label: "offset FOV" },
    },
    { collapsed: true }
  );

  const offsets = useRef({ offX, offY, offZ, offFov });
  useEffect(() => {
    offsets.current = { offX, offY, offZ, offFov };
  }, [offX, offY, offZ, offFov]);

  const current = useRef({
    pos: new THREE.Vector3(4.2, 1.4, 5.4),
    target: new THREE.Vector3(0, 0.6, 0),
    fov: 32,
  });

  const isMobile = size.width < 768;

  const reduced = useRef(false);
  useEffect(() => {
    reduced.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useFrame((_, delta) => {
    const cam = camera as THREE.PerspectiveCamera;
    const pose = samplePose(scrollRef.progress, isMobile);
    const o = debug ? offsets.current : { offX: 0, offY: 0, offZ: 0, offFov: 0 };
    const c = current.current;

    // Con prefers-reduced-motion la cámara se coloca prácticamente al instante.
    const lambda = reduced.current ? 30 : 4;
    const dt = Math.min(delta, 0.1);

    c.pos.x = damp(c.pos.x, pose.position[0] + o.offX, lambda, dt);
    c.pos.y = damp(c.pos.y, pose.position[1] + o.offY, lambda, dt);
    c.pos.z = damp(c.pos.z, pose.position[2] + o.offZ, lambda, dt);

    c.target.x = damp(c.target.x, pose.target[0], lambda, dt);
    c.target.y = damp(c.target.y, pose.target[1], lambda, dt);
    c.target.z = damp(c.target.z, pose.target[2], lambda, dt);

    const nextFov = damp(c.fov, pose.fov + o.offFov, lambda, dt);
    if (Math.abs(nextFov - cam.fov) > 0.001) {
      c.fov = nextFov;
      cam.fov = nextFov;
      cam.updateProjectionMatrix();
    }

    cam.position.copy(c.pos);
    cam.lookAt(c.target);

    livePose.id = pose.id;
    livePose.position = [c.pos.x, c.pos.y, c.pos.z];
    livePose.target = [c.target.x, c.target.y, c.target.z];
    livePose.fov = c.fov;
  });

  return null;
}

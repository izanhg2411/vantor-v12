"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";

// ---------------------------------------------------------------------------
// Studio-style three point rig for a black hypercar:
//  - KEY:  the main modeling light, tight spot from front/above, defines
//          the primary highlight sweep along the roofline and shoulders.
//  - RIM:  strong backlight — this is what actually makes a black car
//          readable against a dark background, tracing its silhouette.
//  - FILL: very low intensity, cool tone, just lifts the shadow side so
//          it doesn't read as pure crushed black.
// Reflections/ambient occlusion-like softness come from StudioEnvironment
// (Lightformers), these three lights add the crisp, directional highlights
// a flat HDRI alone can't give.
// ---------------------------------------------------------------------------

type Vec3 = [number, number, number];

export default function Lights() {
  const key = useRef<THREE.SpotLight>(null);
  const rim = useRef<THREE.SpotLight>(null);
  const fill = useRef<THREE.DirectionalLight>(null);

  const controls = useControls("Luces (debug)", {
    keyIntensity: { value: 140, min: 0, max: 500, step: 1 },
    keyPos: { value: [4, 6, 3] as Vec3, label: "key pos" },
    rimIntensity: { value: 260, min: 0, max: 600, step: 1 },
    rimPos: { value: [-3, 4.5, -6] as Vec3, label: "rim pos" },
    fillIntensity: { value: 0.35, min: 0, max: 3, step: 0.01 },
    fillPos: { value: [-5, 3, 4] as Vec3, label: "fill pos" },
  });

  const debug = useRef(controls);
  useEffect(() => {
    debug.current = controls;
  }, [controls]);

  useFrame(() => {
    const d = debug.current;
    if (key.current) {
      key.current.intensity = d.keyIntensity;
      key.current.position.set(...(d.keyPos as Vec3));
    }
    if (rim.current) {
      rim.current.intensity = d.rimIntensity;
      rim.current.position.set(...(d.rimPos as Vec3));
    }
    if (fill.current) {
      fill.current.intensity = d.fillIntensity;
      fill.current.position.set(...(d.fillPos as Vec3));
    }
  });

  return (
    <>
      <spotLight
        ref={key}
        angle={0.35}
        penumbra={0.6}
        decay={2}
        distance={22}
        color="#ffffff"
        castShadow
        shadow-mapSize={[768, 768]}
        shadow-bias={-0.0002}
      />
      <spotLight
        ref={rim}
        angle={0.55}
        penumbra={0.8}
        decay={2}
        distance={26}
        color="#bcd4ff"
      />
      <directionalLight ref={fill} color="#8fa8ff" />
      {/* Keeps absolute blacks from ever being fully 0,0,0 */}
      <ambientLight intensity={0.015} />
    </>
  );
}

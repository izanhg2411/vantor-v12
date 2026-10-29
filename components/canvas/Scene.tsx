"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Leva } from "leva";
import CameraRig from "./CameraRig";
import Lights from "./Lights";
import StudioEnvironment from "./StudioEnvironment";
import Ground from "./Ground";
import Car from "./Car";
import Loader from "./Loader";
import DebugHelpers from "./DebugHelpers";
import { useDebug } from "@/lib/use-debug";

export default function Scene() {
  const debug = useDebug();

  return (
       <div className="pointer-events-none fixed inset-0 z-0 bg-black">
      <Leva hidden={!debug} collapsed titleBar={{ title: "VANTOR — Debug" }} />

      <Canvas
        shadows="basic"
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
          powerPreference: "high-performance",
        }}
        performance={{ min: 0.5 }}
        camera={{ position: [4.2, 1.4, 5.4], fov: 32, near: 0.1, far: 100 }}
      >
        <color attach="background" args={["#050505"]} />
        <fog attach="fog" args={["#050505", 9, 26]} />

        <CameraRig debug={debug} />
        <Lights />
        <Ground />
        {debug && <DebugHelpers />}

        <Suspense fallback={null}>
          <StudioEnvironment />
        </Suspense>

        <Suspense fallback={<Loader />}>
          <Car debug={debug} />
        </Suspense>
      </Canvas>
    </div>
  );
}

"use client";

import { ContactShadows, MeshReflectorMaterial } from "@react-three/drei";

// ---------------------------------------------------------------------------
// A large, near-black reflector plane + a soft baked-style contact shadow.
// Kept deliberately subtle (low mirror strength, heavy blur) — this should
// ground the car and add a faint premium-showroom reflection without
// competing with the car itself as the focal point.
//
// PERFORMANCE NOTE: MeshReflectorMaterial renders the scene a second time
// to a texture every frame — this is the single most expensive element in
// this scene. Flagged in the Phase 2 report as the first thing to gate
// behind a device-tier check before mobile ships.
// ---------------------------------------------------------------------------

export default function Ground() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]}>
        <planeGeometry args={[60, 60]} />
        <MeshReflectorMaterial
          blur={[300, 80]}
          resolution={512}
          mixBlur={1}
          mixStrength={35}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#020202"
          metalness={0.4}
          mirror={0}
        />
      </mesh>
      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.75}
        scale={12}
        blur={2.4}
        far={4}
        resolution={512}
        color="#000000"
        frames={1}
      />
    </group>
  );
}

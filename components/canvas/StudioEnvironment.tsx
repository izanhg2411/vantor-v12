"use client";

import { Environment, Lightformer } from "@react-three/drei";

// ---------------------------------------------------------------------------
// Procedural studio environment (soft rectangular "softboxes" + a ring
// light), the standard technique for the long, soft, continuous reflection
// streaks you see running along a show car's paint. This is entirely
// self-contained — no external .hdr file to fetch or host — and only
// affects lighting/reflections (background=false keeps the actual scene
// background pure black, controlled separately in Scene.tsx).
// ---------------------------------------------------------------------------

export default function StudioEnvironment() {
  return (
    <Environment resolution={256} background={false}>
      <Lightformer
        form="rect"
        intensity={3.5}
        position={[0, 6, -6]}
        scale={[14, 8, 1]}
        color="#ffffff"
      />
      <Lightformer
        form="rect"
        intensity={2}
        position={[-6, 2.5, 3]}
        rotation={[0, Math.PI / 2.5, 0]}
        scale={[6, 4, 1]}
        color="#dfe7ff"
      />
      <Lightformer
        form="rect"
        intensity={1.3}
        position={[6, 2, 4]}
        rotation={[0, -Math.PI / 2.5, 0]}
        scale={[6, 4, 1]}
        color="#ffe9d6"
      />
      <Lightformer
        form="ring"
        intensity={2}
        position={[0, 4, 6]}
        scale={6}
        color="#ffffff"
      />
    </Environment>
  );
}

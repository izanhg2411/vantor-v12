"use client";

import { useEffect, useState } from "react";
import { livePose } from "@/components/canvas/CameraRig";
import { scrollRef } from "@/lib/store";

// Panel de depuración (solo con ?debug=1). Muestra la pose viva de la cámara
// y permite copiarla ya formateada para pegarla en lib/camera-poses.ts.
export default function DebugPanel() {
  const [snapshot, setSnapshot] = useState({
    id: "hero",
    p: 0,
    pos: [0, 0, 0] as number[],
    target: [0, 0, 0] as number[],
    fov: 32,
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSnapshot({
        id: livePose.id,
        p: scrollRef.progress,
        pos: [...livePose.position],
        target: [...livePose.target],
        fov: livePose.fov,
      });
    }, 250);
    return () => window.clearInterval(id);
  }, []);

  const f = (n: number) => Number(n.toFixed(2));

  const poseText = `${snapshot.id}: {
  id: "${snapshot.id}",
  position: [${f(snapshot.pos[0])}, ${f(snapshot.pos[1])}, ${f(snapshot.pos[2])}],
  target: [${f(snapshot.target[0])}, ${f(snapshot.target[1])}, ${f(snapshot.target[2])}],
  fov: ${f(snapshot.fov)},
  rotationY: 0,
  positionY: 0,
},`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(poseText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 w-[280px] border border-white/10 bg-black/80 p-3 font-mono text-[10px] leading-relaxed text-neutral-300 backdrop-blur">
      <div className="mb-2 flex items-center justify-between">
        <span className="tracking-[0.2em] text-[var(--accent)] uppercase">
          Debug
        </span>
        <span className="text-neutral-500">
          scroll {(snapshot.p * 100).toFixed(1)}%
        </span>
      </div>
      <pre className="whitespace-pre-wrap break-words text-neutral-400">
        {poseText}
      </pre>
      <button
        type="button"
        onClick={copy}
        className="mt-2 w-full border border-white/15 px-2 py-1 text-[10px] tracking-[0.2em] uppercase transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
      >
        {copied ? "Copiado" : "Copiar pose"}
      </button>
    </div>
  );
}

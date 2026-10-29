"use client";

import { useEffect, useState } from "react";
import { brand } from "@/lib/content";
import { useSceneStore } from "@/lib/store";

// El overlay desaparece cuando el modelo está listo O cuando salta el timeout
// de seguridad: el contenido HTML nunca queda bloqueado por el GLB.
const SAFETY_TIMEOUT_MS = 6000;

export default function LoadingOverlay() {
  const isModelLoaded = useSceneStore((s) => s.isModelLoaded);
  const [timedOut, setTimedOut] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setTimedOut(true), SAFETY_TIMEOUT_MS);
    return () => window.clearTimeout(t);
  }, []);

  const done = isModelLoaded || timedOut;

  useEffect(() => {
    if (!done) return;
    const t = window.setTimeout(() => setRemoved(true), 900);
    return () => window.clearTimeout(t);
  }, [done]);

  if (removed) return null;

  return (
    <div
      aria-hidden={done}
      className={`pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-[#050505] transition-opacity duration-700 ${
        done ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex w-[220px] flex-col items-center gap-5">
        <span className="text-[11px] tracking-[0.5em] uppercase text-neutral-300">
          {brand.name}
        </span>
        <div className="relative h-px w-full overflow-hidden bg-white/10">
          <div
            className="h-full bg-[var(--accent)] transition-[width] duration-700 ease-out"
            style={{ width: done ? "100%" : "62%" }}
          />
        </div>
        <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-600">
          {done ? "Listo" : "Cargando"}
        </span>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useSceneStore } from "@/lib/store";

// El modo debug se activa EXCLUSIVAMENTE con ?debug=1.
// Se lee desde window dentro de un efecto (no useSearchParams) para no forzar
// el árbol a renderizado dinámico ni requerir un <Suspense> extra.
export function useDebug(): boolean {
  const debug = useSceneStore((s) => s.debug);
  const setDebug = useSceneStore((s) => s.setDebug);
  const [local, setLocal] = useState(false);

  useEffect(() => {
    const on = new URLSearchParams(window.location.search).get("debug") === "1";
    setLocal(on);
    setDebug(on);
  }, [setDebug]);

  return debug || local;
}

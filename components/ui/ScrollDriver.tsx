"use client";

import { useEffect } from "react";
import { sectionAt } from "@/lib/camera-poses";
import { scrollRef, useSceneStore } from "@/lib/store";

// ---------------------------------------------------------------------------
// ScrollDriver
// ---------------------------------------------------------------------------
// Convierte el scroll nativo en un progreso 0 → 1.
//  - Canal continuo  -> `scrollRef.progress` (mutación directa, sin renders).
//  - Canal discreto  -> Zustand, solo cuando cambia la sección activa o el
//    progreso se mueve más de un 2%. Nunca hay setState por píxel ni por frame.
// ---------------------------------------------------------------------------

export default function ScrollDriver() {
  useEffect(() => {
    let raf = 0;
    let lastPublished = -1;
    let lastSection = "";

    const read = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;

      scrollRef.progress = p;

      const store = useSceneStore.getState();
      if (Math.abs(p - lastPublished) > 0.02) {
        lastPublished = p;
        store.setScrollProgress(p);
      }
      const section = sectionAt(p);
      if (section !== lastSection) {
        lastSection = section;
        store.setActiveSection(section);
      }
    };

    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}

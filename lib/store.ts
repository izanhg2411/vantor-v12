import { create } from "zustand";
import type { PoseId } from "@/lib/camera-poses";

// ---------------------------------------------------------------------------
// Estado de escena
// ---------------------------------------------------------------------------
// DOS CANALES DELIBERADAMENTE SEPARADOS:
//
// 1. `scrollRef` (abajo) — objeto mutable a nivel de módulo. Es el progreso
//    CONTINUO del scroll (0 → 1). Se escribe en cada evento de scroll / rAF y
//    se lee dentro de useFrame. NO provoca renders de React: es el canal de
//    alta frecuencia que alimenta la cámara.
//
// 2. Zustand (`scrollProgress`, `activeSection`) — canal de BAJA frecuencia,
//    solo para UI (navbar activo, etc.). `setScrollProgress` se llama de forma
//    espaciada (cambios de ~2%), nunca en cada píxel ni en cada frame.
// ---------------------------------------------------------------------------

export const scrollRef = { progress: 0 };

interface SceneState {
  scrollProgress: number;
  setScrollProgress: (value: number) => void;

  activeSection: PoseId;
  setActiveSection: (id: PoseId) => void;

  isModelLoaded: boolean;
  setModelLoaded: (loaded: boolean) => void;

  debug: boolean;
  setDebug: (v: boolean) => void;
}

export const useSceneStore = create<SceneState>((set) => ({
  scrollProgress: 0,
  setScrollProgress: (value) => set({ scrollProgress: value }),

  activeSection: "hero",
  setActiveSection: (id) => set({ activeSection: id }),

  isModelLoaded: false,
  setModelLoaded: (loaded) => set({ isModelLoaded: loaded }),

  debug: false,
  setDebug: (v) => set({ debug: v }),
}));

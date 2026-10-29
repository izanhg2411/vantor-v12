"use client";

import { useControls } from "leva";

// ===========================================================================
// ⚠️  TEMPORAL — SOLO PARA DEPURAR LA FASE 2. BORRAR ANTES DE LA FASE 3.
// ===========================================================================
// Sirve para distinguir a simple vista qué está fallando:
//
//  - No se ve NADA (ni rejilla ni ejes ni cubo)      -> A) WebGL/CSS: el canvas
//                                                         no se está pintando.
//  - Se ve la rejilla/ejes pero NO el coche          -> B/C) el GLB está fuera
//                                                         de cámara o mal escalado.
//  - Se ve el CUBO MAGENTA pero el coche está negro  -> D) problema de
//                                                         iluminación/material
//                                                         (el cubo usa material
//                                                         básico, no necesita luz).
//  - Se ve todo, incluido el coche                   -> arreglado ✅
//
// El cubo magenta mide exactamente 1 m, así que también sirve de regla para
// comprobar de un vistazo que la escala del coche (~4,6 m de largo) es creíble.
// ===========================================================================

export default function DebugHelpers() {
  const { showHelpers } = useControls("⚠️ Debug temporal", {
    showHelpers: { value: true, label: "Mostrar rejilla/ejes/cubo" },
  });

  if (!showHelpers) return null;

  return (
    <group>
      {/* Rejilla de 1 m por celda: referencia de escala en el suelo */}
      <gridHelper args={[20, 20, "#444444", "#1e1e1e"]} position={[0, 0.002, 0]} />

      {/* Ejes: X rojo, Y verde, Z azul (el coche mide 4,6 m a lo largo de Z) */}
      <axesHelper args={[3]} />

      {/* Cubo de 1 m con material BÁSICO (no depende de las luces) */}
      <mesh position={[3, 0.5, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#ff00ff" wireframe />
      </mesh>
    </group>
  );
}

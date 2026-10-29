# VANTOR V12 — Fase 2: Escena 3D base

## Cómo ejecutar

```bash
npm install
npm run dev
```

Abre http://localhost:3000

El panel "VANTOR — Debug" (Leva, esquina superior derecha) permite ajustar
en vivo: cámara (posición/target/FOV + override manual), escala/rotación
del coche, e intensidad/posición de las 3 luces.

- Con el ratón: orbit/zoom/pan libre (OrbitControls) para inspeccionar el modelo.
- Activando "Override manual" en el panel de Cámara: control numérico preciso,
  útil para anotar los valores exactos de un keyframe cinematográfico antes
  de la Fase 3.

## Estructura relevante

- `app/page.tsx` — monta la escena persistente + overlay mínimo de validación.
- `components/canvas/Scene.tsx` — Canvas persistente (fijo, fondo negro, tone mapping ACES).
- `components/canvas/Car.tsx` — carga VANTOR_V12_WEB_V1.glb, aplica escala real (~4.6 m).
- `components/canvas/CameraRig.tsx` — cámara 3/4 cinematográfica + OrbitControls temporal.
- `components/canvas/Lights.tsx` — rig de 3 puntos (key/rim/fill).
- `components/canvas/StudioEnvironment.tsx` — Lightformers procedurales (reflejos, sin HDRI externo).
- `components/canvas/Ground.tsx` — suelo reflectante sutil + contact shadow.
- `components/canvas/Loader.tsx` — loader con useProgress.
- `lib/constants.ts` / `lib/store.ts` — configuración y store (scrollProgress ya preparado para Fase 3).

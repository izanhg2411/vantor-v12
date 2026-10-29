# VANTOR V12 — Fase 3 · CAMBIOS

## 1. Archivos nuevos

- `lib/content.ts` — todo el contenido textual y las cifras.
- `lib/camera-poses.ts` — 6 poses (desktop + variantes móvil), `samplePose()`, `sectionAt()`.
- `lib/use-debug.ts` — hook `useDebug()` (lee `?debug=1` desde `window` en un efecto).
- `components/ui/Navbar.tsx`
- `components/ui/Reveal.tsx`
- `components/ui/CountUp.tsx`
- `components/ui/LoadingOverlay.tsx`
- `components/ui/ScrollDriver.tsx` — traduce el scroll nativo a progreso 0→1.
- `components/ui/DebugPanel.tsx` — pose viva + botón "Copiar pose".
- `components/ui/DebugGate.tsx` — monta DebugPanel solo con `?debug=1`.
- `components/sections/Hero.tsx`, `Design.tsx`, `Performance.tsx`, `Specs.tsx`, `Details.tsx`, `Cta.tsx`, `Footer.tsx`
- `CAMBIOS.md`

## 2. Archivos modificados

- `app/page.tsx` — solo composición (Scene + ScrollDriver + Navbar + secciones + Footer).
- `app/layout.tsx` — SEO: title, description, keywords, Open Graph y Twitter. Se quita `h-full` del body para permitir scroll.
- `app/globals.css` — se elimina `overflow: hidden`, se añaden variables de acento, clases `.section`, `.veil*`, `.reveal`, `.eyebrow`, `.rule`, indicador de scroll y bloque `prefers-reduced-motion`.
- `lib/store.ts` — añade `scrollRef` (canal continuo, sin renders), `activeSection`, `debug`.
- `components/canvas/Scene.tsx` — `Leva hidden={!debug}`, `DebugHelpers` condicional, wrapper `pointer-events-none`. **Los dos `<Suspense>` siguen separados** (StudioEnvironment con `fallback={null}`, Car con `fallback={<Loader/>}`).
- `components/canvas/CameraRig.tsx` — reescrito: interpola poses según scroll con `MathUtils.damp`; OrbitControls eliminado; Leva pasa a ser offset de depuración. Exporta `livePose`.
- `components/canvas/Car.tsx` — rotación/altura ahora vienen de la pose de scroll (damp); Leva actúa como offset solo en debug. Se mantiene `useGLTF.preload`, el GLB y Draco. No había ningún `console.log("GLB size")` en el archivo recibido.

## 3. Decisiones importantes

- **Dos canales de scroll**: `scrollRef.progress` (mutación directa, leído en `useFrame`) para la cámara; Zustand solo para UI (`activeSection`, `scrollProgress` publicado cada ~2%). Cero `setState` por frame o por píxel.
- **Poses**: el progreso global se reparte uniformemente entre las 6 poses, con smoothstep entre ellas y `damp` encima. La pose `hero` conserva `[4.2, 1.4, 5.4]`, fov 32, target `[0, 0.6, 0]`.
- **Móvil**: `MOBILE_POSES` (cámara más alejada, FOV mayor, target más alto) se activa con `size.width < 768`; los velos pasan de gradiente lateral a vertical.
- **Legibilidad sin tapar el coche**: gradientes (`.veil*`) en lugar de tarjetas opacas. Un único color de acento (`--accent: #ff4d2e`).
- **Cero dependencias nuevas**: solo CSS, IntersectionObserver y `useFrame`. `package.json` sin tocar.
- **Debug**: `?debug=1` muestra Leva + DebugHelpers + panel de pose con "Copiar pose"; sin el parámetro, todo oculto.

## 4. TODO-CONTENIDO

Todas las cifras y textos de `lib/content.ts` son **provisionales/conceptuales**, marcados con `// TODO-CONTENIDO`:

- eslogan del hero;
- textos y cifras aerodinámicas de Diseño;
- las 4 cifras de Prestaciones (812 CV / 2,8 s / 348 km/h / 720 Nm) y su nota;
- la ficha técnica completa de Especificaciones (incluidos precio y unidades);
- las 6 descripciones de Detalles;
- datos de contacto del footer;
- el envío del formulario es **simulado** (no hay endpoint).

## 5. Comprobación de TypeScript

`npx tsc --noEmit` se ejecutó sin instalar nada. **No concluyente**: `node_modules` no está disponible en el entorno, así que todos los errores devueltos son de resolución de módulos (`TS2307`, `TS2875`, `TS7026`, `LayoutProps`, y `key` no reconocido por falta de `@types/react`). Filtrando esa clase de errores no queda ningún error propio del código. Conviene ejecutar `npm run build` en local para confirmar.

// ---------------------------------------------------------------------------
// VANTOR V12 — Poses de cámara por sección
// ---------------------------------------------------------------------------
// El scroll global (0 → 1) se reparte de forma uniforme entre las poses de
// POSE_ORDER. CameraRig interpola linealmente entre pose[i] y pose[i+1] y
// después amortigua (damp) el resultado, así que estos valores no necesitan
// ser perfectos: son puntos de anclaje fáciles de retocar.
//
// rotationY / positionY describen el COCHE (no la cámara): permiten girar el
// modelo mientras la cámara se desplaza, algo mucho más barato que orbitar.
// ---------------------------------------------------------------------------

export type Vec3 = [number, number, number];

export interface CameraPose {
  id: string;
  position: Vec3;
  target: Vec3;
  fov: number;
  rotationY: number;
  positionY: number;
}

export const POSE_ORDER = [
  "hero",
  "design",
  "performance",
  "specs",
  "details",
  "cta",
] as const;

export type PoseId = (typeof POSE_ORDER)[number];

export const DESKTOP_POSES: Record<PoseId, CameraPose> = {
  hero: {
    id: "hero",
    position: [4.2, 1.4, 5.4],
    target: [0, 0.6, 0],
    fov: 32,
    rotationY: 0.4,
    positionY: 0,
  },
  design: {
    id: "design",
    position: [-5.2, 1.15, 3.9],
    target: [0, 0.65, 0],
    fov: 34,
    rotationY: 1.15,
    positionY: 0,
  },
  performance: {
    id: "performance",
    position: [0.6, 0.85, 7.0],
    target: [0, 0.5, 0],
    fov: 26,
    rotationY: 2.35,
    positionY: 0,
  },
  specs: {
    id: "specs",
    position: [5.4, 2.8, -3.4],
    target: [0, 0.7, 0],
    fov: 36,
    rotationY: 3.3,
    positionY: 0.02,
  },
  details: {
    id: "details",
    position: [2.3, 0.72, 2.9],
    target: [0.15, 0.55, 0.15],
    fov: 24,
    rotationY: 4.6,
    positionY: 0,
  },
  cta: {
    id: "cta",
    position: [0, 1.7, 7.8],
    target: [0, 0.7, 0],
    fov: 30,
    rotationY: 6.1,
    positionY: 0,
  },
};

// Variantes móvil: la cámara se aleja y abre ángulo para que el coche siga
// entrando en un viewport vertical estrecho, y se eleva ligeramente para
// dejar el tercio inferior libre al texto.
export const MOBILE_POSES: Record<PoseId, CameraPose> = {
  hero: { ...DESKTOP_POSES.hero, position: [5.0, 1.7, 6.9], fov: 40, target: [0, 0.75, 0] },
  design: { ...DESKTOP_POSES.design, position: [-6.0, 1.6, 5.2], fov: 42, target: [0, 0.8, 0] },
  performance: { ...DESKTOP_POSES.performance, position: [0.6, 1.3, 8.6], fov: 34, target: [0, 0.7, 0] },
  specs: { ...DESKTOP_POSES.specs, position: [6.2, 3.2, -4.4], fov: 44, target: [0, 0.8, 0] },
  details: { ...DESKTOP_POSES.details, position: [2.9, 1.0, 3.7], fov: 32, target: [0.15, 0.65, 0.15] },
  cta: { ...DESKTOP_POSES.cta, position: [0, 2.0, 9.2], fov: 38, target: [0, 0.85, 0] },
};

export function getPoses(isMobile: boolean): Record<PoseId, CameraPose> {
  return isMobile ? MOBILE_POSES : DESKTOP_POSES;
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const lerp3 = (a: Vec3, b: Vec3, t: number): Vec3 => [
  lerp(a[0], b[0], t),
  lerp(a[1], b[1], t),
  lerp(a[2], b[2], t),
];

/**
 * Muestrea la pose correspondiente a un progreso global 0 → 1.
 * Devuelve siempre un objeto nuevo (barato: 3 arrays pequeños).
 */
export function samplePose(progress: number, isMobile = false): CameraPose {
  const poses = getPoses(isMobile);
  const n = POSE_ORDER.length;
  const p = Math.min(Math.max(progress, 0), 1);
  const scaled = p * (n - 1);
  const i = Math.min(Math.floor(scaled), n - 2);
  const t = scaled - i;
  // Suavizado tipo smoothstep para que las transiciones no sean lineales secas.
  const e = t * t * (3 - 2 * t);

  const a = poses[POSE_ORDER[i]];
  const b = poses[POSE_ORDER[i + 1]];

  return {
    id: e < 0.5 ? a.id : b.id,
    position: lerp3(a.position, b.position, e),
    target: lerp3(a.target, b.target, e),
    fov: lerp(a.fov, b.fov, e),
    rotationY: lerp(a.rotationY, b.rotationY, e),
    positionY: lerp(a.positionY, b.positionY, e),
  };
}

/** Sección activa (id) para un progreso dado. */
export function sectionAt(progress: number): PoseId {
  const n = POSE_ORDER.length;
  const idx = Math.round(Math.min(Math.max(progress, 0), 1) * (n - 1));
  return POSE_ORDER[idx];
}

// ---------------------------------------------------------------------------
// VANTOR V12 — Scene constants
// ---------------------------------------------------------------------------

// Asset paths (served from /public, self-hosted — no external CDN dependency)
export const MODEL_PATH = "/models/VANTOR_V12_WEB_V1.glb";
export const DRACO_DECODER_PATH = "/draco/";

// The GLB was exported normalized to a unit bounding box: its Z axis
// (the car's length) measures exactly 1.0 unit. We scale the whole group
// uniformly so the car reads as an approximate real-world VANTOR V12
// length of 4.6 m. If a future re-export changes the raw bbox, only
// CAR_MODEL_RAW_LENGTH_M needs to change here.
export const CAR_REAL_LENGTH_M = 4.6;
export const CAR_MODEL_RAW_LENGTH = 1.0;
export const CAR_SCALE = CAR_REAL_LENGTH_M / CAR_MODEL_RAW_LENGTH;

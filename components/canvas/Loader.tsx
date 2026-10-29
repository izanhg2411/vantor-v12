"use client";

import { Html, useProgress } from "@react-three/drei";

export default function Loader() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="flex w-[220px] flex-col items-center gap-4 font-sans">
        <span className="text-[11px] tracking-[0.4em] text-neutral-300 uppercase">
          VANTOR
        </span>
        <div className="relative h-px w-full bg-white/15">
          <div
            className="absolute left-0 top-0 h-full bg-white transition-[width] duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-[11px] tabular-nums text-neutral-500">
          {Math.round(progress)}%
        </span>
      </div>
    </Html>
  );
}

"use client";

import DebugPanel from "./DebugPanel";
import { useDebug } from "@/lib/use-debug";

export default function DebugGate() {
  const debug = useDebug();
  if (!debug) return null;
  return <DebugPanel />;
}

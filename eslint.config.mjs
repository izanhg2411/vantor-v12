import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Vendored, self-hosted Draco decoder (shipped inside the `three`
    // package, copied as-is into /public) -- not our source code.
    "public/draco/**",
  ]),
  {
    // react-three-fiber's whole rendering model relies on mutating three.js
    // objects (camera, mesh transforms, material props) imperatively inside
    // useFrame, across many frames -- that's the documented, correct way to
    // animate in R3F without triggering React re-renders 60x/sec. The React
    // Compiler rule can't reason about that pattern and flags it as
    // "modifying a value after render completes". Scoped to components/canvas
    // only, where this pattern is intentional and reviewed.
    files: ["components/canvas/**/*.tsx"],
    rules: {
      "react-compiler/react-compiler": "off",
      "react-hooks/immutability": "off",
    },
  },
]);

export default eslintConfig;

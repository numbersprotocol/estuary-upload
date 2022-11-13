import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json";
import json from "@rollup/plugin-json";

export default [
  // browser-friendly UMD build
  {
    input: "src/index.ts",
    output: {
      name: "estuary-upload",
      file: pkg.browser,
      format: "umd",
      sourcemap: false,
    },
    plugins: [
      json(),
      resolve(), //
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  {
    input: "src/index.ts",
    output: [
      { file: pkg.main, format: "cjs", sourcemap: true},
      { file: pkg.module, format: "es", sourcemap: true},
    ],
    plugins: [typescript({ tsconfig: "./tsconfig.json" })],
  },
  // CommonJS (for Node)
  {
    input: "src/cli.ts",
    output: [
      {
        file: pkg.bin["estuary-upload"], format: "cjs", sourcemap: true,
        banner: '#!/usr/bin/env node',
      },
    ],
    plugins: [typescript({ tsconfig: "./tsconfig.json" })],
  },
];

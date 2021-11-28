import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/cli.ts",
  output: {
    file: "dist/index.js",
    format: "cjs",
  },
  plugins: [nodeResolve(), commonjs(), typescript()],
};

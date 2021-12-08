import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import copy from "rollup-plugin-copy";
import json from "@rollup/plugin-json";
import image from "@rollup/plugin-image";

const packageJson = require("./package.json");

export default {
  cache: false,
  inlineDynamicImports: true,
  input: "src/index.ts",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true,
    }
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
    postcss(),
    image(),
    json({ compact: true }),
    copy({
      targets: [
        {
          src: "src/variables.scss",
          dest: "build",
          rename: "variables.scss",
        },
        {
          src: "src/typography.scss",
          dest: "build",
          rename: "typography.scss",
        },
      ],
    }),
  ],
};

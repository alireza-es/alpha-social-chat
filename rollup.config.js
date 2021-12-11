import babel from "@rollup/plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import image from "@rollup/plugin-image";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import external from "rollup-plugin-peer-deps-external";
import url from "rollup-plugin-url";
import copy from "rollup-plugin-copy";
import globals from "rollup-plugin-node-globals";
import visualizer from "rollup-plugin-visualizer";
import replace from "@rollup/plugin-replace";
import builtins from "@stream-io/rollup-plugin-node-builtins";
import { terser } from "rollup-plugin-terser";
import { prepend } from "rollup-plugin-insert";
import PropTypes from "prop-types";
import process from "process";
import pkg from "./package.json";
import postcss from "rollup-plugin-postcss";

process.env.NODE_ENV = "production";

const baseConfig = {
  cache: false,
  input: "src/index.ts",
  watch: {
    chokidar: false,
  },
};

const externalDependencies = [
  /@babel/,
  "@braintree/sanitize-url",
  "@fortawesome/free-regular-svg-icons",
  "@fortawesome/react-fontawesome",
  "@sindresorhus/transliterate",
  "custom-event",
  /dayjs/,
  /emoji-mart/,
  "emoji-regex",
  "i18next",
  "isomorphic-ws",
  "linkifyjs",
  "lodash.debounce",
  "lodash.isequal",
  "lodash.throttle",
  "lodash.uniqby",
  "mdast-util-find-and-replace",
  "mml-react",
  "pretty-bytes",
  "prop-types",
  "react-fast-compare",
  /react-file-utils/,
  "react-images",
  "react-is",
  /react-markdown/,
  "react-player",
  "react-textarea-autosize",
  "react-virtuoso",
  "textarea-caret",
  /uuid/,
];

const basePlugins = [
  replace({
    preventAssignment: true,
    "process.env.NODE_ENV": JSON.stringify("production"),
  }),
  // Remove peer-dependencies from final bundle
  external(),
  image(),
  typescript(),
  babel({
    babelHelpers: "runtime",
    exclude: "node_modules/**",
  }),
  commonjs({
    namedExports: {
      "node_modules/linkifyjs/index.js": ["find"],
      "node_modules/react-is/index.js": ["isValidElementType"],
      "prop-types": Object.keys(PropTypes),
    },
  }),
  // import files as data-uris or es modules
  url(),
  copy({
    targets: [
      { dest: "dist/assets", src: "src/assets/*" },
      {
        dest: "dist/assets",
        src: "./node_modules/stream-chat-react/dist/assets/*",
      },
      {
        dest: "dist/css",
        src: "./node_modules/stream-chat-css/dist/css/index.css",
      },
      { dest: "dist/scss", src: "./node_modules/stream-chat-css/dist/scss/*" },
    ],
    verbose: process.env.VERBOSE,
    watch: process.env.ROLLUP_WATCH,
  }),
  // Json to ES modules conversion
  json({ compact: true }),
  postcss(),
  process.env.BUNDLE_SIZE ? visualizer() : null,
];

const normalBundle = {
  ...baseConfig,
  external: externalDependencies,
  output: [
    {
      dir: "dist",
      format: "esm",
      preserveModules: true,
      preserveModulesRoot: "src",
      sourcemap: true,
    },
  ],
  plugins: [...basePlugins],
};

export default () =>
    [normalBundle];

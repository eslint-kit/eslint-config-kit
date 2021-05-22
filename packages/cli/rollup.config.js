const typescript = require('@rollup/plugin-typescript')
const json = require('@rollup/plugin-json')
const commonjs = require('@rollup/plugin-commonjs')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const { terser: terserPlugin } = require('rollup-plugin-terser')

module.exports = {
  input: './src/eslint-kit.ts',
  output: {
    file: './build/run.js',
    format: 'cjs',
  },
  plugins: [
    typescript(),
    json(),
    commonjs({
      include: [/node_modules/],
    }),
    terserPlugin({
      ecma: 2015,
    }),
  ],
  external: [
    'commander',
    'chalk',
    'path',
    'yamljs',
    'ora',
    'inquirer',
    'semver',
    'fs',
    'glob-promise',
    'deepmerge',
    'child_process',
  ],
}

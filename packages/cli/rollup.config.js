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
    commonjs(),
    nodeResolve({
      preferBuiltins: true
    }),
    terserPlugin({
      ecma: 2015,
    }),
  ],
}

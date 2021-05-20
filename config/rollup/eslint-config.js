const typescript = require('@rollup/plugin-typescript')
const commonjs = require('@rollup/plugin-commonjs')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const { terser } = require('rollup-plugin-terser')

module.exports = {
  input: './src/index.ts',
  output: {
    file: './build/index.js',
    format: 'cjs',
    exports: 'default'
  },
  plugins: [
    typescript({
      include: ['../../shared/**/*.ts']
    }),
    commonjs(),
    nodeResolve(),
    terser({ ecma: 2015 }),
  ],
}

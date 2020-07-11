const babelPlugin = require('rollup-plugin-babel')
const { terser: terserPlugin } = require('rollup-plugin-terser')

module.exports = {
  input: 'src/index.js',
  output: {
    file: 'build/index.js',
    format: 'cjs',
  },
  plugins: [
    babelPlugin({
      presets: ['@babel/preset-env'],
    }),
    terserPlugin({
      ecma: 2015,
    }),
  ],
}

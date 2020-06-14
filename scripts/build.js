const { rollup } = require('rollup')
const babelPlugin = require('rollup-plugin-babel')
const { terser: terserPlugin } = require('rollup-plugin-terser')
const path = require('path')
const util = require('util')
const glob = util.promisify(require('glob'))
const fs = require('fs')
const copyFile = util.promisify(fs.copyFile)

const packagesDir = path.join(process.cwd(), 'packages')
const buildsDir = path.join(process.cwd(), 'npm')

const Builders = {
  async config({ name, packageDir }) {
    const build = await rollup({
      input: path.join(packageDir, 'index.js'),
      plugins: [
        babelPlugin({
          presets: ['@babel/preset-env'],
        }),
        terserPlugin({
          ecma: 2015,
        }),
      ],
    })

    await build.write({
      file: path.join(buildsDir, name, 'index.js'),
      format: 'cjs',
      name,
    })

    const copyFiles = async files => {
      return Promise.all(
        files.map(file => {
          return copyFile(
            path.join(packageDir, file),
            path.join(buildsDir, name, file),
          )
        }),
      )
    }

    await copyFiles(['package.json'])

    console.log(`Successfully built ${name}`)
  },
}

async function build() {
  const buildConfigsPaths = await glob(`${packagesDir}/**/build.config.json`)

  for (const buildConfigPath of buildConfigsPaths) {
    const buildConfig = require(buildConfigPath)
    const { buildAs } = buildConfig

    const packageDir = buildConfigPath.replace('/build.config.json', '')
    const packageJson = require(`${packageDir}/package.json`)

    const { name } = packageJson

    if (buildAs === 'config') {
      await Builders.config({ name, packageDir })
    }
  }
}

build()

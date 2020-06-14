const path = require('path')
const util = require('util')
const execa = require('execa')
const glob = util.promisify(require('glob'))

const packagesDir = path.join(process.cwd(), 'packages')
const npmDir = path.join(process.cwd(), 'npm')

function parseVersion(versionStr) {
  const [major, minor, patch] = versionStr.split('.').map(Number)
  return { major, minor, patch }
}

function isVersionNewer(localVersionStr, publishedVersionStr) {
  const local = parseVersion(localVersionStr)
  const published = parseVersion(publishedVersionStr)

  if (local.major > published.major) return true
  if (local.major < published.major) return false

  if (local.minor > published.minor) return true
  if (local.minor < published.minor) return false

  if (local.patch > published.patch) return true

  return false
}

async function checkVersion(packageName, localVersion) {
  const { stdout: publishedVersion, stderr, failed } = await execa(
    'npm',
    ['view', packageName, 'version'],
    {
      cwd: process.cwd(),
      env: process.env,
    },
  ).catch(result => result)

  if (failed && !stderr.includes('E404')) {
    return { canPublish: false }
  }

  return {
    canPublish: isVersionNewer(localVersion, publishedVersion),
  }
}

async function publishPackage(name) {
  const { failed } = await execa('npm', ['publish'], {
    cwd: path.join(npmDir, name),
    env: process.env,
  }).catch(result => result)

  if (failed) {
    return { hasPublished: false }
  }

  return { hasPublished: true }
}

async function publish() {
  const packageJsonsPaths = await glob(`${packagesDir}/**/package.json`)
  const packageJsons = packageJsonsPaths.map(require)

  for (const packageJson of packageJsons) {
    const { name, version } = packageJson

    const { canPublish } = await checkVersion(name, version)

    if (!canPublish) {
      continue
    }

    console.log(`Publishing ${name}@${version}`)

    const { hasPublished } = await publishPackage(name)

    const resultMessage = hasPublished
      ? `Successfully published.`
      : 'Publication failed!'

    console.log(resultMessage)
  }
}

publish()

import {
  eq,
  minVersion,
  satisfies,
  subset,
  valid,
  validRange,
  major,
} from 'semver'

function toVersion(versionOrRange: string): string {
  if (valid(versionOrRange)) {
    return versionOrRange
  }

  if (validRange(versionOrRange)) {
    const versionObject = minVersion(versionOrRange)
    if (!versionObject) throw new Error('Invalid version')
    return versionObject.version
  }

  throw new Error('Invalid version')
}

function compare(
  versionOrRange: string,
  target: string,
  sign: '<' | '>'
): boolean {
  if (valid(versionOrRange)) {
    return satisfies(versionOrRange, sign + target)
  }

  if (validRange(versionOrRange)) {
    const matches = satisfies(target, versionOrRange)
    return subset(versionOrRange, sign + target) || (sign === '>' && matches)
  }

  throw new Error('Invalid version')
}

export function getMajor(versionOrRange: string): number {
  const version = toVersion(versionOrRange)
  return major(version)
}

export function lower(versionOrRange: string, target: string): boolean {
  return compare(versionOrRange, target, '<')
}

export function mayBeGreater(versionOrRange: string, target: string): boolean {
  return compare(versionOrRange, target, '>')
}

export function greater(versionOrRange: string, target: string): boolean {
  const version = toVersion(versionOrRange)
  return satisfies(version, '>' + target)
}

export function greaterOrEquals(
  versionOrRange: string,
  target: string
): boolean {
  const version = toVersion(versionOrRange)
  return satisfies(version, '>=' + target)
}

export function equals(version: string, target: string): boolean {
  if (!valid(version)) {
    return false
  }

  return eq(version, target)
}

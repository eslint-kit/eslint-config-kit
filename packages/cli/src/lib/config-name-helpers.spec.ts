import {
  isFromConfigKit,
  toConfigName,
  toConfigPackage,
} from './config-name-helpers'
import { CONFIG_PREFIX } from './constants'

describe('config name helpers', () => {
  test('isFromConfigKit', () => {
    expect(isFromConfigKit(CONFIG_PREFIX + 'base')).toBe(true)
    expect(isFromConfigKit('gidubgdifygb')).toBe(false)
  })

  test('toConfigName', () => {
    expect(toConfigName(CONFIG_PREFIX + 'base')).toBe('base')
    expect(toConfigName(CONFIG_PREFIX + 'react')).toBe('react')
  })

  test('toConfigPackage', () => {
    expect(toConfigPackage('base')).toBe('@eslint-kit/eslint-config-base')
  })
})

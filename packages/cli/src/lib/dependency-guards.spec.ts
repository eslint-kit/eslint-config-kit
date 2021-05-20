import {
  isDependencyLimited,
  isDependencyMeaningful,
} from './dependency-guards'

describe('dependency guards', () => {
  test('isDependencyMeaningful', () => {
    expect(isDependencyMeaningful('react')).toBeFalsy()
    expect(isDependencyMeaningful('eslint')).toBeTruthy()
  })

  test('isDependencyLimited', () => {
    expect(isDependencyLimited('eslint')).toBeTruthy()
    expect(isDependencyLimited('@eslint-kit/eslint-config-base')).toBeFalsy()
  })
})

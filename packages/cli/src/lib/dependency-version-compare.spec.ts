import {
  equals,
  mayBeGreater,
  greater,
  greaterOrEquals,
  lower,
  getMajor,
} from './dependency-version-compare'

describe('dependency version compare', () => {
  test('getMajor', () => {
    expect(getMajor('17.0.3')).toBe(17)
    expect(getMajor('^16.0.3')).toBe(16)
    expect(getMajor('0.2.3')).toBe(0)
  })

  test('lower', () => {
    expect(lower('1.1.1', '2.2.2')).toBeTruthy()
    expect(lower('2.1.1', '2.2.2')).toBeTruthy()
    expect(lower('2.2.1', '2.2.2')).toBeTruthy()
    expect(lower('2.2.2', '2.2.2')).toBeFalsy()
    expect(lower('2.2.3', '2.2.2')).toBeFalsy()
    expect(lower('2.3.3', '2.2.2')).toBeFalsy()
    expect(lower('3.3.3', '2.2.2')).toBeFalsy()

    expect(lower('^1.1.1', '2.2.2')).toBeTruthy()
    expect(lower('^2.2.2', '2.2.2')).toBeFalsy()
    expect(lower('^3.3.3', '2.2.2')).toBeFalsy()
    expect(lower('^4.4.6', '4.5.0')).toBeFalsy()
  })

  test('mayBeGreater', () => {
    expect(mayBeGreater('1.1.1', '2.2.2')).toBeFalsy()
    expect(mayBeGreater('2.1.1', '2.2.2')).toBeFalsy()
    expect(mayBeGreater('2.2.1', '2.2.2')).toBeFalsy()
    expect(mayBeGreater('2.2.2', '2.2.2')).toBeFalsy()
    expect(mayBeGreater('2.2.3', '2.2.2')).toBeTruthy()
    expect(mayBeGreater('2.3.3', '2.2.2')).toBeTruthy()
    expect(mayBeGreater('3.3.3', '2.2.2')).toBeTruthy()

    expect(mayBeGreater('^1.1.1', '2.2.2')).toBeFalsy()
    expect(mayBeGreater('^2.2.2', '2.2.2')).toBeTruthy()
    expect(mayBeGreater('^3.3.3', '2.2.2')).toBeTruthy()
    expect(mayBeGreater('^4.4.6', '4.5.0')).toBeTruthy()
  })

  test('greater', () => {
    expect(greater('1.1.1', '2.2.2')).toBeFalsy()
    expect(greater('2.1.1', '2.2.2')).toBeFalsy()
    expect(greater('2.2.1', '2.2.2')).toBeFalsy()
    expect(greater('2.2.2', '2.2.2')).toBeFalsy()
    expect(greater('2.2.3', '2.2.2')).toBeTruthy()
    expect(greater('2.3.3', '2.2.2')).toBeTruthy()
    expect(greater('3.3.3', '2.2.2')).toBeTruthy()

    expect(greater('^1.1.1', '2.2.2')).toBeFalsy()
    expect(greater('^2.2.2', '2.2.2')).toBeFalsy()
    expect(greater('^3.3.3', '2.2.2')).toBeTruthy()
    expect(greater('^4.4.6', '4.5.0')).toBeFalsy()
  })

  test('greaterOrEquals', () => {
    expect(greaterOrEquals('1.1.1', '2.2.2')).toBeFalsy()
    expect(greaterOrEquals('2.1.1', '2.2.2')).toBeFalsy()
    expect(greaterOrEquals('2.2.1', '2.2.2')).toBeFalsy()
    expect(greaterOrEquals('2.2.2', '2.2.2')).toBeTruthy()
    expect(greaterOrEquals('2.2.3', '2.2.2')).toBeTruthy()
    expect(greaterOrEquals('2.3.3', '2.2.2')).toBeTruthy()
    expect(greaterOrEquals('3.3.3', '2.2.2')).toBeTruthy()

    expect(greaterOrEquals('^1.1.1', '2.2.2')).toBeFalsy()
    expect(greaterOrEquals('^2.2.2', '2.2.2')).toBeTruthy()
    expect(greaterOrEquals('^3.3.3', '2.2.2')).toBeTruthy()
    expect(greaterOrEquals('^4.4.6', '4.5.0')).toBeFalsy()
  })

  test('equals', () => {
    expect(equals('1.1.1', '2.2.2')).toBeFalsy()
    expect(equals('2.1.1', '2.2.2')).toBeFalsy()
    expect(equals('2.2.1', '2.2.2')).toBeFalsy()
    expect(equals('2.2.2', '2.2.2')).toBeTruthy()
    expect(equals('2.2.3', '2.2.2')).toBeFalsy()
    expect(equals('2.3.3', '2.2.2')).toBeFalsy()
    expect(equals('3.3.3', '2.2.2')).toBeFalsy()

    expect(equals('^1.1.1', '2.2.2')).toBeFalsy()
    expect(equals('^2.2.2', '2.2.2')).toBeFalsy()
    expect(equals('^3.3.3', '2.2.2')).toBeFalsy()
  })
})

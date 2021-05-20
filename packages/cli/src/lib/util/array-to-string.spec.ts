import { arrayToString } from './array-to-string'

describe('arrayToString', () => {
  it('should work correctly', () => {
    const result = arrayToString(['string-one', 'string-two'])
    const expectedResult = '"string-one", "string-two"'

    expect(result).toBe(expectedResult)
  })
})

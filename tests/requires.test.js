it('should be successfully imported using require()', () => {
  const names = ['base', 'react', 'prettier', 'typescript', 'node']

  for (let name of names) {
    expect(() => require('../npm/@eslint-kit/' + name)).not.toThrow()
  }
})

it('should be successfully imported using require()', () => {
  const names = [
    'base',
    'react',
    'react/performant',
    'prettier',
    'typescript',
    'node',
    'packs/react-typescript',
  ]

  for (let name of names) {
    expect(() => require('../' + name)).not.toThrow()
  }
})

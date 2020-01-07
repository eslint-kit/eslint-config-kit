it('should be successfully imported using require()', () => {
  const names = [
    'base',
    'base/soft',
    'react',
    'react/performant',
    'react-hooks',
    'prettier',
    'typescript',
    'node',
    'packs/react',
    'packs/react-typescript',
  ]

  for (let name of names) {
    expect(() => require('../' + name)).not.toThrow()
  }
})

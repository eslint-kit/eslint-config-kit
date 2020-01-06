var extensions = require('../constants/extensions')

module.exports = {
  settings: {
    'import/extensions': extensions.ts,
    'import/resolver': {
      node: {
        extensions: extensions.ts,
      },
    },
    'import/ignore': ['\\.(coffee|scss|css|less|hbs|svg|json)$'],
    'import/external-module-folders': ['node_modules', 'node_modules/@types'],
    'import/parsers': {
      '@typescript-eslint/parser': extensions.tsExclusive,
    },
  },
}

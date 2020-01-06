module.exports = {
  extends: ['./index.js'].map(require.resolve),
  rules: {
    'no-console': 'off',
    'import/no-default-export': 'off',
  },
}

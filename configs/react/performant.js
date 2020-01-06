module.exports = {
  extends: ['./index.js'].map(require.resolve),
  rules: {
    'react/no-array-index-key': 'error',
    'react/jsx-no-bind': [
      'error',
      {
        ignoreDOMComponents: true,
      },
    ],
    'react/jsx-props-no-spreading': [
      'error',
      {
        html: 'ignore',
      },
    ],
  },
}

module.exports = {
  extends: ['react', 'react-hooks']
    .map(function(path) {
      return '../configs/' + path
    })
    .map(require.resolve),
}

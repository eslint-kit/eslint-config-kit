module.exports = {
  extends: ['react', 'typescript']
    .map(function(path) {
      return '../configs/' + path
    })
    .map(require.resolve),
}

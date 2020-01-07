module.exports = {
  extends: ['react', 'react-hooks', 'typescript']
    .map(function(path) {
      return '../configs/' + path
    })
    .map(require.resolve),
}

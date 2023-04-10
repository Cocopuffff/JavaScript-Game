module.exports = function clear() {
  if (typeof console.clear === 'function') {
    console.clear()
  }
}

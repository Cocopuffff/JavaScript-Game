module.exports = function clear() {
  var stdout = process.stdout
  if (!stdout.isTTY) return;
  stdout.write('\x1bc')
}

if (require.main === module) {
  clear()
}

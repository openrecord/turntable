'use strict'
Object.defineProperty(exports, '__esModule', {value: true})
/**
 * Walk through an object applying function at every key/value.
 * @param {object|array} object
 * @param {function(value, keyPath, originalObject)} fn - Function to apply during walk.
 */
exports.deepWalk = function(object, fn) {
  _walker(object, fn, object, '')
  function _walker(o, fn, original, keyPath) {
    for (var i in o) {
      var thisKeyPath = (keyPath || '') + (Array.isArray(o) ? '[' + i + ']' : keyPath ? '.' + i : '' + i)
      fn.apply(this, [o[i], thisKeyPath, original])
      if (o[i] !== null && typeof o[i] === 'object') {
        _walker(o[i], fn, original, thisKeyPath)
      }
    }
  }
}
exports.isDevEnvironment = function() {
  return ['test', 'dev', undefined].includes(process.env.NODE_ENV)
}

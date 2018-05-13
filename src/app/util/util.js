const crypto = require('crypto')

/**
 * Copied from snoopy codebase: https://github.com/Footage-Firm/snoopy/blob/b2382095a2c5b6436e54d4aa5c25d9f9b85e21f3/src/utils.js#L5
 * @return {string}
 */
module.exports.uuidv4 = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => (c ^ (crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16))
}

/**
 * Walk through an object applying function at every key/value.
 * @param {object|array} object
 * @param {function(value, keyPath, originalObject)} fn - Function to apply during walk.
 */
module.exports.deepWalk = (object, fn) => {
  _walker(object, fn, object, '')

  function _walker(o, fn, original, keyPath) {
    for (const i in o) {
      const thisKeyPath = (keyPath || '') + (Array.isArray(o) ? `[${i}]` : keyPath ? `.${i}` : `${i}`)

      fn.apply(this, [o[i], thisKeyPath, original])
      if (o[i] !== null && typeof o[i] === 'object') {
        _walker(o[i], fn, original, thisKeyPath)
      }
    }
  }
}

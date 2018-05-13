/* istanbul ignore file */

// We use node-config's javascript file loading behavior to load this file during configuration.
// It ensures that users have NODE_ENV=test when running mocha.
//
// https://github.com/lorenwest/node-config/wiki/Special-features-for-JavaScript-configuration-files

// If jest is running without NODE_ENV, set NODE_ENV="test".
const isJest = process.argv[1].match(/jest/)
if (isJest && !process.env.NODE_ENV) {
  console.log('Overriding NODE_ENV to "test"')
  process.env.NODE_ENV = 'test'
}

// Load config normally.
module.exports = require('config')

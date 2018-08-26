'use strict'
Object.defineProperty(exports, '__esModule', {value: true})
var path = require('path')
/**
 * Setup path to config folder for lambda.
 * See https://github.com/lorenwest/node-config/issues/275#issuecomment-218947256
 */
function configurePathForLambda() {
  var LAMBDA_TASK_ROOT = process.env.LAMBDA_TASK_ROOT
  if (LAMBDA_TASK_ROOT && !process.env.IS_OFFLINE) {
    var configPath = path.join(LAMBDA_TASK_ROOT, 'config')
    console.log('Setting NODE_CONFIG_DIR path for Lambda execution environment: ' + configPath)
    process.env.NODE_CONFIG_DIR = configPath
  }
}
configurePathForLambda()
var proxy_1 = require('./functions/proxy')
exports.proxy = proxy_1.proxy

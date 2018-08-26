'use strict'
Object.defineProperty(exports, '__esModule', {value: true})
var inversify_config_1 = require('./inversify.config')
function bindDependencies(func) {
  var dependencies = []
  for (var _i = 1; _i < arguments.length; _i++) {
    dependencies[_i - 1] = arguments[_i]
  }
  var injections = dependencies.map(function(dependency) {
    return inversify_config_1.container.get(dependency)
  })
  return func.bind.apply(func, [func].concat(injections))
}
exports.bindDependencies = bindDependencies

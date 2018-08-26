var path = require('path')
var glob = require('glob')
module.exports = function(fastify, opts, next) {
  fastify.decorate('utility', function() {})
  var routesGlob = opts.routesGlob,
    baseDir = opts.baseDir
  if (!routesGlob) {
    throw new Error('fastify-glob requires options: routesGlob')
  }
  var workDir = baseDir || path.dirname(module.parent.filename)
  var pattern = path.resolve(workDir, routesGlob)
  glob.sync(pattern).forEach(function(routeFile) {
    var modulePath = './' + path.relative(__dirname, routeFile)
    var routes = require(modulePath).default
    routes.forEach(function(route) {
      return fastify.route(route)
    })
  })
  next()
}

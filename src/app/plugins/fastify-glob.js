const path = require('path')
const glob = require('glob')

module.exports = function(fastify, opts, next) {
  fastify.decorate('utility', () => {})

  const {routesGlob, baseDir} = opts

  if (!routesGlob) {
    throw new Error('fastify-glob requires options: routesGlob')
  }

  const workDir = baseDir || path.dirname(module.parent.filename)
  const pattern = path.resolve(workDir, routesGlob)

  glob.sync(pattern).forEach(routeFile => {
    const modulePath = './' + path.relative(__dirname, routeFile)
    const routes = require(modulePath)
    routes.forEach(route => fastify.route(route))
  })

  next()
}

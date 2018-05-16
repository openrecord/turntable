const _ = require('lodash')
const Fastify = require('fastify')

/** @type {fastify.FastifyInstance} */
const server = Fastify()

// Routes
const routes = _.union(require('./modules/healthcheck/healthcheckRoutes'), require('./modules/auth/authRoutes'))

_.each(routes, route => {
  server.route(route)
})

module.exports = server

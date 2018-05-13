const _ = require('lodash')
const fastify = require('fastify')

const server = fastify()

// Routes
const routes = _.union(require('./modules/healthcheck/healthcheckRoutes'))

_.each(routes, route => {
  server.route(route)
})

module.exports = server

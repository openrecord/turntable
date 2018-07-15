const Fastify = require('fastify')

/** @type {fastify.FastifyInstance} */
const server = Fastify()

// Middleware
server.use(require('cors')())

// Plugins
server.register(require('fastify-swagger'), {
  swagger: {
    info: {
      title: 'openrecord API',
      description: 'The openrecord API documentation.',
      version: '0.0.1'
    }
  },
  exposeRoute: true,
  routePrefix: '/doc'
})

server.register(require('fastify-boom'))
server.register(require('fastify-cookie'))

// Routes
server.register(require('./plugins/fastify-glob'), {
  routesGlob: './modules/**/*Routes.js'
})

/** @type {fastify.FastifyInstance} */
module.exports = server

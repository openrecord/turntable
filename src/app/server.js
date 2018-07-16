const Fastify = require('fastify')

const log = require('./util/logger')

/** @type {fastify.FastifyInstance} */
const server = Fastify()

// Middleware
// Access-Control-Allow-Origin, Access-Control-Allow-Credentials
server.use(require('cors')({origin: true, credentials: true}))

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

// Logging
server.addHook('onRequest', (req, res, next) => {
  log.logRequest(req)
  next()
})
server.addHook('onResponse', (res, next) => {
  log.logResponse(res)
  next()
})

/** @type {fastify.FastifyInstance} */
module.exports = server

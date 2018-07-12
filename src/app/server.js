const Fastify = require('fastify')
const cors = require('cors')
const fastifyGlob = require('./plugins/fastify-glob')
const fastifySwagger = require('fastify-swagger')
const fastifyBoom = require('fastify-boom')

/** @type {fastify.FastifyInstance} */
const server = Fastify()

// Middleware
server.use(cors())

// Plugins
server.register(fastifySwagger, {
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

server.register(fastifyBoom)

// Routes
server.register(fastifyGlob, {
  routesGlob: './modules/**/*Routes.js'
})

/** @type {fastify.FastifyInstance} */
module.exports = server

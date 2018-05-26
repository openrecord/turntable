const Fastify = require('fastify')
const fastifyGlob = require('./plugins/fastify-glob')

/** @type {fastify.FastifyInstance} */
const server = Fastify()

// Routes
server.register(fastifyGlob, {
  routesGlob: './modules/**/*Routes.js'
})

/** @type {fastify.FastifyInstance} */
module.exports = server

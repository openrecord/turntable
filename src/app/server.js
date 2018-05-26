const Fastify = require('fastify')
const cors = require('cors')
const fastifyGlob = require('./plugins/fastify-glob')

/** @type {fastify.FastifyInstance} */
const server = Fastify()

// Middleware
server.use(cors())

// Routes
server.register(fastifyGlob, {
  routesGlob: './modules/**/*Routes.js'
})

/** @type {fastify.FastifyInstance} */
module.exports = server

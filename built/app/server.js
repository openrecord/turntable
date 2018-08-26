'use strict'
Object.defineProperty(exports, '__esModule', {value: true})
var Fastify = require('fastify')
var logger_1 = require('./util/logger')
/** @type {fastify.FastifyInstance} */
exports.server = Fastify()
// Middleware
// Access-Control-Allow-Origin, Access-Control-Allow-Credentials
exports.server.use(require('cors')({origin: true, credentials: true}))
// Plugins
exports.server.register(require('fastify-swagger'), {
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
exports.server.register(require('fastify-boom'))
exports.server.register(require('fastify-cookie'))
// Routes
exports.server.register(require('./plugins/fastify-glob'), {
  routesGlob: './modules/**/*Routes.js'
})
// Logging
exports.server.addHook('onRequest', function(req, res, next) {
  logger_1.log.logRequest(req)
  next()
})
exports.server.addHook('onResponse', function(res, next) {
  logger_1.log.logResponse(res)
  next()
})

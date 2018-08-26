'use strict'
Object.defineProperty(exports, '__esModule', {value: true})
var HealthCheckController_1 = require('./HealthCheckController')
//TODO: schemas: https://www.fastify.io/docs/v1.4.x/Validation-and-Serialization/
exports.default = [
  {
    method: 'GET',
    path: '/healthcheck',
    handler: HealthCheckController_1.HealthCheckController.handleHealthCheck
  }
]

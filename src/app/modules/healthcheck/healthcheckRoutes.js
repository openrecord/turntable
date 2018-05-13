const HealthCheckController = require('./HealthCheckController')

//TODO: schemas: https://www.fastify.io/docs/v1.4.x/Validation-and-Serialization/

module.exports = [
  {
    method: 'GET',
    path: '/healthcheck',
    handler: HealthCheckController.handleHealthCheck
  }
]

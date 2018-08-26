import {HealthCheckController} from './HealthCheckController'

//TODO: schemas: https://www.fastify.io/docs/v1.4.x/Validation-and-Serialization/

export default [
  {
    method: 'GET',
    path: '/healthcheck',
    handler: HealthCheckController.handleHealthCheck
  }
]

class HealthCheckController {
  static async handleHealthCheck(request, reply) {
    reply.send({healthy: true})
  }
}

module.exports = HealthCheckController

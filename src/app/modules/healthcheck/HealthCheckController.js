class HealthCheckController {
  static async handleHealthCheck(request, reply) {
    return {healthy: true}
  }
}

module.exports = HealthCheckController

export class HealthCheckController {
  static async handleHealthCheck(request, reply) {
    return {healthy: true}
  }
}

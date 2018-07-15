const log = require('../../util/logger')

class HealthCheckController {
  static async handleHealthCheck(request, reply) {
    log.debug('Healthcheck Request.', {
      url: request.raw.url,
      method: request.raw.method,
      headers: request.headers,
      cookies: request.cookies
    })
    return {healthy: true}
  }
}

module.exports = HealthCheckController

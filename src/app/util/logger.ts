import * as config from 'config'
import * as winston from 'winston'

class Log extends winston.Logger {
  printConfig = () => {
    this.debug('Printing config.', config)
  }

  logRequest = req => {
    this.silly('Request.', {
      req: req.url,
      method: req.method,
      headers: req.headers
    })
  }

  logResponse = res => {
    this.silly('Response.', {
      statusCode: res.statusCode,
      statusMessage: res.statusMessage
    })
  }
}

export const log = new Log({
  level: config.log.level
})

// Console
const consoleEnabled = config.log.console.enabled
if (consoleEnabled) {
  log.add(winston.transports.Console, {
    colorize: 'all',
    timestamp: true,
    prettyPrint: true,
    depth: config.log.depth, // prevent unlimited
    humanReadableUnhandledException: true,
    formatter: undefined // formatter function
  })
}

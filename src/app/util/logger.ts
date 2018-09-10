import * as config from 'config'
import * as winston from 'winston'

class Log {
  private logger: winston.Logger

  constructor() {
    this.logger = new winston.Logger({
      level: config.log.level
    })
    this._addTransports()
  }

  _addTransports() {
    // Console
    if (config.log.console.enabled) {
      this.logger.add(winston.transports.Console, {
        colorize: 'all',
        timestamp: true,
        prettyPrint: true,
        depth: config.log.depth, // prevent unlimited
        humanReadableUnhandledException: true,
        formatter: undefined // formatter function
      })
    }
  }

  printConfig = () => {
    this.logger.debug('Printing config.', config)
  }

  logRequest = req => {
    this.logger.silly('Request.', {
      req: req.url,
      method: req.method,
      headers: req.headers
    })
  }

  logResponse = res => {
    this.logger.silly('Response.', {
      statusCode: res.statusCode,
      statusMessage: res.statusMessage
    })
  }

  // This is a temp hack; will be moving to pino logger soon.
  debug = (msg, data) => this.logger.debug(msg, data)
}

export const log = new Log()

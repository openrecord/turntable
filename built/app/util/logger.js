'use strict'
var __extends =
  (this && this.__extends) ||
  (function() {
    var extendStatics =
      Object.setPrototypeOf ||
      ({__proto__: []} instanceof Array &&
        function(d, b) {
          d.__proto__ = b
        }) ||
      function(d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]
      }
    return function(d, b) {
      extendStatics(d, b)
      function __() {
        this.constructor = d
      }
      d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __())
    }
  })()
Object.defineProperty(exports, '__esModule', {value: true})
var config = require('config')
var winston = require('winston')
var Log = /** @class */ (function(_super) {
  __extends(Log, _super)
  function Log() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this
    _this.printConfig = function() {
      _this.debug('Printing config.', config)
    }
    _this.logRequest = function(req) {
      _this.silly('Request.', {
        req: req.url,
        method: req.method,
        headers: req.headers
      })
    }
    _this.logResponse = function(res) {
      _this.silly('Response.', {
        statusCode: res.statusCode,
        statusMessage: res.statusMessage
      })
    }
    return _this
  }
  return Log
})(winston.Logger)
exports.log = new Log({
  level: config.log.level
})
// Console
var consoleEnabled = config.log.console.enabled
if (consoleEnabled) {
  exports.log.add(winston.transports.Console, {
    colorize: 'all',
    timestamp: true,
    prettyPrint: true,
    depth: config.log.depth,
    humanReadableUnhandledException: true,
    formatter: undefined // formatter function
  })
}

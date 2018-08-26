'use strict'
Object.defineProperty(exports, '__esModule', {value: true})
var url_1 = require('url')
var RequestFactory = /** @class */ (function() {
  function RequestFactory() {}
  RequestFactory.fromLambdaEvent = function(_a) {
    var httpMethod = _a.httpMethod,
      protocol = _a.protocol,
      pathname = _a.path,
      query = _a.queryStringParameters,
      payload = _a.body,
      headers = _a.headers
    return {
      method: httpMethod,
      url: url_1.format({
        protocol: protocol,
        pathname: pathname,
        query: query
      }),
      payload: payload,
      headers: headers
    }
  }
  return RequestFactory
})()
exports.default = RequestFactory

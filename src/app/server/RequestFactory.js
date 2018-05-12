const url = require('url')

class RequestFactory {
  static fromLambdaEvent(event) {
    return {
      method: event.httpMethod,
      url: url.format({
        protocol: event.protocol,
        pathname: event.path,
        query: event.queryStringParameters
      }),
      payload: event.body,
      headers: event.headers
    }
  }
}

module.exports = RequestFactory

import {format} from 'url'

export default class RequestFactory {
  static fromLambdaEvent({httpMethod, protocol, path: pathname, queryStringParameters: query, body: payload, headers}) {
    return {
      method: httpMethod,
      url: format({
        protocol,
        pathname,
        query
      }),
      payload,
      headers
    }
  }
}

const RequestFactory = require('../modules/common/RequestFactory')
const server = require('../server')

module.exports = async (event, context, callback) => {
  const request = RequestFactory.fromLambdaEvent(event)
  const response = await server.inject(request)

  return {
    statusCode: response.statusCode,
    body: response.payload
  }
}

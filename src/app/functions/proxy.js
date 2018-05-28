const RequestFactory = require('../modules/common/RequestFactory')
const db = require('../services/database')
const server = require('../server')

module.exports = async (event, context, callback) => {
  const request = RequestFactory.fromLambdaEvent(event)
  const response = await server.inject(request)

  if (process.env.IS_OFFLINE) {
    console.log('Closing db.')
    await db.close()
  }

  return {
    headers: response.headers,
    statusCode: response.statusCode,
    body: response.payload
  }
}

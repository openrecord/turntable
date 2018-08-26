import RequestFactory from '../modules/common/RequestFactory'
import * as db from '../services/database'
import {server} from '../server'

export const proxy = async (event, context, callback) => {
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

const url = require('url')
const _ = require('lodash')

const testUtil = require('../../tools/testUtil')
const server = require('../../../app/server')

afterAll(testUtil.closeDb)

describe('healthcheck', () => {
  test('ok', async () => {
    const request = {
      method: 'GET',
      url: url.format({
        protocol: 'http',
        pathname: '/healthcheck'
      })
    }

    const response = await server.inject(request)

    testUtil.deepCompare(
      response,
      {
        statusCode: 200,
        statusMessage: 'OK',
        headers: {
          'access-control-allow-origin': '*'
        },
        payload: p => _.isEqual(JSON.parse(p), {healthy: true})
      },
      false
    )
  })
})

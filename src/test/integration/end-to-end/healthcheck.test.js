const url = require('url')
const _ = require('lodash')

const tutil = require('../../tools/testUtil')
const server = require('../../../app/server')

afterAll(tutil.closeDb)

describe('healthcheck', () => {
  test('ok', async () => {
    const response = await server.inject(tutil.req('GET', '/healthcheck'))

    tutil.deepCompare(
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

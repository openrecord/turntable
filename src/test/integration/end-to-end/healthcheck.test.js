const url = require('url')
const _ = require('lodash')

const tutil = require('../../tools/testUtil')
const server = require('../../../app/server')

afterAll(tutil.closeDb)

describe('healthcheck', () => {
  test('ok', async () => {
    const response = await server.inject(tutil.req('GET', '/healthcheck'))
    tutil.expectResponse(response, 200, {healthy: true}, {'access-control-allow-origin': '*'})
  })
})

const url = require('url')
const faker = require('faker')

const testUtil = require('../../tools/testUtil')
const server = require('../../../app/server')

afterAll(testUtil.closeDb)

describe('playlists', () => {
  test('create', async () => {
    const request = {
      method: 'POST',
      url: url.format({
        protocol: 'http',
        pathname: '/playlists'
      }),
      payload: {
        name: faker.random.words()
      }
    }

    const response = await server.inject(request)

    testUtil.deepCompare(
      response,
      {
        statusCode: 201,
        statusMessage: 'Created'
      },
      false
    )

    testUtil.deepCompare(JSON.parse(response.payload), {
      id: /\d+/,
      name: /\w+/
    })
  })
})

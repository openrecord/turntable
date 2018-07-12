const faker = require('faker')

const tutil = require('../../tools/testUtil')
const server = require('../../../app/server')

afterAll(tutil.closeDb)

describe('playlists', () => {
  test('create', async () => {
    const response = await server.inject(tutil.req('POST', '/playlists', {name: faker.random.words(4)}))

    tutil.deepCompare(
      response,
      {
        statusCode: 201,
        statusMessage: 'Created'
      },
      false
    )

    tutil.deepCompare(JSON.parse(response.payload), {
      id: /\d+/,
      name: /\w+/
    })
  })
})

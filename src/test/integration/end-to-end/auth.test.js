const assert = require('assert')
const url = require('url')
const faker = require('faker')

const testUtil = require('../../tools/testUtil')
const server = require('../../../app/server')

afterAll(testUtil.closeDb)

describe('auth', () => {
  test('register', async () => {
    const request = {
      method: 'POST',
      url: url.format({
        protocol: 'http',
        pathname: '/auth/register'
      }),
      payload: {
        email: faker.internet.email(),
        password: faker.internet.password()
      }
    }

    const response = await server.inject(request)

    testUtil.deepCompare(
      response,
      {
        statusCode: 200,
        statusMessage: 'OK'
      },
      false
    )

    testUtil.deepCompare(JSON.parse(response.payload), {
      token: /w+/
    })
  })
})

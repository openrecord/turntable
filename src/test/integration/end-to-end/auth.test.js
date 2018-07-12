const faker = require('faker')

const factory = require('../../tools/mocks/MockFactory')
const tutil = require('../../tools/testUtil')
const server = require('../../../app/server')

afterAll(tutil.closeDb)

describe('auth', () => {
  test('register', async () => {
    const response = await server.inject(
      tutil.req('POST', '/auth/register', {
        email: faker.internet.email(),
        password: faker.internet.password()
      })
    )

    tutil.deepCompare(
      response,
      {
        statusCode: 200,
        statusMessage: 'OK'
      },
      false
    )

    tutil.deepCompare(JSON.parse(response.payload), {
      token: /\w+\.\w+\.\w+/
    })
  })

  test('token succeeds', async () => {
    const email = faker.internet.email()
    const password = faker.internet.password()
    await factory.user({email, password})

    const response = await server.inject(tutil.req('POST', '/auth/token', {email, password}))

    tutil.deepCompare(
      response,
      {
        statusCode: 200,
        statusMessage: 'OK'
      },
      false
    )

    tutil.deepCompare(JSON.parse(response.payload), {
      token: /\w+\.\w+\.\w+/
    })
  })

  test('token fails', async () => {
    const response = await server.inject(
      tutil.req('POST', '/auth/token', {
        email: faker.internet.email(),
        password: faker.internet.password()
      })
    )

    tutil.deepCompare(
      response,
      {
        statusCode: 401,
        statusMessage: 'Unauthorized',
        payload: p => JSON.parse(p).message === 'Could not find user by email.'
      },
      false
    )
  })
})

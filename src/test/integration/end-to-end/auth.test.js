const faker = require('faker')

const factory = require('../../tools/mocks/MockFactory')
const tutil = require('../../tools/testUtil')
const server = require('../../../app/server')

afterAll(tutil.closeDb)

describe('POST /auth/register', () => {
  test('register', async () => {
    const response = await server.inject(
      tutil.req('POST', '/auth/register', {
        email: faker.internet.email(),
        password: faker.internet.password()
      })
    )

    tutil.expectResponse(response, 200, {sessionToken: /\S+\.\S+\.\S+/}, {'set-cookie': /sid=\S+\.\S+\.\S+/})
  })
})

describe('POST /auth/token', () => {
  test('returns a generated session token', async () => {
    const email = faker.internet.email()
    const password = faker.internet.password()
    await factory.user({email, password})

    const response = await server.inject(tutil.req('POST', '/auth/token', {email, password}))

    tutil.expectResponse(
      response,
      200,
      {sessionToken: /\S+\.\S+\.\S+/},
      {'set-cookie': /sid=\S+\.\S+\.\S+; Path=\//, 'access-control-allow-credentials': 'true'}
    )
  })

  test('returns a 401 when the user does not exist', async () => {
    const response = await server.inject(
      tutil.req('POST', '/auth/token', {
        email: faker.internet.email(),
        password: faker.internet.password()
      })
    )

    tutil.expectResponse(response, 401, {message: 'Could not find user by email.'})
  })
})

describe('GET /auth/token', () => {
  test('returns a refreshed token when existing token is passed as cookie', async () => {
    const email = faker.internet.email()
    const password = faker.internet.password()
    await factory.user({email, password})

    // Generate and retrieve initial token
    const {payload} = await server.inject(tutil.req('POST', '/auth/token', {email, password}))
    const {sessionToken} = JSON.parse(payload)

    // Refresh using token
    const sessionCookie = 'sid=' + sessionToken
    const response = await server.inject(tutil.req('GET', '/auth/token', null, {cookie: sessionCookie}))

    tutil.expectResponse(response, 200, {sessionToken: /\S+\.\S+\.\S+/}, {'set-cookie': /sid=\S+\.\S+\.\S+/})
  })

  test('returns a 401 when the existing token is not valid', async () => {
    const badSessionCookie = 'sid=asdf.1234.asdf'
    const response = await server.inject(tutil.req('GET', '/auth/token', null, {cookie: badSessionCookie}))
    tutil.expectResponse(response, 401, {message: 'Invalid token.'})
  })
})

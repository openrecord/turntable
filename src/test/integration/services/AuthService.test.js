const assert = require('assert')

const testUtil = require('../../tools/testUtil')
const MockFactory = require('../../tools/mocks/MockFactory')
const serviceLocator = require('../../../app/services/serviceLocator')

afterAll(testUtil.closeDb)

describe('AuthService', () => {
  const userService = serviceLocator.userService()
  const authService = serviceLocator.authService()

  test('register', async () => {
    const registerDto = MockFactory.registerDto()
    const token = await authService.register(registerDto)

    assert.notEqual(token, null)
  })

  test('decodeToken', async () => {
    const token = await authService.register(MockFactory.registerDto())
    const decoded = authService.decodeToken(token)

    assert.notEqual(decoded, null)
  })
})

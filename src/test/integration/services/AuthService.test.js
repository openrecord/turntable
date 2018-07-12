const assert = require('assert')

const testUtil = require('../../tools/testUtil')
const MockFactory = require('../../tools/mocks/MockFactory')
const serviceLocator = require('../../../app/services/serviceLocator')
const AuthService = require('../../../app/services/auth/AuthService')
const LoginDTO = require('../../../app/modules/auth/dtos/LoginDTO')

afterAll(testUtil.closeDb)

describe('AuthService', () => {
  const userService = serviceLocator.userService()
  const authService = serviceLocator.authService()

  test('register', async () => {
    const registerDto = MockFactory.registerDto()
    const token = await authService.register(registerDto)
    const createdUser = await userService.getByEmail(registerDto.email)

    assert.notEqual(token, null)
    assert.notEqual(createdUser, null)
  })

  test('login', async () => {
    const password = 'cessna172'
    const dummyUser = await MockFactory.user({password})
    const loginDto = new LoginDTO(dummyUser.email, password)
    const token = await authService.login(loginDto)

    assert.notEqual(token, null)
  })

  test('hashPassword', async () => {
    const hashedPassword = await AuthService.hashPassword('asdf')
    expect(hashedPassword).toMatch(/\$argon2i\$v=19\$m=4096,t=3,p=\S+/)
  })

  test('verifyPassword', async () => {
    const hashedPassword = await AuthService.hashPassword('asdf')
    const verified = await AuthService.verifyPassword(hashedPassword, 'asdf')
    expect(verified).toBe(true)
  })

  test('decodeToken', async () => {
    const token = await authService.register(MockFactory.registerDto())
    const decoded = AuthService.decodeToken(token)
    expect(decoded).toBeDefined()
  })
})

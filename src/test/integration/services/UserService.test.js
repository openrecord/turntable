const _ = require('lodash')

const testUtil = require('../../tools/testUtil')
const MockFactory = require('../../tools/mocks/MockFactory')
const serviceLocator = require('../../../app/services/serviceLocator')

afterAll(testUtil.closeDb)

describe('UserService', () => {
  const userService = serviceLocator.userService()

  test('create', async () => {
    const dummyUser = await MockFactory.user(false)
    const user = await userService.create(dummyUser.email, dummyUser.hashedPassword)

    expect(user).toBeDefined()
    testUtil.deepCompare(user, {
      ...dummyUser,
      id: _.isInteger
    })
  })
})

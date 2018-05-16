const assert = require('assert')
const faker = require('faker')

const testUtil = require('../../tools/testUtil')
const MockFactory = require('../../tools/mocks/MockFactory')
const serviceLocator = require('../../../app/services/serviceLocator')

afterAll(testUtil.closeDb)

describe('UserDao', () => {
  const dao = serviceLocator.userDao()

  test('create', async () => {
    const dummyUser = MockFactory.user()

    const user = await dao.create(dummyUser)

    assert.notEqual(user, null)
    assert.equal(user.email, dummyUser.email)
    assert.equal(user.hashedPassword, dummyUser.hashedPassword)
  })
})

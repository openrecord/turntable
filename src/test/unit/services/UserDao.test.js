const assert = require('assert')
const faker = require('faker')

const testUtil = require('../../tools/testUtil')
const MockFactory = require('../../tools/mocks/MockFactory')
const serviceLocator = require('../../../app/services/serviceLocator')

afterAll(testUtil.closeDb)

describe('UserDao', () => {
  const dao = serviceLocator.userDao()

  test('create', async () => {
    const dummyUser = await MockFactory.user(false)

    const user = await dao.create(dummyUser)

    assert.notEqual(user, null)
    assert.equal(user.email, dummyUser.email)
    assert.equal(user.username, dummyUser.username)
    assert.equal(user.hashedPassword, dummyUser.hashedPassword)
  })
})

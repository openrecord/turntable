const assert = require('assert')

const serviceLocator = require('../../../app/services/serviceLocator')

describe('UserDao', () => {
  const dao = serviceLocator.userDao()

  describe('create', async () => {
    it('creates a user', async () => {
      assert.fail()
    })
  })
})

const assert = require('assert')

const testUtil = require('../../tools/testUtil')
const MockFactory = require('../../tools/mocks/MockFactory')
const serviceLocator = require('../../../app/services/serviceLocator')

afterAll(testUtil.closeDb)

describe('PlaylistDao', () => {
  const dao = serviceLocator.playlistDao()

  test('create', async () => {
    const dummy = MockFactory.playlist()

    const result = await dao.create(dummy)

    assert.notEqual(result, null)
    assert.equal(result.name, dummy.name)
  })
})

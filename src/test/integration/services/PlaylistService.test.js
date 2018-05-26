const assert = require('assert')

const testUtil = require('../../tools/testUtil')
const MockFactory = require('../../tools/mocks/MockFactory')
const serviceLocator = require('../../../app/services/serviceLocator')

afterAll(testUtil.closeDb)

describe('PlaylistService', () => {
  const service = serviceLocator.playlistService()

  test('create', async () => {
    const dto = MockFactory.createPlaylistDTO()
    const result = await service.create(dto)
    assert.notEqual(result, null)
  })
})

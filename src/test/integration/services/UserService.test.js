const assert = require('assert')

const faker = require('faker')

const serviceLocator = require('../../../app/services/serviceLocator')
const testUtil = require('../../tools/testUtil')
const MockFactory = require('../../tools/mocks/MockFactory')

describe('CacheService', () => {
  const cacheService = serviceLocator.cacheService()

  before(() => {
    return testUtil.ensureDynamoTable()
  })

  describe('putTranslation', () => {
    it('puts one item', async () => {
      const translateOptions = MockFactory.translateOptions()
      const result = await cacheService.putTranslation(translateOptions, faker.random.words())
      assert.strictEqual(result, undefined)
    })
  })

  describe('getTranslation', () => {
    const translation = faker.random.words()
    const translateOptions = MockFactory.translateOptions()

    before(async () => {
      await cacheService.putTranslation(translateOptions, translation)
    })

    it('gets one translation string', async () => {
      const result = await cacheService.getTranslation(translateOptions)
      assert.strictEqual(result, translation)
    })

    it('returns null for no match', async () => {
      const result = await cacheService.getTranslation(MockFactory.translateOptions())
      assert.strictEqual(result, null)
    })
  })
})

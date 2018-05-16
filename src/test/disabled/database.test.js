const assert = require('assert')
const typeorm = require('typeorm')

const User = require('../../app/services/users/User')
const serviceLocator = require('../../app/services/serviceLocator')

test('test connection', async () => {
  const conn = await serviceLocator.database()

  const repo = conn.getRepository(User)
  await repo.save({email: 'toiasdf'})
  const one = await repo.findOne({email: typeorm.Not('')})

  assert.notEqual(one, null)
  assert.equal(one.email, 'toiasdf')

  await conn.close()
})

const assert = require('assert')
const typeorm = require('typeorm')

const User = require('../../app/services/users/User')
const {connect} = require('../../app/services/database')

test('test connection', async () => {
  const conn = await connect()

  const repo = conn.getRepository(User)
  await repo.save({email: 'toiasdf'})
  const one = await repo.findOne({email: typeorm.Not('')})

  assert.notEqual(one, null)
  assert.equal(one.email, 'toiasdf')

  await conn.close()
})

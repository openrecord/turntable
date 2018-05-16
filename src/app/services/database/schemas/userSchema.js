const typeorm = require('typeorm')

const User = require('../../users/User')

module.exports = new typeorm.EntitySchema({
  name: 'User',
  target: User,
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true
    },
    email: {
      type: 'varchar'
    },
    hashedPassword: {
      type: 'varchar',
      nullable: true
    }
  }
})

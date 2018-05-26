const typeorm = require('typeorm')

module.exports = new typeorm.EntitySchema({
  name: 'User',
  target: require('./User'),
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

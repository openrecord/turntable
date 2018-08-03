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
    username: {
      type: 'varchar',
      unique: true
    },
    email: {
      type: 'varchar',
      unique: true
    },
    hashedPassword: {
      type: 'varchar',
      nullable: true
    }
  }
})

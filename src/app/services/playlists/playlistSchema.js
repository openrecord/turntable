const typeorm = require('typeorm')

module.exports = new typeorm.EntitySchema({
  name: 'Playlist',
  target: require('./Playlist'),
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true
    },
    name: {
      type: 'varchar',
      required: true
    }
  }
})

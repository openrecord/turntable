const Playlist = require('./Playlist')
const BaseDao = require('../common/BaseDao')

class PlaylistDao extends BaseDao {
  entityClass() {
    return Playlist
  }
}

module.exports = PlaylistDao

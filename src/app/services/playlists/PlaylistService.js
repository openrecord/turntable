const serviceLocator = require('../serviceLocator')

class PlaylistService {
  constructor() {
    this._dao = serviceLocator.playlistDao()
  }

  /**
   * @param {CreatePlaylistDTO} createPlaylistDTO
   * @return {Promise<Playlist>}
   */
  async create(createPlaylistDTO) {
    return this._dao.create({
      name: createPlaylistDTO.name
    })
  }
}

module.exports = PlaylistService

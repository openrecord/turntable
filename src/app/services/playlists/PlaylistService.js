const serviceLocator = require('../serviceLocator')

class PlaylistService {
  constructor() {
    /** @type PlaylistDao */
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

  /**
   * @return {Promise<Playlist[]>}
   */
  async get() {
    return this._dao.get()
  }
}

module.exports = PlaylistService

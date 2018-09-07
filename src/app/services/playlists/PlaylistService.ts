import {injectable, inject} from 'inversify'
import {PlaylistDao} from './PlaylistDao'
import {Playlist} from './Playlist.schema'
import {Dao} from '../common/BaseDao'
import {TYPES} from '../../dependencies/types'
import {CreatePlaylistDTO} from '../../modules/playlists/dtos/CreatePlaylistDTO'

@injectable()
export class PlaylistService {
  @inject(TYPES.PlaylistDao)
  private dao: Dao<Playlist>

  /**
   * @param {CreatePlaylistDTO} createPlaylistDTO
   * @return {Promise<Playlist>}
   */
  async create(createPlaylistDTO: CreatePlaylistDTO) {
    return this.dao.create({
      name: createPlaylistDTO.name
    })
  }

  /**
   * @return {Promise<Playlist[]>}
   */
  async get() {
    return this.dao.findAll({})
  }
}

import {injectable} from 'inversify'
import BaseDao from '../common/BaseDao'
import {Playlist} from './Playlist.schema'

@injectable()
export class PlaylistDao extends BaseDao<Playlist> {
  entityClass = Playlist
}

import {injectable} from 'inversify'
import {Playlist} from './Playlist.schema'
import {BaseDao} from '../common/BaseDao'

@injectable()
export class PlaylistDao extends BaseDao<Playlist> {
  entityClass = Playlist
}

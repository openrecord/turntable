import {CreatePlaylistDTO} from './dtos/CreatePlaylistDTO'
import {PlaylistController} from './PlaylistController'
import {TYPES} from '../../dependencies/types'
import {bindDependencies} from '../../dependencies/utils'

export default [
  {
    method: 'POST',
    path: '/playlists',
    schema: CreatePlaylistDTO.schema,
    handler: bindDependencies(PlaylistController.create, TYPES.PlaylistService)
  },
  {
    method: 'GET',
    path: '/playlists',
    handler: bindDependencies(PlaylistController.get, TYPES.PlaylistService)
  }
]

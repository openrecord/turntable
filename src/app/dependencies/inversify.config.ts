import {Container} from 'inversify'
import {TYPES} from './types'
import {PlaylistDao} from '../services/playlists/PlaylistDao'
import {PlaylistService} from '../services/playlists/PlaylistService'

export const container = new Container()
container.bind<PlaylistDao>(TYPES.PlaylistDao).to(PlaylistDao)
container.bind<PlaylistService>(TYPES.PlaylistService).to(PlaylistService)

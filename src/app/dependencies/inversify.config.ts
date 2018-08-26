import {Container} from 'inversify'
import {TYPES} from './types'
import {PlaylistDao} from '../services/playlists/PlaylistDao'
import {PlaylistService} from '../services/playlists/PlaylistService'
import {UserDao} from '../services/users/UserDao'
import {UserService} from '../services/users/UserService'

export const container = new Container()
container.bind<PlaylistDao>(TYPES.PlaylistDao).to(PlaylistDao)
container.bind<PlaylistService>(TYPES.PlaylistService).to(PlaylistService)
container.bind<UserDao>(TYPES.UserDao).to(UserDao)
container.bind<UserService>(TYPES.UserService).to(UserService)

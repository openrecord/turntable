import {injectable, inject} from 'inversify'
import {CreatePlaylistDTO} from './dtos/CreatePlaylistDTO'
import serviceLocator from '../../services/serviceLocator'
import {container} from '../../dependencies/inversify.config'
import {PlaylistService} from '../../services/playlists/PlaylistService'
import {TYPES} from '../../dependencies/types'

export const PlaylistController = {
  async create(playlistService: PlaylistService, request, reply) {
    const dto = CreatePlaylistDTO.fromRequest(request)

    const result = await playlistService.create(dto)

    reply.code(201).send(result)
  },

  async get(playlistService, request, reply) {
    const result = await playlistService.get() //TODO: Actually just get for authenticated user.

    reply.code(200).send(result)
  }
}

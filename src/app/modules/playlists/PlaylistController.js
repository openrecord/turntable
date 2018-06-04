const CreatePlaylistDTO = require('./dtos/CreatePlaylistDTO')
const serviceLocator = require('../../services/serviceLocator')

class PlaylistController {
  static async create(request, reply) {
    const dto = CreatePlaylistDTO.fromRequest(request)

    const playlistService = serviceLocator.playlistService()
    const result = await playlistService.create(dto)

    reply.code(201).send(result)
  }

  static async get(request, reply) {
    const playlistService = serviceLocator.playlistService()
    const result = await playlistService.get() //TODO: Actually just get for authenticated user.

    reply.code(200).send(result)
  }
}

module.exports = PlaylistController

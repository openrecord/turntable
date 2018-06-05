const CreatePlaylistDTO = require('./dtos/CreatePlaylistDTO')
const PlaylistController = require('./PlaylistController')

module.exports = [
  {
    method: 'POST',
    path: '/playlists',
    schema: CreatePlaylistDTO.schema,
    handler: PlaylistController.create
  },
  {
    method: 'GET',
    path: '/playlists',
    handler: PlaylistController.get
  }
]

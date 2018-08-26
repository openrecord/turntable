'use strict'
Object.defineProperty(exports, '__esModule', {value: true})
var CreatePlaylistDTO_1 = require('./dtos/CreatePlaylistDTO')
var PlaylistController_1 = require('./PlaylistController')
var types_1 = require('../../dependencies/types')
var utils_1 = require('../../dependencies/utils')
exports.default = [
  {
    method: 'POST',
    path: '/playlists',
    schema: CreatePlaylistDTO_1.CreatePlaylistDTO.schema,
    handler: utils_1.bindDependencies(PlaylistController_1.PlaylistController.create, types_1.TYPES.PlaylistService)
  },
  {
    method: 'GET',
    path: '/playlists',
    handler: utils_1.bindDependencies(PlaylistController_1.PlaylistController.get, types_1.TYPES.PlaylistService)
  }
]

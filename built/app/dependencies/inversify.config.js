'use strict'
Object.defineProperty(exports, '__esModule', {value: true})
var inversify_1 = require('inversify')
var types_1 = require('./types')
var PlaylistDao_1 = require('../services/playlists/PlaylistDao')
var PlaylistService_1 = require('../services/playlists/PlaylistService')
exports.container = new inversify_1.Container()
exports.container.bind(types_1.TYPES.PlaylistDao).to(PlaylistDao_1.PlaylistDao)
exports.container.bind(types_1.TYPES.PlaylistService).to(PlaylistService_1.PlaylistService)

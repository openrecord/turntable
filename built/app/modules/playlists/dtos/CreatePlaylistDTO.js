'use strict'
Object.defineProperty(exports, '__esModule', {value: true})
var CreatePlaylistDTO = /** @class */ (function() {
  function CreatePlaylistDTO(name) {
    this.name = name
  }
  CreatePlaylistDTO.fromRequest = function(request) {
    var name = request.body.name
    return new this(name)
  }
  Object.defineProperty(CreatePlaylistDTO, 'schema', {
    get: function() {
      return {
        body: {
          type: 'object',
          properties: {
            name: {
              type: 'string'
            }
          },
          required: ['name']
        }
      }
    },
    enumerable: true,
    configurable: true
  })
  return CreatePlaylistDTO
})()
exports.CreatePlaylistDTO = CreatePlaylistDTO

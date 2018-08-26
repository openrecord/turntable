'use strict'
Object.defineProperty(exports, '__esModule', {value: true})
var RegisterDTO = /** @class */ (function() {
  function RegisterDTO(email, password) {
    this.email = email
    this.password = password
  }
  RegisterDTO.fromRequest = function(request) {
    var _a = request.body,
      email = _a.email,
      password = _a.password
    return new this(email, password)
  }
  Object.defineProperty(RegisterDTO, 'schema', {
    get: function() {
      return {
        body: {
          type: 'object',
          properties: {
            email: {type: 'string'},
            password: {type: 'string'}
          },
          required: ['email', 'password']
        }
      }
    },
    enumerable: true,
    configurable: true
  })
  return RegisterDTO
})()
exports.RegisterDTO = RegisterDTO

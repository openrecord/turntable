'use strict'
Object.defineProperty(exports, '__esModule', {value: true})
var LoginDTO = /** @class */ (function() {
  function LoginDTO(email, password) {
    this.email = email
    this.password = password
  }
  LoginDTO.fromRequest = function(request) {
    var _a = request.body,
      email = _a.email,
      password = _a.password
    return new this(email, password)
  }
  Object.defineProperty(LoginDTO, 'schema', {
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
  return LoginDTO
})()
exports.LoginDTO = LoginDTO

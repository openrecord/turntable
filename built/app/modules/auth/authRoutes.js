'use strict'
Object.defineProperty(exports, '__esModule', {value: true})
var LoginDTO_1 = require('./dtos/LoginDTO')
var RegisterDTO_1 = require('./dtos/RegisterDTO')
var AuthController_1 = require('./AuthController')
exports.default = [
  {
    method: 'POST',
    path: '/auth/register',
    schema: RegisterDTO_1.RegisterDTO.schema,
    handler: AuthController_1.AuthController.register
  },
  {
    method: 'POST',
    path: '/auth/token',
    schema: LoginDTO_1.LoginDTO.schema,
    handler: AuthController_1.AuthController.login
  },
  {
    method: 'GET',
    path: '/auth/token',
    handler: AuthController_1.AuthController.refresh
  }
]

const LoginDTO = require('./dtos/LoginDTO')
const RegisterDTO = require('./dtos/RegisterDTO')
const AuthController = require('./AuthController')

module.exports = [
  {
    method: 'POST',
    path: '/auth/register',
    schema: RegisterDTO.schema,
    handler: AuthController.register
  },
  {
    method: 'POST',
    path: '/auth/token',
    schema: LoginDTO.schema,
    handler: AuthController.login
  }
]

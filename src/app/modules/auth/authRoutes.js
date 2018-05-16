const RegisterDTO = require('./dtos/RegisterDTO')
const AuthController = require('./AuthController')

module.exports = [
  {
    method: 'POST',
    path: '/auth/register',
    schema: RegisterDTO.schema,
    handler: AuthController.register
  }
]

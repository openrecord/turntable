const Boom = require('boom')

const RegisterDTO = require('./dtos/RegisterDTO')
const LoginDTO = require('./dtos/LoginDTO')
const serviceLocator = require('../../services/serviceLocator')

class AuthController {
  static async register(request) {
    const registerDto = RegisterDTO.fromRequest(request)

    const authService = serviceLocator.authService()
    const token = await authService.register(registerDto)

    return {token}
  }

  static async login(request) {
    const loginDto = LoginDTO.fromRequest(request)

    const authService = serviceLocator.authService()

    try {
      const token = await authService.login(loginDto)
      return {token}
    } catch (err) {
      //TODO: Figure out better way to map errors in service layer to controller errors.
      throw Boom.unauthorized(err.message)
    }
  }
}

module.exports = AuthController

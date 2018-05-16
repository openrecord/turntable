const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const RegisterDTO = require('./dtos/RegisterDTO')
const serviceLocator = require('../../services/serviceLocator')

class AuthController {
  static async register(request, reply) {
    const registerDto = RegisterDTO.fromRequest(request)

    const authService = serviceLocator.authService()
    const user = await authService.register(registerDto)
  }
}

module.exports = AuthController
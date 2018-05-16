const config = require('config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const log = require('../../util/logger')
const serviceLocator = require('../serviceLocator')

class AuthService {
  constructor() {
    this._userService = serviceLocator.userService()
  }

  /**
   * Register a new user and return jwt
   * @param {RegisterDTO} registerDto
   * @return {Promise<User>}
   */
  async register(registerDto) {
    const hashedPassword = bcrypt.hashSync(registerDto.password, 8)

    const user = await this._userService.create({
      email: registerDto.email,
      hashedPassword
    })

    const secret = 'secret'
    const fiveMin = 60 * 5
    const token = jwt.sign({id: user.id}, secret, {
      expiresIn: fiveMin
    })

    return token
  }
}

module.exports = AuthService

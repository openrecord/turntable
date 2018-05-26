const config = require('config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const log = require('../../util/logger')
const serviceLocator = require('../serviceLocator')

const SECRET = 'sssshhhhhhhh'

class AuthService {
  constructor() {
    this._userService = serviceLocator.userService()
  }

  /**
   * Register a new user and return jwt
   * @param {RegisterDTO} registerDto
   * @return {Promise<string>} - The jwt token
   */
  async register(registerDto) {
    const hashedPassword = bcrypt.hashSync(registerDto.password, 8)

    const user = await this._userService.register(registerDto, hashedPassword)

    const secret = 'secret'
    const token = jwt.sign({id: user.id}, SECRET, {
      expiresIn: '5m'
    })

    return token
  }

  async decodeToken(token) {
    const decoded = jwt.verify(token, SECRET)
    return decoded
  }
}

module.exports = AuthService

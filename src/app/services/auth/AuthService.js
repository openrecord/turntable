const config = require('config')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const log = require('../../util/logger')
const serviceLocator = require('../serviceLocator')

const SALT = '$2b$10$r3kc/Uah9UA3xWdCckUziu' // generated using bcrypt.genSaltSync()
const SECRET = 'sssshhhhhhhh'

class AuthService {
  constructor() {
    this._userService = serviceLocator.userService()
  }

  /**
   * Register a new user and return JWT.
   * @param {RegisterDTO} registerDto
   * @return {Promise<string>} - JWT containing user id.
   */
  async register(registerDto) {
    const hashedPassword = await AuthService.hashPassword(registerDto.password)
    const user = await this._userService.create(registerDto.email, hashedPassword)
    return this._jwt(user)
  }

  /**
   * Login a user and return JWT.
   * @param {LoginDTO} loginDto
   * @return {Promise<string>} - JWT containing user id.
   */
  async login(loginDto) {
    const user = await this._userService.getByEmail(loginDto.email)
    if (!user) {
      throw new Error('Could not find user by email.')
    }

    const verified = await AuthService.verifyPassword(user.hashedPassword, loginDto.password)
    if (!verified) {
      throw new Error('User password does not match.')
    }

    return this._jwt(user)
  }

  /**
   * Return hashed password.
   * @param {string} password - plaintext password.
   * @return {string} - hashed password.
   */
  static async hashPassword(password) {
    return await argon2.hash(password)
  }

  static async verifyPassword(hash, password) {
    return await argon2.verify(hash, password)
  }

  static async decodeToken(token) {
    return jwt.verify(token, SECRET)
  }

  /**
   * Generate a JWT for the user.
   * @param {User} user
   * @param {int} [expMins = 5] - Minutes until expiration.
   * @return {string} - JWT containing user id.
   * @private
   */
  _jwt(user, expMins = 5) {
    return jwt.sign({userId: user.id}, SECRET, {
      expiresIn: expMins + 'm'
    })
  }
}

module.exports = AuthService

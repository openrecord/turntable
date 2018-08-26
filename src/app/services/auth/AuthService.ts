import {TYPES} from '../../dependencies/types'
import {injectable, inject} from 'inversify'
import config from 'config'
import * as argon2 from 'argon2'
import * as jwt from 'jsonwebtoken'
import {UserService} from '../users/UserService'

const SECRET = config.auth.jwtSecret
const ONE_WEEK = 604800 // One week in minutes

@injectable()
export class AuthService {
  @inject(TYPES.UserService)
  private userService: UserService

  /**
   * Register a new user and return JWT.
   * @param {RegisterDTO} registerDto
   * @return {Promise<string>} - JWT containing user id.
   */
  async register(registerDto) {
    const hashedPassword = await AuthService.hashPassword(registerDto.password)
    const user = await this.userService.create(registerDto.email, hashedPassword)
    return this.jwt(user)
  }

  /**
   * Login a user and return JWT.
   * @param {LoginDTO} loginDto
   * @return {Promise<string>} - JWT containing user id.
   */
  async login(loginDto) {
    const user = await this.userService.getByEmail(loginDto.email)
    if (!user) {
      throw new Error('Could not find user by email.')
    }

    const verified = await AuthService.verifyPassword(user.hashedPassword, loginDto.password)
    if (!verified) {
      throw new Error('User password does not match.')
    }

    return this.jwt(user)
  }

  /**
   * Given a valid token, return a new token.
   * @param {string} token - Existing valid token.
   * @return {Promise<string>} - JWT containing user id.
   */
  async refresh(token) {
    const {userId} = await AuthService.decodeToken(token)
    const user = await this.userService.getById(userId)
    if (!user) {
      throw new Error('Could not find user by id.')
    }

    return this.jwt(user)
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
    try {
      return jwt.verify(token, SECRET)
    } catch (err) {
      throw new Error('Invalid token.')
    }
  }

  /**
   * Generate a JWT for the user.
   * @param {User} user
   * @param {int} [expMins = 604800] - Minutes until expiration. Defaults to one week.
   * @return {string} - JWT containing user id.
   * @private
   */
  private jwt(user, expMins = ONE_WEEK) {
    return jwt.sign({userId: user.id}, SECRET, {
      expiresIn: expMins + 'm'
    })
  }
}

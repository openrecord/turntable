const Boom = require('boom')
const _ = require('lodash')

const RegisterDTO = require('./dtos/RegisterDTO')
const LoginDTO = require('./dtos/LoginDTO')
const serviceLocator = require('../../services/serviceLocator')
const log = require('../../util/logger')

/**
 * TODO: Figure out better way to map errors in service layer to controller errors.
 * TODO: Prevent against CSRF attacks. @see https://www.acunetix.com/websitesecurity/csrf-attacks/
 */

class AuthController {
  static async register(request, reply) {
    log.debug('Register Request.', {
      url: request.raw.url,
      method: request.raw.method,
      headers: request.headers,
      cookies: request.cookies
    })
    const registerDto = RegisterDTO.fromRequest(request)
    const sessionToken = await serviceLocator.authService().register(registerDto)
    log.debug('Setting Response Cookie.', {
      sessionToken
    })
    AuthController._setAuthenticationCookie(reply, sessionToken)
    return {sessionToken}
  }

  static async login(request, reply) {
    const loginDto = LoginDTO.fromRequest(request)

    try {
      const sessionToken = await serviceLocator.authService().login(loginDto)
      AuthController._setAuthenticationCookie(reply, sessionToken)
      return {sessionToken}
    } catch (err) {
      throw Boom.unauthorized(err.message)
    }
  }

  static async refresh(request, reply) {
    const token = request.cookies.sid
    try {
      const sessionToken = await serviceLocator.authService().refresh(token)
      AuthController._setAuthenticationCookie(reply, sessionToken)
      return {sessionToken}
    } catch (err) {
      throw Boom.unauthorized(err.message)
    }
  }

  static _setAuthenticationCookie(reply, sessionToken) {
    reply.setCookie('sid', sessionToken, {httpOnly: false, secure: false, sameSite: false})
  }
}

module.exports = AuthController

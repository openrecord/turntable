import Boom from 'boom'
import _ from 'lodash'

import {RegisterDTO} from './dtos/RegisterDTO'
import {LoginDTO} from './dtos/LoginDTO'
import serviceLocator from '../../services/serviceLocator'
import {log} from '../../util/logger'

/**
 * TODO: Figure out better way to map errors in service layer to controller errors.
 * TODO: Prevent against CSRF attacks. @see https://www.acunetix.com/websitesecurity/csrf-attacks/
 */

export class AuthController {
  static async register(request, reply) {
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
    // Note: May need to play with httpOnly, secure, and sameSite options.
    reply.setCookie('sid', sessionToken, {path: '/'})
  }
}

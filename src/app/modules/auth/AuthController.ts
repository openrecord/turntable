import Boom from 'boom'
import _ from 'lodash'

import {RegisterDTO} from './dtos/RegisterDTO'
import {LoginDTO} from './dtos/LoginDTO'
import serviceLocator from '../../services/serviceLocator'
import {log} from '../../util/logger'
import {AuthService} from '../../services/auth/AuthService'

/**
 * TODO: Figure out better way to map errors in service layer to controller errors.
 * TODO: Prevent against CSRF attacks. @see https://www.acunetix.com/websitesecurity/csrf-attacks/
 */

export const AuthController = {
  async register(authService: AuthService, request, reply) {
    const registerDto = RegisterDTO.fromRequest(request)
    const sessionToken = await authService.register(registerDto)
    log.debug('Setting Response Cookie.', {
      sessionToken
    })
    AuthController._setAuthenticationCookie(reply, sessionToken)
    return {sessionToken}
  },

  async login(authService: AuthService, request, reply) {
    const loginDto = LoginDTO.fromRequest(request)

    try {
      const sessionToken = await authService.login(loginDto)
      AuthController._setAuthenticationCookie(reply, sessionToken)
      return {sessionToken}
    } catch (err) {
      throw Boom.unauthorized(err.message)
    }
  },

  async refresh(authService: AuthService, request, reply) {
    const token = request.cookies.sid
    try {
      const sessionToken = await authService.refresh(token)
      AuthController._setAuthenticationCookie(reply, sessionToken)
      return {sessionToken}
    } catch (err) {
      throw Boom.unauthorized(err.message)
    }
  },

  _setAuthenticationCookie(reply, sessionToken) {
    // Note: May need to play with httpOnly, secure, and sameSite options.
    reply.setCookie('sid', sessionToken, {path: '/'})
  }
}

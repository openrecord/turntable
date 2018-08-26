import {LoginDTO} from './dtos/LoginDTO'
import {RegisterDTO} from './dtos/RegisterDTO'
import {AuthController} from './AuthController'
import {AuthService} from '../../services/auth/AuthService'
import {bindDependencies} from '../../dependencies/utils'

export default [
  {
    method: 'POST',
    path: '/auth/register',
    schema: RegisterDTO.schema,
    handler: AuthController.register
  },
  {
    method: 'POST',
    path: '/auth/token',
    schema: LoginDTO.schema,
    handler: bindDependencies(AuthController.login, AuthService)
  },
  {
    method: 'GET',
    path: '/auth/token',
    handler: bindDependencies(AuthController.refresh, AuthService)
  }
]

import {LoginDTO} from './dtos/LoginDTO'
import {RegisterDTO} from './dtos/RegisterDTO'
import {AuthController} from './AuthController'

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
    handler: AuthController.login
  },
  {
    method: 'GET',
    path: '/auth/token',
    handler: AuthController.refresh
  }
]

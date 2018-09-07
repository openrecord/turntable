import {injectable} from 'inversify'
import {User} from './User.schema'
import {BaseDao} from '../common/BaseDao'

@injectable()
export class UserDao extends BaseDao<User> {
  entityClass = User
}

import {TYPES} from '../../dependencies/types'
import {injectable, inject} from 'inversify'
import {Dao} from '../common/BaseDao'
import {User} from './User.schema'

@injectable()
export class UserService {
  @inject(TYPES.UserDao)
  private dao: Dao<User>

  /**
   * @param {string} email
   * @param {string} hashedPassword
   * @return {Promise<User>}
   */
  async create(email, hashedPassword) {
    return this.dao.create({email, hashedPassword})
  }

  /**
   * @param {int} id
   * @return {Promise<User>}
   */
  async getById(id) {
    return this.dao.findOne({id})
  }

  /**
   * @param {string} email
   * @return {Promise<User>}
   */
  async getByEmail(email) {
    return this.dao.findOne({email})
  }
}

const serviceLocator = require('../serviceLocator.ts')

class UserService {
  constructor() {
    this._dao = serviceLocator.userDao()
  }

  /**
   * @param {string} email
   * @param {string} hashedPassword
   * @return {Promise<User>}
   */
  async create(email, hashedPassword) {
    return this._dao.create({email, hashedPassword})
  }

  /**
   * @param {int} id
   * @return {Promise<User>}
   */
  async getById(id) {
    return this._dao.findOne({id})
  }

  /**
   * @param {string} email
   * @return {Promise<User>}
   */
  async getByEmail(email) {
    return this._dao.findOne({email})
  }
}

module.exports = UserService

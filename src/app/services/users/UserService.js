const config = require('config')

const log = require('../../util/logger')
const serviceLocator = require('../serviceLocator')

class UserService {
  constructor() {
    this._dao = serviceLocator.userDao()
  }

  /**
   * @param {object} obj
   * @return {Promise<User>}
   */
  async create(obj) {
    return this._dao.create(obj)
  }
}

module.exports = UserService

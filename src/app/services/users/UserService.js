const config = require('config')

const log = require('../../util/logger')
const serviceLocator = require('../serviceLocator')

class UserService {
  constructor() {
    this._dao = serviceLocator.userDao()
  }

  async create(user) {}
}

module.exports = UserService

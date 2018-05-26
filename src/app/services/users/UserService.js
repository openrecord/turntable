const serviceLocator = require('../serviceLocator')

class UserService {
  constructor() {
    this._dao = serviceLocator.userDao()
  }

  /**
   * @param {RegisterDTO} registerDto
   * @param {string} hashedPassword
   * @return {Promise<User>}
   */
  async register(registerDto, hashedPassword) {
    return this._dao.create({
      email: registerDto.email,
      hashedPassword
    })
  }
}

module.exports = UserService

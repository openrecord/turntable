class ServiceLocator {
  /**
   * @param {Object} override
   * @returns {UserDao}
   */
  userDao(override = null) {
    return this._resolveService('_userDao', './users/UserDao', override)
  }

  /**
   * @param {Object} override
   * @returns {UserService}
   */
  userService(override = null) {
    return this._resolveService('_userService', './users/UserService', override)
  }

  /**
   * Resolves the service in serviceLocator.
   * @param {String} serviceKey - Key to set on ServiceLocator.
   * @param {String} requirePath - Path to the service class file.
   * @param [override=null] - Set the service instance to override.
   * @return {*}
   * @private
   */
  _resolveService(serviceKey, requirePath, override = null) {
    if (override) {
      this[serviceKey] = override
    } else if (!this[serviceKey]) {
      const Class = require(requirePath)
      this[serviceKey] = new Class()
    }
    return this[serviceKey]
  }
}

const instance = new ServiceLocator()
module.exports = instance

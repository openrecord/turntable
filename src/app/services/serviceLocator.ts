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
   * @param {Object} override
   * @returns {AuthService}
   */
  authService(override = null) {
    return this._resolveService('_authService', './auth/AuthService', override)
  }

  /**
   * @param {Object} override
   * @returns {PlaylistService}
   */
  playlistService(override = null) {
    return this._resolveService('_playlistService', './playlists/PlaylistService', override)
  }

  /**
   * @param {Object} override
   * @returns {PlaylistDao}
   */
  playlistDao(override = null) {
    return this._resolveService('_playlistDao', './playlists/PlaylistDao', override)
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
export default new ServiceLocator()

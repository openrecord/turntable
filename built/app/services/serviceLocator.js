'use strict'
Object.defineProperty(exports, '__esModule', {value: true})
var ServiceLocator = /** @class */ (function() {
  function ServiceLocator() {}
  /**
   * @param {Object} override
   * @returns {UserDao}
   */
  ServiceLocator.prototype.userDao = function(override) {
    if (override === void 0) {
      override = null
    }
    return this._resolveService('_userDao', './users/UserDao', override)
  }
  /**
   * @param {Object} override
   * @returns {UserService}
   */
  ServiceLocator.prototype.userService = function(override) {
    if (override === void 0) {
      override = null
    }
    return this._resolveService('_userService', './users/UserService', override)
  }
  /**
   * @param {Object} override
   * @returns {AuthService}
   */
  ServiceLocator.prototype.authService = function(override) {
    if (override === void 0) {
      override = null
    }
    return this._resolveService('_authService', './auth/AuthService', override)
  }
  /**
   * @param {Object} override
   * @returns {PlaylistService}
   */
  ServiceLocator.prototype.playlistService = function(override) {
    if (override === void 0) {
      override = null
    }
    return this._resolveService('_playlistService', './playlists/PlaylistService', override)
  }
  /**
   * @param {Object} override
   * @returns {PlaylistDao}
   */
  ServiceLocator.prototype.playlistDao = function(override) {
    if (override === void 0) {
      override = null
    }
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
  ServiceLocator.prototype._resolveService = function(serviceKey, requirePath, override) {
    if (override === void 0) {
      override = null
    }
    if (override) {
      this[serviceKey] = override
    } else if (!this[serviceKey]) {
      var Class = require(requirePath)
      this[serviceKey] = new Class()
    }
    return this[serviceKey]
  }
  return ServiceLocator
})()
exports.default = new ServiceLocator()

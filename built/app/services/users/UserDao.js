var __extends =
  (this && this.__extends) ||
  (function() {
    var extendStatics =
      Object.setPrototypeOf ||
      ({__proto__: []} instanceof Array &&
        function(d, b) {
          d.__proto__ = b
        }) ||
      function(d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]
      }
    return function(d, b) {
      extendStatics(d, b)
      function __() {
        this.constructor = d
      }
      d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __())
    }
  })()
var config = require('config')
var log = require('../../util/logger')
var User = require('./User')
var BaseDao = require('../common/BaseDao')
var UserDao = /** @class */ (function(_super) {
  __extends(UserDao, _super)
  function UserDao() {
    return (_super !== null && _super.apply(this, arguments)) || this
  }
  UserDao.prototype.entityClass = function() {
    return User
  }
  return UserDao
})(BaseDao)
module.exports = UserDao

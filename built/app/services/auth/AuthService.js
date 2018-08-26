'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : new P(function(resolve) {
              resolve(result.value)
            }).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __generator =
  (this && this.__generator) ||
  function(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
          if (t[0] & 1) throw t[1]
          return t[1]
        },
        trys: [],
        ops: []
      },
      f,
      y,
      t,
      g
    return (
      (g = {next: verb(0), throw: verb(1), return: verb(2)}),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function() {
          return this
        }),
      g
    )
    function verb(n) {
      return function(v) {
        return step([n, v])
      }
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.')
      while (_)
        try {
          if (((f = 1), y && (t = y[op[0] & 2 ? 'return' : op[0] ? 'throw' : 'next']) && !(t = t.call(y, op[1])).done)) return t
          if (((y = 0), t)) op = [0, t.value]
          switch (op[0]) {
            case 0:
            case 1:
              t = op
              break
            case 4:
              _.label++
              return {value: op[1], done: false}
            case 5:
              _.label++
              y = op[1]
              op = [0]
              continue
            case 7:
              op = _.ops.pop()
              _.trys.pop()
              continue
            default:
              if (!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) && (op[0] === 6 || op[0] === 2)) {
                _ = 0
                continue
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1]
                break
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1]
                t = op
                break
              }
              if (t && _.label < t[2]) {
                _.label = t[2]
                _.ops.push(op)
                break
              }
              if (t[2]) _.ops.pop()
              _.trys.pop()
              continue
          }
          op = body.call(thisArg, _)
        } catch (e) {
          op = [6, e]
          y = 0
        } finally {
          f = t = 0
        }
      if (op[0] & 5) throw op[1]
      return {value: op[0] ? op[1] : void 0, done: true}
    }
  }
Object.defineProperty(exports, '__esModule', {value: true})
var config = require('config')
var argon2 = require('argon2')
var jwt = require('jsonwebtoken')
var log = require('../../util/logger')
var serviceLocator = require('../serviceLocator')
var SECRET = config.auth.jwtSecret
var ONE_WEEK = 604800 // One week in minutes
var AuthService = /** @class */ (function() {
  function AuthService() {
    this._userService = serviceLocator.userService()
  }
  /**
   * Register a new user and return JWT.
   * @param {RegisterDTO} registerDto
   * @return {Promise<string>} - JWT containing user id.
   */
  AuthService.prototype.register = function(registerDto) {
    return __awaiter(this, void 0, void 0, function() {
      var hashedPassword, user
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, AuthService.hashPassword(registerDto.password)]
          case 1:
            hashedPassword = _a.sent()
            return [4 /*yield*/, this._userService.create(registerDto.email, hashedPassword)]
          case 2:
            user = _a.sent()
            return [2 /*return*/, this._jwt(user)]
        }
      })
    })
  }
  /**
   * Login a user and return JWT.
   * @param {LoginDTO} loginDto
   * @return {Promise<string>} - JWT containing user id.
   */
  AuthService.prototype.login = function(loginDto) {
    return __awaiter(this, void 0, void 0, function() {
      var user, verified
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, this._userService.getByEmail(loginDto.email)]
          case 1:
            user = _a.sent()
            if (!user) {
              throw new Error('Could not find user by email.')
            }
            return [4 /*yield*/, AuthService.verifyPassword(user.hashedPassword, loginDto.password)]
          case 2:
            verified = _a.sent()
            if (!verified) {
              throw new Error('User password does not match.')
            }
            return [2 /*return*/, this._jwt(user)]
        }
      })
    })
  }
  /**
   * Given a valid token, return a new token.
   * @param {string} token - Existing valid token.
   * @return {Promise<string>} - JWT containing user id.
   */
  AuthService.prototype.refresh = function(token) {
    return __awaiter(this, void 0, void 0, function() {
      var userId, user
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, AuthService.decodeToken(token)]
          case 1:
            userId = _a.sent().userId
            return [4 /*yield*/, this._userService.getById(userId)]
          case 2:
            user = _a.sent()
            if (!user) {
              throw new Error('Could not find user by id.')
            }
            return [2 /*return*/, this._jwt(user)]
        }
      })
    })
  }
  /**
   * Return hashed password.
   * @param {string} password - plaintext password.
   * @return {string} - hashed password.
   */
  AuthService.hashPassword = function(password) {
    return __awaiter(this, void 0, void 0, function() {
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, argon2.hash(password)]
          case 1:
            return [2 /*return*/, _a.sent()]
        }
      })
    })
  }
  AuthService.verifyPassword = function(hash, password) {
    return __awaiter(this, void 0, void 0, function() {
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, argon2.verify(hash, password)]
          case 1:
            return [2 /*return*/, _a.sent()]
        }
      })
    })
  }
  AuthService.decodeToken = function(token) {
    return __awaiter(this, void 0, void 0, function() {
      return __generator(this, function(_a) {
        try {
          return [2 /*return*/, jwt.verify(token, SECRET)]
        } catch (err) {
          throw new Error('Invalid token.')
        }
        return [2 /*return*/]
      })
    })
  }
  /**
   * Generate a JWT for the user.
   * @param {User} user
   * @param {int} [expMins = 604800] - Minutes until expiration. Defaults to one week.
   * @return {string} - JWT containing user id.
   * @private
   */
  AuthService.prototype._jwt = function(user, expMins) {
    if (expMins === void 0) {
      expMins = ONE_WEEK
    }
    return jwt.sign({userId: user.id}, SECRET, {
      expiresIn: expMins + 'm'
    })
  }
  return AuthService
})()
exports.AuthService = AuthService

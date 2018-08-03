const faker = require('faker')
const _ = require('lodash')

const CreatePlaylistDTO = require('../../../app/modules/playlists/dtos/CreatePlaylistDTO')
const RegisterDTO = require('../../../app/modules/auth/dtos/RegisterDTO')
const AuthService = require('../../../app/services/auth/AuthService')
const User = require('../../../app/services/users/User')

class MockFactory {
  /**
   * @param {boolean|object|object[]} [props]
   * @param {boolean} [persistToDb = true]
   * @return {Promise<User>|Promise<User[]>}
   */
  static async user(props = {}, persistToDb = true) {
    if (props.password) {
      props.hashedPassword = await AuthService.hashPassword(props.password)
      delete props.password
    }

    const defaults = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      hashedPassword: faker.internet.password()
    }

    const UserDao = require('../../../app/services/users/UserDao')
    return this._mock(defaults, new UserDao(), props, persistToDb)
  }

  /**
   * @param {boolean|object|object[]} [props]
   * @param {boolean} [persistToDb = true]
   * @return {Promise<Playlist>|Promise<Playlist[]>}
   */
  static playlist(props = {}, persistToDb = true) {
    const defaults = {
      name: faker.random.words()
    }

    const PlaylistDao = require('../../../app/services/playlists/PlaylistDao')
    return this._mock(defaults, new PlaylistDao(), props, persistToDb)
  }

  /**
   * @return {RegisterDTO}
   */
  static registerDto() {
    return new RegisterDTO(faker.internet.userName(), faker.internet.email(), faker.internet.password())
  }

  /**
   * @return {CreatePlaylistDTO}
   */
  static createPlaylistDTO() {
    return new CreatePlaylistDTO(faker.random.words())
  }

  /**
   * Merge defaults into objects, then create the VOs, then save to db if necessary.
   * @param {object|function} defaults - Object with default props. If a function is provided, it will be called to generate the defaults for each object.
   * @param {BaseDao} dao
   * @param {object|object[]|boolean} [objects] - The optional object or array of objects to mock.
   * @param {boolean} [persistToDb = true] - If present, will persist to the database
   * @return {object|object[]|Promise<object>|Promise<object[]>}
   */
  static async _mock(defaults = {}, dao, objects, persistToDb = true) {
    if (_.isBoolean(objects)) {
      persistToDb = objects
      objects = {}
    }

    const ObjectClass = dao.entityClass()

    let dummies = _.castArray(objects)
      .map(obj => _.defaults(obj, _.isFunction(defaults) ? defaults() : defaults))
      .map(obj => Object.assign(new ObjectClass(), obj))

    if (persistToDb) {
      dummies = await Promise.all(dummies.map(d => dao.create(d)))
    }

    return dummies.length === 1 ? dummies[0] : dummies
  }
}

module.exports = MockFactory

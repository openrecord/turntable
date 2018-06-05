const faker = require('faker')
const _ = require('lodash')

const CreatePlaylistDTO = require('../../../app/modules/playlists/dtos/CreatePlaylistDTO')
const RegisterDTO = require('../../../app/modules/auth/dtos/RegisterDTO')
const User = require('../../../app/services/users/User')

class MockFactory {
  /**
   * @param {object|object[]} props
   * @param {boolean} [persistToDb = true]
   * @return {User|User[]|User<Playlist>|Promise<User[]>}
   */
  static user(props = {}, persistToDb = true) {
    const UserDao = require('../../../app/services/users/UserDao')

    const defaults = _.defaults(props, {
      email: faker.internet.email(),
      hashedPassword: faker.internet.password()
    })

    return this._mock(props, defaults, new UserDao(), persistToDb)
  }

  /**
   * @param {object|object[]} props
   * @param {boolean} [persistToDb = true]
   * @return {Playlist|Playlist[]|Promise<Playlist>|Promise<Playlist[]>}
   */
  static playlist(props = {}, persistToDb = true) {
    const PlaylistDao = require('../../../app/services/playlists/PlaylistDao')

    const defaults = _.defaults(props, {
      name: faker.random.words()
    })

    return this._mock(props, defaults, new PlaylistDao(), persistToDb)
  }

  /**
   * @return {RegisterDTO}
   */
  static registerDto() {
    return new RegisterDTO(faker.internet.email(), faker.internet.password())
  }

  /**
   * @return {CreatePlaylistDTO}
   */
  static createPlaylistDTO() {
    return new CreatePlaylistDTO(faker.random.words())
  }

  /**
   * Merge defaults into objects, then create the VOs, then save to db if necessary.
   * @param {object|object[]} objects
   * @param {object|function} defaults - Object with default props. If a function is provided, it will be called to generate the defaults for each object.
   * @param {BaseDao} dao
   * @param {boolean} [persistToDb = true] - If present, will persist to the database
   * @return {object|object[]|Promise<object>|Promise<object[]>}
   */
  static async _mock(objects, defaults = {}, dao, persistToDb = true) {
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

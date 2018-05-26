const faker = require('faker')
const _ = require('lodash')

const CreatePlaylistDTO = require('../../../app/modules/playlists/dtos/CreatePlaylistDTO')
const RegisterDTO = require('../../../app/modules/auth/dtos/RegisterDTO')
const User = require('../../../app/services/users/User')
const Playlist = require('../../../app/services/playlists/Playlist')

class MockFactory {
  /**
   * @param {object} [props]
   * @return {User}
   */
  static user(props = {}) {
    props = _.defaults(props, {
      email: faker.internet.email(),
      hashedPassword: faker.internet.password()
    })

    return Object.assign(new User(), props)
  }

  /**
   * @param {object} [props]
   * @return {Playlist}
   */
  static playlist(props = {}) {
    props = _.defaults(props, {
      name: faker.random.words()
    })

    return Object.assign(new Playlist(), props)
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
}

module.exports = MockFactory

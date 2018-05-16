const faker = require('faker')
const _ = require('lodash')

const RegisterDTO = require('../../../app/modules/auth/dtos/RegisterDTO')
const User = require('../../../app/services/users/User')

class MockFactory {
  /**
   * @param {object} props
   * @return {User}
   */
  static user(props) {
    props = _.defaults(props, {
      email: faker.internet.email(),
      hashedPassword: faker.internet.password()
    })

    const user = Object.assign(new User(), props)
    return user
  }

  /**
   * @return {RegisterDTO}
   */
  static registerDto() {
    return new RegisterDTO(faker.internet.email(), faker.internet.password())
  }
}

module.exports = MockFactory

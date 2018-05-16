const User = require('./User')

class UserFactory {
  fromRegisterRequest(request) {
    const {email, password} = request.body
    return new User(null, email, password)
  }
}

module.exports = UserFactory

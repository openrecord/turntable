class RegisterDTO {
  constructor(username, email, password) {
    this.username = username
    this.email = email
    this.password = password
  }

  static fromRequest(request) {
    const {username, email, password} = request.body
    return new this(username, email, password)
  }

  static get schema() {
    return {
      body: {
        type: 'object',
        properties: {
          username: {type: 'string'},
          email: {type: 'string'},
          password: {type: 'string'}
        },
        required: ['email', 'password']
      }
    }
  }
}

module.exports = RegisterDTO

export class LoginDTO {
  email: string
  password: string

  constructor(email: string, password: string) {
    this.email = email
    this.password = password
  }

  static fromRequest(request) {
    const {email, password} = request.body
    return new this(email, password)
  }

  static get schema() {
    return {
      body: {
        type: 'object',
        properties: {
          email: {type: 'string'},
          password: {type: 'string'}
        },
        required: ['email', 'password']
      }
    }
  }
}

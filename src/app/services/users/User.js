class User {
  constructor(id, username, email, hashedPassword) {
    this.id = id
    this.username = username
    this.email = email
    this.hashedPassword = hashedPassword
  }
}

module.exports = User

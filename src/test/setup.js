const db = require('../app/services/database')

module.exports = async () => db.sync()

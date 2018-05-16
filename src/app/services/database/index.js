const config = require('config')
const path = require('path')
const typeorm = require('typeorm')

/** @type {Connection} */
let connection = null

/**
 * @return {Promise<Connection>}
 */
async function connect() {
  if (!connection) {
    connection = await typeorm.createConnection({
      type: 'mysql',
      host: config.db.host,
      port: config.db.port,
      username: config.db.username,
      password: config.db.password,
      database: 'openrecord_test',
      synchronize: true,
      logging: config.db.logging,
      logger: 'advanced-console',
      entities: [path.join(__dirname, 'schemas/*.js')]
    })
  }

  return connection
}

async function close() {
  return connection.close()
}

module.exports = {
  connect,
  close
}

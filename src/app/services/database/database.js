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
      database: config.db.database,
      logging: config.db.logging,
      logger: 'advanced-console',
      entities: [path.join(__dirname, '..', '**/*Schema.js')],
      synchronize: process.env.NODE_ENV !== 'prod' && config.db.synchronize // NEVER sync in prod
    })
  }

  return connection
}

async function close() {
  return connection && connection.close()
}

module.exports = {
  connect,
  close
}

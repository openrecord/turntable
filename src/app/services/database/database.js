const config = require('config')
const path = require('path')
const typeorm = require('typeorm')

const util = require('../../util/util')

/** @type {Connection} */
let connection = null

/**
 * @return {Promise<Connection>}
 */
async function connect() {
  if (!connection) {
    connection = await typeorm.createConnection({
      ...config.db.write,
      username: config.db.write.user,
      type: 'mysql',
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

async function sync(force = false) {
  if (!util.isDevEnvironment() && !force) {
    throw new Error('Can only sync database in a development environment.')
  }

  const conn = await connect()
  await conn.synchronize()
  await conn.close()
}

module.exports = {
  connect,
  close,
  sync
}

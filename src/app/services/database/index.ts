const config = require('config')
import * as path from 'path'
import {createConnection} from 'typeorm'

import * as util from '../../util/util'

/** @type {Connection} */
let connection = null

/**
 * @return {Promise<Connection>}
 */
export async function connect() {
  if (!connection) {
    connection = await createConnection({
      ...config.db.write,
      username: config.db.write.user,
      type: 'mysql',
      logger: 'advanced-console',
      entities: [path.join(__dirname, '..', '**/*.schema.js')],
      synchronize: process.env.NODE_ENV !== 'prod' && config.db.write.synchronize // NEVER sync in prod
    })
  }

  return connection
}

export async function close() {
  return connection && connection.close()
}

export async function sync(force = false) {
  if (!util.isDevEnvironment() && !force) {
    throw new Error('Can only sync database in a development environment.')
  }

  const conn = await connect()
  await conn.synchronize()
  await conn.close()
}

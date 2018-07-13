#!/usr/bin/env node

const ENV = process.env.NODE_ENV
const FORCE = ['-f', '--force'].includes(process.argv[2])

if (!['test', 'dev'].includes(ENV) && !FORCE) {
  console.error('Can only synchronize test or development databases.')
  process.exit(1)
}

const {connect} = require('../../src/app/services/database/index')

async function sync() {
  const conn = await connect()
  await conn.synchronize()
  await conn.close()
}

console.info('Synchronizing database: ' + ENV)
sync()

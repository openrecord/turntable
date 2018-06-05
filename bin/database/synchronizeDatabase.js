#!/usr/bin/env node

if (!['test', 'dev'].includes(process.env.NODE_ENV)) {
  console.error('Can only synchronize test or development databases.')
  process.exit(1)
}

const {connect} = require('../../src/app/services/database/index')

async function sync() {
  const conn = await connect()
  await conn.synchronize()
  await conn.close()
}

sync()

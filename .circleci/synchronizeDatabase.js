#!/usr/bin/env node

if (process.env.NODE_ENV !== 'test') {
  console.log('Overriding NODE_ENV to "test"')
  process.env.NODE_ENV = 'test'
}

const {connect} = require('../src/app/services/database')

async function sync() {
  const conn = await connect()
  await conn.synchronize()
  await conn.close()
}

sync()

#!/usr/bin/env node

const {connect, close} = require('../src/app/services/database')

if (process.env.NODE_ENV !== 'test') {
  console.log('Overriding NODE_ENV to "test"')
  process.env.NODE_ENV = 'test'
}

async function sync() {
  const conn = await connect()
  await conn.synchronize()
  await conn.close()
}

sync()

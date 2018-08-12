#!/usr/bin/env node

const config = require('config')
const mysql = require('mysql2')
const fs = require('fs')
const path = require('path')

const ENV = process.env.NODE_ENV || 'dev'
const FORCE = ['-f', '--force'].includes(process.argv[2])

const environments = ['prod', 'staging', 'dev']
if (!environments.includes(ENV)) {
  console.error(`NODE_ENV must be one of: ${environments.join(',')}`)
  process.exit(1)
}

if (ENV !== 'dev' || FORCE) {
  console.error('Can only setup development database.')
  process.exit(1)
}

setup()

async function setup() {
  const conn = connect()
  try {
    await executeMysqlScript(conn)
    conn.end()
  } catch (err) {
    console.error(`Could not initialize database. [${err.message}]`)
    process.exit(1)
  }
}

function connect() {
  console.info('Connecting to setup database.')
  return mysql.createConnection(config.db.setup)
}

function executeMysqlScript(connection) {
  const sqlFile = getMysqlScript()
  console.info(`Executing mysql script: ${path.basename(sqlFile)}`)
  return fs.readFileSync(sqlFile, 'utf8')
}

function getMysqlScript() {
  return path.join(__dirname, `setup_database.${ENV}.sql`)
}

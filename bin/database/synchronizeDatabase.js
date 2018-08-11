#!/usr/bin/env node

const db = require('../../src/app/services/database')

const FORCE = ['-f', '--force'].includes(process.argv[2])

const environments = ['prod', 'staging', 'dev', undefined]
if (!environments.includes(process.env.NODE_ENV)) {
  console.error(`NODE_ENV must be one of: ${environments.join(',')}`)
  process.exit(1)
}

db.sync(FORCE)

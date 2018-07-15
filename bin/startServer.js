#!/usr/bin/env node
const config = require('config')
const server = require('../src/app/server')

const port = config.serverless.port
server.listen(port, 'localhost', err => {
  console.log('Listening on ' + port)
})

#!/usr/bin/env node

const server = require('../src/app/server')

const PORT = 3099

server.listen(PORT, 'localhost', err => {
  console.log('Listening on ' + PORT)
})

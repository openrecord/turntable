const fastify = require('fastify')

const server = fastify()

// Declare a route
server.get('/', (request, reply) => {
  reply.send({hello: 'world'})
})

module.exports = server

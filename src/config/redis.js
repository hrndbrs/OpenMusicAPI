const { createClient } = require('redis')

const client = createClient({
  socket: {
    host: process.env.REDIS_SERVER,
    port: process.env.REDIS_PORT
  }
})

client.on('error', err => console.log('Redis Client Error', err))

module.exports = client

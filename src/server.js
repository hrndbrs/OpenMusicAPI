if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const Hapi = require('@hapi/hapi')

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*']
      }
    }
  })

  await server.start()
  console.log('Running on', server.info.uri)
}

init()

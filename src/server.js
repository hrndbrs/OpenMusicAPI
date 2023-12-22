if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const Hapi = require('@hapi/hapi')
const albums = require('./api/albums')
const AlbumService = require('./services/albumService')
const albumsValidator = require('./validator/albums')

const init = async () => {
  const albumService = new AlbumService()
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*']
      }
    }
  })

  await server.register([
    {
      plugin: albums,
      options: {
        service: albumService,
        validator: albumsValidator
      }
    }
  ])

  await server.start()
  console.log('Running on', server.info.uri)
}

init()

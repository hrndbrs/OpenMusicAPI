if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const Hapi = require('@hapi/hapi')
const albums = require('./api/albums')
const songs = require('./api/songs')
const AlbumService = require('./services/albumService')
const SongService = require('./services/songService')
const validator = require('./validator')

const init = async () => {
  const albumService = new AlbumService()
  const songService = new SongService()
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
        validator
      }
    },
    {
      plugin: songs,
      options: {
        service: songService,
        validator
      }
    }
  ])

  await server.start()
  console.log('Running on', server.info.uri)
}

init()

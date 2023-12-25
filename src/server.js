require('dotenv').config()

const Hapi = require('@hapi/hapi')
const albums = require('./api/albums')
const songs = require('./api/songs')
const AlbumService = require('./services/albumService')
const SongService = require('./services/songService')
const validator = require('./validator')
const { ClientError } = require('./lib/error')

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

  server.ext('onPreResponse', (req, h) => {
    const { response } = req

    if (response instanceof Error) {
      let statusCode = 500
      const options = {
        status: 'error',
        message: 'Internal server error'
      }

      if (response instanceof ClientError) {
        options.status = 'fail'
        options.message = response.message
        statusCode = response.status
      }

      if (!response.isServer) {
        options.status = 'fail'
        options.message = response.message
        statusCode = response.output.statusCode
      }

      const res = h.response(options)
      res.code(statusCode)
      return res
    }
    return h.continue
  })

  await server.start()
  console.log('Running on', server.info.uri)
}

init()

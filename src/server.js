require('dotenv').config()

const Hapi = require('@hapi/hapi')
const jwt = require('@hapi/jwt')
const inert = require('@hapi/inert')

const AlbumService = require('./services/albumService')
const SongService = require('./services/songService')
const UserService = require('./services/userService')
const PlaylistService = require('./services/playlistService')
const CollaborationService = require('./services/collaborationService')
const ProducerService = require('./services/producerService')
const CacheService = require('./services/cacheService')
const UploadService = require('./services/uploadService')

const redisClient = require('./config/redis')
const routePlugins = require('./api')
const validator = require('./validator')

const tokenManager = require('./lib/jwt')
const { ClientError } = require('./lib/error')
const Constant = require('./lib/constants')

const init = async () => {
  await redisClient.connect()

  const cacheService = new CacheService(redisClient)
  const albumService = new AlbumService()
  const songService = new SongService()
  const userService = new UserService()
  const collaborationService = new CollaborationService()
  const playlistService = new PlaylistService(collaborationService)
  const producerService = new ProducerService()
  const uploadService = new UploadService()

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*']
      }
    }
  })

  await server.register([jwt, inert])

  server.auth.strategy(Constant.JWT_STRATEGY_NAME, 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: 1000 * 60
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id
      }
    })
  })

  await server.register(routePlugins({
    services: {
      albumService,
      cacheService,
      songService,
      producerService,
      userService,
      playlistService,
      collaborationService,
      uploadService
    },
    validator,
    tokenManager
  }))

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

require('dotenv').config()

const Hapi = require('@hapi/hapi')
const jwt = require('@hapi/jwt')
const users = require('./api/users')
const albums = require('./api/albums')
const songs = require('./api/songs')
const auth = require('./api/auth')
const playlists = require('./api/playlists')
const AlbumService = require('./services/albumService')
const SongService = require('./services/songService')
const UserService = require('./services/userService')
const PlaylistService = require('./services/playlistService')
const validator = require('./validator')
const tokenManager = require('./lib/jwt')
const { ClientError } = require('./lib/error')
const { JWT_STRATEGY_NAME } = require('./lib/constants')

const init = async () => {
  const albumService = new AlbumService()
  const songService = new SongService()
  const userService = new UserService()
  const playlistService = new PlaylistService()

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*']
      }
    }
  })

  await server.register(jwt)

  server.auth.strategy(JWT_STRATEGY_NAME, 'jwt', {
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
    },
    {
      plugin: users,
      options: {
        service: userService,
        validator
      }
    },
    {
      plugin: auth,
      options: {
        service: userService,
        validator,
        tokenManager
      }
    },
    {
      plugin: playlists,
      options: {
        playlistService,
        songService,
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

const users = require('./users')
const albums = require('./albums')
const songs = require('./songs')
const auth = require('./auth')
const playlists = require('./playlists')
const collaborations = require('./collaborations')
const fexports = require('./exports')
const upload = require('./upload')

module.exports = ({
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
}) => [{
  plugin: albums,
  options: {
    albumService,
    cacheService,
    uploadService,
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
},
{
  plugin: collaborations,
  options: {
    playlistService,
    collaborationService,
    validator
  }
},
{
  plugin: fexports,
  options: {
    producerService,
    playlistService,
    validator
  }
},
{
  plugin: upload
}]

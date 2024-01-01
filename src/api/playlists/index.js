const PlaylistsRouteHandler = require('./handler')
const routes = require('./routes')

module.exports = {
  name: 'playlists',
  version: '0.0.1',
  register: (server, { playlistService, songService, validator }) => {
    const playlistsRouteHandler = new PlaylistsRouteHandler(playlistService, songService, validator)
    server.route(routes(playlistsRouteHandler))
  }
}

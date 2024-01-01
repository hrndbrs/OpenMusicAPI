const PlaylistsRouteHandler = require('./handler')
const routes = require('./routes')

module.exports = {
  name: 'playlists',
  version: '0.0.1',
  register: (server, { service, validator }) => {
    const playlistsRouteHandler = new PlaylistsRouteHandler(service, validator)
    server.route(routes(playlistsRouteHandler))
  }
}

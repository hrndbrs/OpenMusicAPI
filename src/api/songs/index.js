const SongsRouteHandler = require('./handler')
const routes = require('./routes')

module.exports = {
  name: 'songs',
  version: '0.0.1',
  register: (server, { service, validator }) => {
    const albumsRouteHandler = new SongsRouteHandler(service, validator)
    server.route(routes(albumsRouteHandler))
  }
}

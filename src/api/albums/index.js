const AlbumsRouteHandler = require('./handler')
const routes = require('./routes')

module.exports = {
  name: 'albums',
  version: '0.0.1',
  register: (server, { service, validator }) => {
    const albumsRouteHandler = new AlbumsRouteHandler(service, validator)
    server.route(routes(albumsRouteHandler))
  }
}

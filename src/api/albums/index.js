const AlbumsRouteHandler = require('./handler')
const routes = require('./routes')

module.exports = {
  name: 'albums',
  version: '0.0.1',
  register: (server, { albumService, cacheService, uploadService, validator }) => {
    const albumsRouteHandler = new AlbumsRouteHandler(albumService, cacheService, uploadService, validator)
    server.route(routes(albumsRouteHandler))
  }
}

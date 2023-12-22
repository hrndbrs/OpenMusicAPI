const AlbumsHandler = require('./handler')
const routes = require('./routes')

module.exports = {
  name: 'albums',
  version: '0.0.1',
  register: (server, { service, validator }) => {
    const albumsHandler = new AlbumsHandler(service, validator)
    server.route(routes(albumsHandler))
  }
}

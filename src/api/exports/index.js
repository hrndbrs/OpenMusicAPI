const ExportsRouteHandler = require('./handler')
const routes = require('./routes')

module.exports = {
  name: 'exports',
  version: '0.0.1',
  register: async (server, { producerService, playlistService, validator }) => {
    const exportsRouteHandler = new ExportsRouteHandler(producerService, playlistService, validator)
    server.route(routes(exportsRouteHandler))
  }
}

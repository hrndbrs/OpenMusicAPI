const CollaborationsRouteHandler = require('./handler')
const routes = require('./routes')

module.exports = {
  name: 'collaborations',
  version: '0.0.1',
  register: (server, { collaborationService, playlistService, validator }) => {
    const collaborationsRouteHandler = new CollaborationsRouteHandler(collaborationService, playlistService, validator)
    server.route(routes(collaborationsRouteHandler))
  }
}

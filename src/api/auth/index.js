const AuthRouteHandler = require('./handler')
const routes = require('./routes')

module.exports = {
  name: 'authentications',
  version: '0.0.1',
  register: (server, { service, validator, tokenManager }) => {
    const authRouteHandler = new AuthRouteHandler(service, validator, tokenManager)
    server.route(routes(authRouteHandler))
  }
}

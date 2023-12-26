const UsersRouteHandler = require('./handler')
const routes = require('./routes')

module.exports = {
  name: 'users',
  version: '0.0.1',
  register: (server, { service, validator }) => {
    const usersRouteHandler = new UsersRouteHandler(service, validator)
    server.route(routes(usersRouteHandler))
  }
}

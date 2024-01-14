const path = require('path')

module.exports = {
  name: 'upload',
  version: '0.0.1',
  register: (server) => {
    server.route({
      method: 'GET',
      path: '/upload/{param*}',
      handler: {
        directory: {
          path: path.resolve(__dirname, '../../upload')
        }
      }
    })
  }
}

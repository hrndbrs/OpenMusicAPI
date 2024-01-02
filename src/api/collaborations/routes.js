const { JWT_STRATEGY_NAME } = require('../../lib/constants')

module.exports = (handler) => ([
  {
    method: 'POST',
    path: '/collaborations',
    handler: handler.postCollaborationHandler,
    options: {
      auth: JWT_STRATEGY_NAME
    }
  },
  {
    method: 'DELETE',
    path: '/collaborations',
    handler: handler.deleteCollaborationHandler,
    options: {
      auth: JWT_STRATEGY_NAME
    }
  }
])

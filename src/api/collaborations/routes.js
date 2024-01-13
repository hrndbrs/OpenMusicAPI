const Constant = require('../../lib/constants')

module.exports = (handler) => [
  {
    method: 'POST',
    path: '/collaborations',
    handler: handler.postCollaborationHandler,
    options: {
      auth: Constant.JWT_STRATEGY_NAME
    }
  },
  {
    method: 'DELETE',
    path: '/collaborations',
    handler: handler.deleteCollaborationHandler,
    options: {
      auth: Constant.JWT_STRATEGY_NAME
    }
  }
]

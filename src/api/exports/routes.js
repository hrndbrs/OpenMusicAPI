const Constant = require('../../lib/constants')

module.exports = (handler) => [
  {
    method: 'POST',
    path: '/export/playlists/{playlistId}',
    handler: handler.postExportPlaylistHandler,
    options: {
      auth: Constant.JWT_STRATEGY_NAME
    }
  }
]

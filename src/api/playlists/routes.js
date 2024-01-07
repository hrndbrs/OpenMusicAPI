const { JWT_STRATEGY_NAME } = require('../../lib/constants')

const routes = (handler) => [
  {
    method: 'POST',
    path: '/playlists',
    handler: handler.postPlaylistHandler,
    options: {
      auth: JWT_STRATEGY_NAME
    }
  },
  {
    method: 'GET',
    path: '/playlists',
    handler: handler.getPlaylistsHandler,
    options: {
      auth: JWT_STRATEGY_NAME
    }
  },
  {
    method: 'DELETE',
    path: '/playlists/{id}',
    handler: handler.deletePlaylistHandler,
    options: {
      auth: JWT_STRATEGY_NAME
    }
  },
  {
    method: 'POST',
    path: '/playlists/{id}/songs',
    handler: handler.postPlaylistSongHandler,
    options: {
      auth: JWT_STRATEGY_NAME
    }
  },
  {
    method: 'GET',
    path: '/playlists/{id}/songs',
    handler: handler.getPlaylistSongsHandler,
    options: {
      auth: JWT_STRATEGY_NAME
    }
  },
  {
    method: 'DELETE',
    path: '/playlists/{id}/songs',
    handler: handler.deletePlaylistSongHandler,
    options: {
      auth: JWT_STRATEGY_NAME
    }
  },
  {
    method: 'GET',
    path: '/playlists/{id}/activities',
    handler: handler.getPlaylistActivitiesHandler,
    options: {
      auth: JWT_STRATEGY_NAME
    }
  }
]

module.exports = routes

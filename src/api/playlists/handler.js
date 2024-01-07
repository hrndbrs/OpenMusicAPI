module.exports = class PlaylistsRouteHandler {
  constructor (playlistService, songService, validator) {
    this._playlistService = playlistService
    this._songService = songService
    this._validator = validator
  }

  verifyAccess = async (req) => {
    const { id: userId } = req.auth.credentials
    const { id: playlistId } = req.params
    const { method, path } = req

    const payload = { owner: userId, playlistId }

    await this._playlistService.verifyAccess(payload, method, path)

    return { userId, playlistId }
  }

  postPlaylistHandler = async (req, h) => {
    this._validator.validateNewPlaylist(req.payload)
    const { name } = req.payload
    const { id: owner } = req.auth.credentials

    const payload = { name, owner }

    const playlistId = await this._playlistService.createPlaylist(payload)

    const res = h.response({
      status: 'success',
      data: { playlistId }
    })
    res.code(201)
    return res
  }

  getPlaylistsHandler = async (req, h) => {
    const { id: owner } = req.auth.credentials
    const playlists = await this._playlistService.getUserPlaylists(owner)

    const res = h.response({
      status: 'success',
      data: { playlists }
    })
    res.code(200)
    return res
  }

  deletePlaylistHandler = async (req, h) => {
    const { userId: owner, playlistId } = await this.verifyAccess(req)

    const payload = { owner, playlistId }

    await this._playlistService.deletePlaylist(payload)

    const res = h.response({
      status: 'success',
      message: 'successfully deleted playlist'
    })
    res.code(200)
    return res
  }

  postPlaylistSongHandler = async (req, h) => {
    this._validator.validatePlaylistSong(req.payload)
    const { userId, playlistId } = await this.verifyAccess(req)
    const { songId } = req.payload

    await this._songService.getSongById(songId)

    const payload = { playlistId, songId, userId }

    await this._playlistService.addSongToPlaylist(payload)

    const res = h.response({
      status: 'success',
      message: 'added song successfully'
    })
    res.code(201)
    return res
  }

  getPlaylistSongsHandler = async (req, h) => {
    const { playlistId } = await this.verifyAccess(req)

    const playlist = await this._playlistService.getPlaylistByid(playlistId)

    const res = h.response({
      status: 'success',
      data: { playlist }
    })
    res.code(200)
    return res
  }

  deletePlaylistSongHandler = async (req, h) => {
    this._validator.validatePlaylistSong(req.payload)
    const { userId, playlistId } = await this.verifyAccess(req)

    const { songId } = req.payload

    const payload = { playlistId, songId, userId }

    await this._playlistService.removeSongFromPlaylist(payload)

    const res = h.response({
      status: 'success',
      message: 'successfully deleted a song from the playlist'
    })
    res.code(200)
    return res
  }

  getPlaylistActivitiesHandler = async (req, h) => {
    const { playlistId } = await this.verifyAccess(req)

    const activities = await this._playlistService.getPlaylistActivities(playlistId)

    const res = h.response({
      status: 'success',
      data: {
        playlistId,
        activities
      }
    })
    res.code(200)
    return res
  }
}

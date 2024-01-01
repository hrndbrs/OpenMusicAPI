module.exports = class PlaylistsRouteHandler {
  constructor (playlistService, songService, validator) {
    this._playlistService = playlistService
    this._songService = songService
    this._validator = validator
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

  deletePlaylistHandler = () => {}
  postPlaylistSongHandler = async (req, h) => {
    this._validator.validatePlaylistSong(req.payload)
    const { id: owner } = req.auth.credentials
    const { id: playlistId } = req.params
    const { songId } = req.payload

    await this._playlistService.verifyAccess({ owner, playlistId })
    await this._songService.getSongById(songId)

    const payload = { playlistId, songId }

    await this._playlistService.addSongToPlaylist(payload)

    const res = h.response({
      status: 'success',
      message: 'added song successfully'
    })
    res.code(201)
    return res
  }

  getPlaylistSongsHandler = async (req, h) => {
    const { id: owner } = req.auth.credentials
    const { id: playlistId } = req.params

    await this._playlistService.verifyAccess({ owner, playlistId })
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
    const { id: owner } = req.auth.credentials
    const { id: playlistId } = req.params
    const { songId } = req.payload

    await this._playlistService.verifyAccess({ owner, playlistId })

    const payload = { playlistId, songId }

    await this._playlistService.removeSongFromPlaylist(payload)

    const res = h.response({
      status: 'success',
      message: 'successfully deleted a song from the playlist'
    })
    res.code(200)
    return res
  }
}

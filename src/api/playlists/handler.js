module.exports = class PlaylistsRouteHandler {
  constructor (service, validator) {
    this._service = service
    this._validator = validator
  }

  postPlaylistHandler = async (req, h) => {
    this._validator.validateNewPlaylist(req.payload)
    const { name } = req.payload
    const { id: owner } = req.auth.credentials

    const payload = { name, owner }

    const playlistId = await this._service.createPlaylist(payload)

    const res = h.response({
      status: 'success',
      data: { playlistId }
    })
    res.code(201)
    return res
  }

  getPlaylistHandler = () => {}
  deletePlaylistHandler = () => {}
  postPlaylistSongHandler = () => {}
  getPlaylistSongsHandler = () => {}
  deletePlaylistSongHandler = () => {}
}

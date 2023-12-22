module.exports = class SongsRouteHandler {
  constructor (service, validator) {
    this._service = service
    this._validator = validator
  }

  postSongHandler = async (req, h) => {
    this._validator.validateSongPayload(req.payload)
    const { title, year, genre, performer, duration, albumId } = req.payload
    const payload = { title, year, genre, performer, duration, albumId }
    const songId = await this._service.addNewSong(payload)

    const res = h.response({
      status: 'success',
      data: { songId }
    })
    res.code(201)
    return res
  }

  getSongsHandler = async (req, h) => {
    const { title, performer } = req.query
    const searchParams = {}
    if (title) searchParams.title = `${title}%`
    if (performer) searchParams.performer = `${performer}%`
    const songs = await this._service.getAllSongs(searchParams)

    const res = h.response({
      status: 'success',
      data: { songs }
    })
    res.code(200)
    return res
  }

  getSongByIdHandler = async (req, h) => {
    const { id } = req.params
    const song = await this._service.getSongById(id)

    const res = h.response({
      status: 'success',
      data: { song }
    })
    res.code(200)
    return res
  }

  putSongByIdHandler = async (req, h) => {
    this._validator.validateSongPayload(req.payload)
    const { id } = req.params
    const { title, year, genre, performer, duration, albumId } = req.payload
    const payload = { id, title, year, genre, performer, duration, albumId }
    await this._service.editSongById(payload)

    const res = h.response({
      status: 'success',
      message: `song id ${id} has been updated`
    })
    res.code(200)
    return res
  }

  deleteSongByIdHandler = async (req, h) => {
    const { id } = req.params
    await this._service.deleteSongById(id)

    const res = h.response({
      status: 'success',
      message: `song id ${id} has been deleted`
    })
    res.code(200)
    return res
  }
}

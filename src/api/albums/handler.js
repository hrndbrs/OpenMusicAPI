module.exports = class AlbumsRouteHandler {
  constructor (service, validator) {
    this._service = service
    this._validator = validator
  }

  postAlbumHandler = async (req, h) => {
    this._validator.validateAlbumPayload(req.payload)
    const { name, year } = req.payload
    const payload = { name, year }
    const albumId = await this._service.addNewAlbum(payload)

    const res = h.response({
      status: 'success',
      data: { albumId }
    })
    res.code(201)
    return res
  }

  getAlbumByIdHandler = async (req, h) => {
    const { id } = req.params
    const album = await this._service.getAlbumById(id)

    const res = h.response({
      status: 'success',
      data: { album }
    })
    res.code(200)
    return res
  }

  putAlbumByIdHandler = async (req, h) => {
    this._validator.validateAlbumPayload(req.payload)
    const { name, year } = req.payload
    const { id } = req.params
    const payload = { id, name, year }
    await this._service.editAlbumById(payload)

    const res = h.response({
      status: 'success',
      message: `album id ${id} has been updated`
    })
    res.code(200)
    return res
  }

  deleteAlbumByIdHandler = async (req, h) => {
    const { id } = req.params
    await this._service.deleteAlbumById(id)

    const res = h.response({
      status: 'success',
      message: `album id ${id} has been deleted`
    })
    res.code(200)
    return res
  }

  postAlbumCoverHandler = async (req, h) => {
    const { cover } = req.payload
    const { id } = req.params
    this._validator.validateImageHeaders(cover.hapi.headers)
    const filename = await this._service.writeFile(cover)
    await this._service.uploadAlbumCover(id, filename)

    const res = h.response({
      status: 'success',
      message: 'successfully uploaded album cover'
    })
    res.code(201)
    return res
  }
}

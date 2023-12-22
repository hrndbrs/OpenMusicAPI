module.exports = class AlbumsHandler {
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
      message: 'success',
      data: { albumId }
    })
    res.code(201)
    return res
  }

  getAlbumByIdHandler = async () => {}
  putAlbumByIdHandler = async () => {}
  deleteAlbumByIdHandler = async () => {}
}

module.exports = class SongsRouteHandler {
  constructor (service, validator) {
    this._service = service
    this._validator = validator
  }

  postSongHandler = async () => {}
  getSongsHandler = async () => {}
  getSongByIdHandler = async () => {}
  putSongByIdHandler = async () => {}
  deleteSongByIdHandler = async () => {}
}

const Constant = require('../../lib/constants')

module.exports = class ExportsRouteHandler {
  constructor (producerService, playlistService, validator) {
    this._producerService = producerService
    this._playlistService = playlistService
    this._validator = validator
  }

  verifyAccess = async (req) => {
    const { id: userId } = req.auth.credentials
    const { playlistId } = req.params
    const { method, path } = req

    const payload = { owner: userId, playlistId }

    await this._playlistService.verifyAccess(payload, method, path)

    return { userId, playlistId }
  }

  postExportPlaylistHandler = async (req, h) => {
    this._validator.validateExportPayload(req.payload)
    const { playlistId } = await this.verifyAccess(req)
    const { targetEmail } = req.payload

    const message = { playlistId, targetEmail }

    await this._producerService.sendMessage(Constant.EXPORT_PLAYLIST_QUEUE, JSON.stringify(message))

    const response = h.response({
      status: 'success',
      message: 'Permintaan Anda sedang kami proses'
    })
    response.code(201)
    return response
  }
}

module.exports = class CollaborationsRouteHandler {
  constructor (collaborationService, playlistService, validator) {
    this._collaborationService = collaborationService
    this._playlistService = playlistService
    this._validator = validator
  }

  verifyAccess = async (req) => {
    const { id: userId } = req.auth.credentials
    const { playlistId } = req.payload
    const { method, path } = req

    const payload = { owner: userId, playlistId }

    await this._playlistService.verifyAccess(payload, method, path)

    return { userId, playlistId }
  }

  postCollaborationHandler = async (req, h) => {
    this._validator.validateCollaborationPayload(req.payload)
    const { playlistId } = await this.verifyAccess(req)
    const { userId } = req.payload

    const payload = { userId, playlistId }

    const collaborationId = await this._collaborationService.addCollaborator(payload)

    const res = h.response({
      status: 'success',
      data: { collaborationId }
    })
    res.code(201)
    return res
  }

  deleteCollaborationHandler = async (req, h) => {
    this._validator.validateCollaborationPayload(req.payload)
    const { playlistId } = await this.verifyAccess(req)
    const { userId } = req.payload

    const payload = { userId, playlistId }

    await this._collaborationService.removeCollaborator(payload)

    const res = h.response({
      status: 'success',
      message: 'successfully removed collaborator'
    })
    res.code(200)
    return res
  }
}

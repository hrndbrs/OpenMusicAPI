module.exports = class AuthRouteHandler {
  constructor (service, validator, tokenManager) {
    this._service = service
    this._validator = validator
    this._tokenManager = tokenManager
  }

  postTokenHandler = async (req, h) => {
    this._validator.validateUserPayload(req.payload)
    const { username, password } = req.payload

    const payload = { username, password }

    const id = await this._service.validateUser(payload)

    const accessToken = this._tokenManager.generateAccessToken({ id })
    const refreshToken = this._tokenManager.generateRefreshToken({ id })

    await this._service.storeRefreshToken(refreshToken)

    const res = h.response({
      status: 'success',
      data: {
        accessToken,
        refreshToken
      }
    })
    res.code(201)
    return res
  }

  putTokenHandler = async (req, h) => {
    this._validator.validateRefreshToken(req.payload)
    const { refreshToken } = req.payload

    await this._service.validateRefreshToken(refreshToken)
    const { id } = this._tokenManager.verifyRefreshToken(refreshToken)
    const accessToken = this._tokenManager.generateAccessToken({ id })

    const res = h.response({
      status: 'success',
      data: { accessToken }
    })
    res.code(200)
    return res
  }

  deleteTokenHandler = async (req, h) => {
    this._validator.validateRefreshToken(req.payload)
    const { refreshToken } = req.payload

    await this._service.removeRefreshToken(refreshToken)

    const res = h.response({
      status: 'success',
      message: 'successfully deleted token'
    })
    res.code(200)
    return res
  }
}

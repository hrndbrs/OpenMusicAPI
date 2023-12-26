const { hashPassword } = require('../../lib/bcrypt')

module.exports = class UsersRouteHandler {
  constructor (service, validator) {
    this._service = service
    this._validator = validator
  }

  postUserHandler = async (req, h) => {
    this._validator.validateNewUserPayload(req.payload)
    const { username, password: inputPassword, fullname } = req.payload
    const password = hashPassword(inputPassword)
    const payload = { username, password, fullname }

    const userId = await this._service.createNewUser(payload)

    const res = h.response({
      status: 'success',
      data: { userId }
    })
    res.code(201)
    return res
  }
}

const albumPayloadSchema = require('./schema')

module.exports = {
  validateAlbumPayload: (payload) => {
    const { error } = albumPayloadSchema.validate(payload)
    if (error) {
      throw new Error(error.message)
    }
  }
}

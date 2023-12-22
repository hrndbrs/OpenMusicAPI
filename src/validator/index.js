const { ClientError, ERROR } = require('../lib/error')
const albumPayloadSchema = require('./albums/schema')
const songPayloadSchema = require('./songs/schema')

module.exports = {
  validateAlbumPayload: (payload) => {
    const { error } = albumPayloadSchema.validate(payload)
    if (error) {
      throw new ClientError(error.message, ERROR.BAD_REQUEST)
    }
  },
  validateSongPayload: (payload) => {
    const { error } = songPayloadSchema.validate(payload)
    if (error) {
      throw new ClientError(error.message, ERROR.BAD_REQUEST)
    }
  }
}

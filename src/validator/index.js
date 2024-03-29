const { ClientError, ERROR } = require('../lib/error')
const {
  albumPayloadSchema,
  imageHeadersSchema
} = require('./albums/schema')
const songPayloadSchema = require('./songs/schema')
const {
  newUserPayloadSchema,
  authUserSchema
} = require('./users/schema')
const authPayloadSchema = require('./auth/schema')
const {
  newPlaylistPayloadSchema,
  playlistSongPayloadSchema
} = require('./playlists/schema')
const collaborationPayloadSchema = require('./collaborations/schema')
const exportPayloadSchema = require('./exports/schema')

module.exports = {
  checkError (error) {
    if (error) {
      throw new ClientError(error.message, ERROR.BAD_REQUEST)
    }
  },
  validateAlbumPayload (payload) {
    const { error } = albumPayloadSchema.validate(payload)
    this.checkError(error)
  },
  validateImageHeaders (payload) {
    const { error } = imageHeadersSchema.validate(payload)
    this.checkError(error)
  },
  validateSongPayload (payload) {
    const { error } = songPayloadSchema.validate(payload)
    this.checkError(error)
  },
  validateNewUserPayload (payload) {
    const { error } = newUserPayloadSchema.validate(payload)
    this.checkError(error)
  },
  validateUserPayload (payload) {
    const { error } = authUserSchema.validate(payload)
    this.checkError(error)
  },
  validateRefreshToken (payload) {
    const { error } = authPayloadSchema.validate(payload)
    this.checkError(error)
  },
  validateNewPlaylist (payload) {
    const { error } = newPlaylistPayloadSchema.validate(payload)
    this.checkError(error)
  },
  validatePlaylistSong (payload) {
    const { error } = playlistSongPayloadSchema.validate(payload)
    this.checkError(error)
  },
  validateCollaborationPayload (payload) {
    const { error } = collaborationPayloadSchema.validate(payload)
    this.checkError(error)
  },
  validateExportPayload (payload) {
    const { error } = exportPayloadSchema.validate(payload)
    this.checkError(error)
  }
}

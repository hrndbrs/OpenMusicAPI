const joi = require('joi')

const newPlaylistPayloadSchema = joi.object({
  name: joi.string().required()
})

const playlistSongPayloadSchema = joi.object({
  songId: joi.string().required()
})

module.exports = { newPlaylistPayloadSchema, playlistSongPayloadSchema }

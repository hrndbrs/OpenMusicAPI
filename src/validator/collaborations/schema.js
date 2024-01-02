const joi = require('joi')

const collaborationPayloadSchema = joi.object({
  userId: joi.string().required(),
  playlistId: joi.string().required()
})

module.exports = collaborationPayloadSchema

const joi = require('joi')

const albumPayloadSchema = joi.object({
  name: joi.string().required(),
  year: joi.number().required()
})

module.exports = albumPayloadSchema

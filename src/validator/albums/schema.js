const joi = require('joi')

const albumPayloadSchema = joi.object({
  name: joi.string().required(),
  year: joi.number().required()
})

const imageHeadersSchema = joi.object({
  'content-type': joi.string().valid('image/apng', 'image/avif', 'image/gif', 'image/jpeg', 'image/png', 'image/webp', 'image/svg+xml').required()
}).unknown()

module.exports = { albumPayloadSchema, imageHeadersSchema }

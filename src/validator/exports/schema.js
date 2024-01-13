const joi = require('joi')

const exportPayloadSchema = joi.object({
  targetEmail: joi.string().email({ tlds: true }).required()
})

module.exports = exportPayloadSchema

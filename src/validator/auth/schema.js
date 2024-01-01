const joi = require('joi')

const authPayloadSchema = joi.object({
  refreshToken: joi.string().required()
})

module.exports = authPayloadSchema

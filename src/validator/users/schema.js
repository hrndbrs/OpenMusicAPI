const joi = require('joi')

const newUserPayloadSchema = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
  fullname: joi.string().required()
})

const authUserSchema = joi.object({
  username: joi.string().required(),
  password: joi.string().required()
})

module.exports = {
  newUserPayloadSchema,
  authUserSchema
}

const {
  token: {
    verifySignature,
    generate,
    decode
  }
} = require('@hapi/jwt')

module.exports = {
  generateAccessToken: (payload) => generate(payload, process.env.ACCESS_TOKEN_KEY),
  generateRefreshToken: (payload) => generate(payload, process.env.REFRESH_TOKEN_KEY),
  verifyRefreshToken: (token) => {
    try {
      const artifacts = decode(token)
      verifySignature(artifacts, process.env.REFRESH_TOKEN_KEY)
      return artifacts.decoded.payload
    } catch (err) {
      console.log(err, '<<< error')
      throw err
    }
  }
}

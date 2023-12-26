const { genSaltSync, hashSync, compareSync } = require('bcryptjs')

module.exports = {
  hashPassword (password) {
    const salt = genSaltSync(10)
    return hashSync(password, salt)
  },
  verifyPassword (password, hashedPassword) {
    return compareSync(password, hashedPassword)
  }
}

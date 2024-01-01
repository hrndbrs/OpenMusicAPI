const Service = require('./service')
const { ClientError, ERROR } = require('../lib/error')
const { hashPassword, verifyPassword } = require('../lib/bcrypt')
const { nanoid } = require('nanoid')

module.exports = class UserService extends Service {
  createNewUser = async ({ username, password, fullname }) => {
    const id = 'user-' + nanoid(16)
    const hashedPassword = hashPassword(password)

    try {
      const { rows } = await this.pool.query(
        `INSERT INTO users (id, username, password, fullname)
        VALUES ($1, $2, $3, $4)
        RETURNING id`,
        [id, username, hashedPassword, fullname]
      )

      return rows[0].id
    } catch (err) {
      if (err.code === '23505') throw new ClientError(err.detail, ERROR.BAD_REQUEST)
      throw err
    }
  }

  validateUser = async ({ username, password }) => {
    const { rows: [user] } = await this.pool.query(
      `SELECT id, password FROM users 
      WHERE username=$1`,
      [username]
    )

    if (!(user && verifyPassword(password, user.password))) throw new ClientError('Invalid Email/Password', ERROR.UNAUTHORIZED)

    return user.id
  }

  storeRefreshToken = async (token) => {
    const { rows } = await this.pool.query(
      `INSERT INTO auths (token)
      VALUES ($1)
      RETURNING id`,
      [token]
    )

    if (rows.length === 0) throw new Error()

    return rows[0]
  }

  validateRefreshToken = async (token) => {
    const { rows } = await this.pool.query(
      `SELECT id FROM auths
      WHERE token=$1`,
      [token]
    )

    if (rows.length === 0) throw new ClientError('Invalid refresh token', ERROR.BAD_REQUEST)

    return rows[0].id
  }

  removeRefreshToken = async (token) => {
    const { rows } = await this.pool.query(
      `DELETE FROM auths
      WHERE token=$1
      RETURNING id`,
      [token]
    )

    if (rows.length === 0) throw new ClientError('Invalid refresh token', ERROR.BAD_REQUEST)

    return rows[0].id
  }
}

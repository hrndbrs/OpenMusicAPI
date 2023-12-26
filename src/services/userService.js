const Service = require('./service')
const { ClientError, ERROR } = require('../lib/error')
const { nanoid } = require('nanoid')

module.exports = class UserService extends Service {
  createNewUser = async ({ username, password, fullname }) => {
    const id = nanoid(16)

    try {
      const { rows } = await this.pool.query(
        `INSERT INTO users (id, username, password, fullname)
        VALUES ($1, $2, $3, $4)
        RETURNING id`,
        [id, username, password, fullname]
      )

      return rows[0].id
    } catch (err) {
      if (err.code === '23505') throw new ClientError(err.detail, ERROR.BAD_REQUEST)
      throw err
    }
  }
}

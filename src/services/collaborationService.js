const { nanoid } = require('nanoid')
const Service = require('./service')
const { ClientError, ERROR } = require('../lib/error')

module.exports = class CollaborationService extends Service {
  verifyCollaborator = async (collaboratorId, playlistId) => {
    const { rows } = await this.pool.query(
      `SELECT id FROM collaborations
      WHERE "userId"=$1 AND "playlistId"=$2`,
      [collaboratorId, playlistId]
    )

    if (rows.length === 0) throw new ClientError('unauthorized access', ERROR.FORBIDDEN)
  }

  addCollaborator = async ({ userId, playlistId }) => {
    const id = 'collaboration-' + nanoid(16)

    try {
      const { rows } = await this.pool.query(
        `INSERT INTO collaborations (id, "userId", "playlistId")
        VALUES ($1, $2, $3)
        RETURNING id`,
        [id, userId, playlistId]
      )

      return rows[0].id
    } catch (err) {
      if (
        err.code === '23503' &&
        err.detail.includes('not present')
      ) throw new ClientError('invalid userId/playlistId', ERROR.NOT_FOUND)

      throw err
    }
  }

  removeCollaborator = async ({ userId, playlistId }) => {
    const { rows } = await this.pool.query(
      `DELETE FROM collaborations
      WHERE "userId"=$1 AND "playlistId"=$2
      RETURNING id`,
      [userId, playlistId]
    )

    if (rows.length === 0) throw new ClientError('collaboratorId is not found', ERROR.NOT_FOUND)

    return rows[0].id
  }
}

const Service = require('./service')
const { ClientError, ERROR } = require('../lib/error')
const { nanoid } = require('nanoid')

module.exports = class PlaylistService extends Service {
  createPlaylist = async ({ name, owner }) => {
    const id = 'playlist-' + nanoid(16)

    const { rows } = await this.pool.query(
      `INSERT INTO playlists (id, name, owner)
      VALUES ($1, $2, $3)
      RETURNING id`,
      [id, name, owner]
    )

    if (rows.length === 0) throw new Error()

    return rows[0].id
  }

  getUserPlaylists = async (owner) => {
    const { rows } = await this.pool.query(
      `SELECT p.id, p.name, u.username FROM playlists p
      JOIN users u ON p.owner=u.id
      WHERE u.id=$1`,
      [owner]
    )

    return rows
  }

  addSongToPlaylist = async ({ playlistId, songId }) => {
    try {
      const { rows } = await this.pool.query(
        `INSERT INTO "playlist-song" ("playlistId", "songId")
        VALUES ($1, $2)
        RETURNING id`,
        [playlistId, songId]
      )

      return rows[0].id
    } catch (err) {
      if (err.code === '23505') throw new ClientError('song is already in the playlist', ERROR.BAD_REQUEST)
      throw err
    }
  }

  getPlaylistByid = async (id) => {
    const { rows } = await this.pool.query(
      `SELECT p.id, p.name, u.username,
      CASE
      WHEN count(ps.id) > 0
        THEN jsonb_agg(
          jsonb_build_object(
            'id', s.id,
            'title', s.title,
            'performer', s.performer
        ))
        ELSE '[]'::jsonb
      END AS songs
      FROM playlists p
      JOIN "playlist-song" ps ON ps."playlistId"=p.id
      JOIN songs s ON ps."songId" = s.id
      JOIN users u ON u.id=p.owner
      WHERE p.id=$1
      GROUP BY p.id, u.username`,
      [id]
    )

    return rows[0]
  }

  verifyOwner = async ({ owner, playlistId }) => {
    const { rows } = await this.pool.query(
      `SELECT name from playlists
      WHERE owner=$1 AND id=$2`,
      [owner, playlistId]
    )

    if (rows.length === 0) throw new ClientError('unauthorized access', ERROR.FORBIDDEN)
  }

  verifyAccess = async (payload) => {
    await this.verifyOwner(payload)
  }
}
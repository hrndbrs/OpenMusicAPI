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

  deletePlaylist = async ({ playlistId, owner }) => {
    const { rows } = await this.pool.query(
      `DELETE FROM playlists
      WHERE id=$1 AND owner=$2
      RETURNING id`,
      [playlistId, owner]
    )

    if (rows.length === 0) throw new ClientError('playlist is not found', ERROR.NOT_FOUND)

    return rows[0].id
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
      WHEN count(s.id) > 0
        THEN jsonb_agg(
          jsonb_build_object(
            'id', s.id,
            'title', s.title,
            'performer', s.performer
          ))
        ELSE '[]'::jsonb
      END AS songs
      FROM playlists p
      LEFT JOIN "playlist-song" ps ON ps."playlistId"=p.id
      LEFT JOIN songs s ON ps."songId" = s.id
      LEFT JOIN users u ON u.id=p.owner
      WHERE p.id=$1
      GROUP BY p.id, u.username`,
      [id]
    )

    return rows[0]
  }

  removeSongFromPlaylist = async ({ playlistId, songId }) => {
    const { rows } = await this.pool.query(
      `DELETE FROM "playlist-song"
      WHERE "playlistId"=$1 AND "songId"=$2
      RETURNING id`,
      [playlistId, songId]
    )

    if (rows.length === 0) throw new ClientError('song is not found in the playlist', ERROR.NOT_FOUND)

    return rows[0].id
  }

  verifyOwner = async ({ owner, playlistId }) => {
    const { rows } = await this.pool.query(
      `SELECT owner from playlists
      WHERE id=$1`,
      [playlistId]
    )

    console.log(rows)

    if (rows.length === 0) throw new ClientError('playlist is not found', ERROR.NOT_FOUND)
    else if (rows[0].owner !== owner) throw new ClientError('unauthorized access', ERROR.FORBIDDEN)
  }

  verifyAccess = async (payload) => {
    await this.verifyOwner(payload)
  }
}

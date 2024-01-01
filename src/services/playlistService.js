const Service = require('./service')
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
}

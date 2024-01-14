const pool = require('../config/pg')

module.exports = class PlaylistService {
  #pool = pool

  async getPlaylistById (playlistId) {
    const { rows } = await this.#pool.query(
      `SELECT p.id, p.name,
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
      WHERE p.id=$1
      GROUP BY p.id`,
      [playlistId]
    )

    return rows[0]
  }
}

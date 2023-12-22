const Service = require('./service')
const { nanoid } = require('nanoid')

module.exports = class SongService extends Service {
  addNewSong = async ({ title, year, genre, performer, duration, albumId }) => {
    const id = 'song-' + nanoid(16)

    const { rows } = await this.pool.query(
      'INSERT INTO songs (id, title, year, genre, performer, duration, "albumId") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      [id, title, year, genre, performer, duration, albumId]
    )

    return rows[0].id
  }

  getAllSongs = async () => {}
  getSongById = async () => {}
  editSongById = async () => {}
  deleteSongById = async () => {}
}

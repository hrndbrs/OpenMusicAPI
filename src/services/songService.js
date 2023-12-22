const { ClientError, ERROR } = require('../lib/error')
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

  getAllSongs = async () => {
    const { rows } = await this.pool.query(
      'SELECT id, title, performer FROM songs'
    )

    return rows
  }

  getSongById = async (id) => {
    const { rows } = await this.pool.query(
      'SELECT * FROM songs WHERE id=$1',
      [id]
    )

    if (rows.length === 0) throw new ClientError('Invalid song id', ERROR.BAD_REQUEST)

    return rows[0]
  }

  editSongById = async () => {}
  deleteSongById = async () => {}
}

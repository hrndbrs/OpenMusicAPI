const { nanoid } = require('nanoid')
const Service = require('./service')
const { ClientError, ERROR } = require('../lib/error')

module.exports = class SongService extends Service {
  addNewSong = async ({ title, year, genre, performer, duration, albumId }) => {
    const id = 'song-' + nanoid(16)

    const { rows } = await this.pool.query(
      `INSERT INTO songs (id, title, year, genre, performer, duration, "albumId") 
      VALUES ($1, $2, $3, $4, $5, $6, $7) 
      RETURNING id`,
      [id, title, year, genre, performer, duration, albumId]
    )

    return rows[0].id
  }

  getAllSongs = async (searchParams) => {
    const query = { text: 'SELECT id, title, performer FROM songs' }

    if (JSON.stringify(searchParams) !== '{}') {
      query.values = []

      const conditions = Object
        .keys(searchParams)
        .map((q, i) => {
          query.values.push(searchParams[q])
          return `${q} ILIKE $${i + 1}`
        }).join(' AND ')

      query.text = query.text + ` WHERE ${conditions}`
    }

    const { rows } = await this.pool.query(query)

    return rows
  }

  getSongById = async (id) => {
    const { rows } = await this.pool.query(
      'SELECT * FROM songs WHERE id=$1',
      [id]
    )

    if (rows.length === 0) throw new ClientError('Invalid song id', ERROR.NOT_FOUND)

    return rows[0]
  }

  editSongById = async ({ id, title, year, genre, performer, duration, albumId }) => {
    const { rows } = await this.pool.query(
      `UPDATE songs 
      SET title=$1, year=$2, genre=$3, performer=$4, duration=$5, "albumId"=$6 
      WHERE id=$7 
      RETURNING id`,
      [title, year, genre, performer, duration, albumId, id]
    )

    if (rows.length === 0) throw new ClientError('No song has been updated', ERROR.NOT_FOUND)

    return rows[0]
  }

  deleteSongById = async (id) => {
    const { rows } = await this.pool.query(
      `DELETE FROM songs 
      WHERE id=$1 
      RETURNING id`,
      [id]
    )

    if (rows.length === 0) throw new ClientError('No song has been deleted', ERROR.NOT_FOUND)

    return rows[0]
  }
}

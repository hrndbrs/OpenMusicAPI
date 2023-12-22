const Service = require('./service')
const { ClientError, ERROR } = require('../lib/error')
const { nanoid } = require('nanoid')

module.exports = class AlbumService extends Service {
  addNewAlbum = async ({ name, year }) => {
    const id = 'album-' + nanoid(16)

    const { rows } = await this.pool.query(
      'INSERT INTO albums (id, name, year) VALUES ($1, $2, $3) RETURNING id',
      [id, name, year]
    )

    return rows[0].id
  }

  getAlbumById = async (id) => {
    const { rows } = await this.pool.query(
      'SELECT * FROM albums WHERE id=$1',
      [id]
    )

    if (rows.length === 0) throw new ClientError(`Album id ${id} is not found`, ERROR.NOT_FOUND)

    return rows[0]
  }

  editAlbumById = async ({ id, name, year }) => {
    const { rows } = await this.pool.query(
      'UPDATE albums SET name=$1, year=$2 WHERE id=$3 RETURNING *',
      [name, year, id]
    )

    if (rows.length === 0) throw new ClientError(`Album id ${id} is not found`, ERROR.NOT_FOUND)

    return rows[0]
  }

  deleteAlbumById = async (id) => {
    const { rows } = await this.pool.query(
      'DELETE FROM albums WHERE id=$1 RETURNING id',
      [id]
    )

    if (rows.length === 0) throw new ClientError(`Album id ${id} is not found`, ERROR.NOT_FOUND)

    return rows[0]
  }
}

const { nanoid } = require('nanoid')
const { Pool } = require('pg')

module.exports = class AlbumService {
  #pool

  constructor () {
    this.#pool = this.connectToDatabase()
  }

  connectToDatabase () {
    const options = process.env.NODE_ENV === 'production'
      ? { connectionString: process.env.DATABASE_URL }
      : {
          port: process.env.PGPORT,
          user: process.env.PGUSER,
          host: process.env.PGHOST,
          password: process.env.PGPASSWORD,
          database: process.env.PGDATABASE
        }

    const pool = new Pool(options)

    return pool
  }

  addNewAlbum = async ({ name, year }) => {
    const id = 'album-' + nanoid(16)

    const { rows: [{ id: newAlbumId }] } = await this.#pool.query(
      'INSERT INTO albums (id, name, year) VALUES ($1, $2, $3) RETURNING id',
      [id, name, year]
    )

    return newAlbumId
  }
}

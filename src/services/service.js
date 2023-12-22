const { Pool } = require('pg')

module.exports = class Service {
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

  get pool () {
    return this.#pool
  }
}

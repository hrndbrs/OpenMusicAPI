const { Pool } = require('pg')

module.exports = class Service {
  #pool

  constructor () {
    this.#pool = this.connectToDatabase()
  }

  connectToDatabase () {
    const pool = new Pool({
      port: process.env.PGPORT,
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE
    })

    return pool
  }

  get pool () {
    return this.#pool
  }
}

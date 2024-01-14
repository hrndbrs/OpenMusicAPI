const { Pool } = require('pg')

const pool = new Pool({
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE
})

module.exports = pool

const pool = require('../config/pg')

module.exports = class Service {
  #pool

  constructor () {
    this.#pool = pool
  }

  get pool () {
    return this.#pool
  }
}

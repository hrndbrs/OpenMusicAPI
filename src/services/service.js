const pool = require('../config/pg')

module.exports = class Service {
  #pool = pool

  get pool () {
    return this.#pool
  }
}

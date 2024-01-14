module.exports = class CacheService {
  constructor (client) {
    this._client = client
  }

  _expiredIn = 30 * 60

  set = (key, value) => {
    return this._client.set(key, JSON.stringify(value), { EX: this._expiredIn })
  }

  get = async (key) => {
    const value = await this._client.get(key)
    if (value == null) return
    return JSON.parse(value)
  }

  delete = (key) => {
    return this._client.del(key)
  }
}

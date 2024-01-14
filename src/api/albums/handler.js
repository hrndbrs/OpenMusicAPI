const Constant = require('../../lib/constants')
const { ClientError, ERROR } = require('../../lib/error')

module.exports = class AlbumsRouteHandler {
  constructor(albumService, cacheService, uploadService, validator) {
    this._albumService = albumService
    this._cacheService = cacheService
    this._uploadService = uploadService
    this._validator = validator
  }

  verifyLike = async (req) => {
    const { id: userId } = req.auth.credentials
    const { id: albumId } = req.params
    const { method } = req

    await this._albumService.getAlbumById(albumId)
    const like = await this._albumService.verifyLike(userId, albumId, method)

    if (like && method === 'post') throw new ClientError('user has already liked the album', ERROR.BAD_REQUEST)
    else if (!like && method === 'delete') throw new ClientError("user hasn't liked the album", ERROR.BAD_REQUEST)

    return { userId, albumId }
  }

  postAlbumHandler = async (req, h) => {
    this._validator.validateAlbumPayload(req.payload)
    const { name, year } = req.payload
    const payload = { name, year }
    const albumId = await this._albumService.addNewAlbum(payload)

    const res = h.response({
      status: 'success',
      data: { albumId }
    })
    res.code(201)
    return res
  }

  getAlbumByIdHandler = async (req, h) => {
    const { id } = req.params
    const album = await this._albumService.getAlbumById(id)

    const res = h.response({
      status: 'success',
      data: { album }
    })
    res.code(200)
    return res
  }

  putAlbumByIdHandler = async (req, h) => {
    this._validator.validateAlbumPayload(req.payload)
    const { name, year } = req.payload
    const { id } = req.params
    const payload = { id, name, year }
    await this._albumService.editAlbumById(payload)

    const res = h.response({
      status: 'success',
      message: `album id ${id} has been updated`
    })
    res.code(200)
    return res
  }

  deleteAlbumByIdHandler = async (req, h) => {
    const { id } = req.params
    await this._albumService.deleteAlbumById(id)

    const res = h.response({
      status: 'success',
      message: `album id ${id} has been deleted`
    })
    res.code(200)
    return res
  }

  postAlbumCoverHandler = async (req, h) => {
    const { cover } = req.payload
    const { id } = req.params
    this._validator.validateImageHeaders(cover.hapi.headers)
    const filename = await this._uploadService.writeFile(cover)
    await this._albumService.uploadAlbumCover(id, filename)

    const res = h.response({
      status: 'success',
      message: 'successfully uploaded album cover'
    })
    res.code(201)
    return res
  }

  getLikesHandler = async (req, h) => {
    const { id } = req.params

    const cachedLikes = await this._cacheService.get(`${Constant.REDIS_KEY_ALBUM_LIKE_COUNT}-${id}`)

    if (cachedLikes) {
      const res = h.response({
        status: 'success',
        data: { likes: cachedLikes }
      })
      res.header('X-Data-Source', 'cache')
      res.code(200)
      return res
    }

    const likes = await this._albumService.getAlbumLikesCount(id)

    await this._cacheService.set(`${Constant.REDIS_KEY_ALBUM_LIKE_COUNT}-${id}`, likes)

    const res = h.response({
      status: 'success',
      data: { likes }
    })
    res.code(200)
    return res
  }

  postLikesHandler = async (req, h) => {
    const { userId, albumId } = await this.verifyLike(req)

    await this._albumService.likeAlbum(userId, albumId)
    await this._cacheService.delete(`${Constant.REDIS_KEY_ALBUM_LIKE_COUNT}-${albumId}`)

    const res = h.response({
      status: 'success',
      message: 'successfully liked the album'
    })
    res.code(201)
    return res
  }

  deleteLikesHandler = async (req, h) => {
    const { userId, albumId } = await this.verifyLike(req)

    await this._albumService.removeLikefromAlbum(userId, albumId)
    await this._cacheService.delete(`${Constant.REDIS_KEY_ALBUM_LIKE_COUNT}-${albumId}`)

    const res = h.response({
      status: 'success',
      message: 'successfully removed like from the album'
    })
    res.code(200)
    return res
  }
}

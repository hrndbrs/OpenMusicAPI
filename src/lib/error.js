const ERROR = {
  NOT_FOUND: 'NOT_FOUND',
  BAD_REQUEST: 'BAD_REQUEST',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN'
}

class ClientError extends Error {
  constructor (message, name) {
    super(message)
    this.name = name
    this.status = ClientError.getStatusCode(name)
  }

  static getStatusCode (name) {
    switch (name) {
      case ERROR.BAD_REQUEST:
        return 400
      case ERROR.UNAUTHORIZED:
        return 401
      case ERROR.FORBIDDEN:
        return 403
      case ERROR.NOT_FOUND:
        return 404
    }
  }
}

module.exports = {
  ClientError,
  ERROR
}

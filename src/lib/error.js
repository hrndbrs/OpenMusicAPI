const ERROR = {
  NOT_FOUND: 'NOT_FOUND',
  BAD_REQUEST: 'BAD_REQUEST'
}

class ClientError extends Error {
  constructor (message, name) {
    super(message)
    this.name = name
    this.status = ClientError.getStatusCode(name)
  }

  static getStatusCode (name) {
    switch (name) {
      case ERROR.NOT_FOUND:
        return 404
      case ERROR.BAD_REQUEST:
        return 400
    }
  }
}

module.exports = {
  ClientError,
  ERROR
}

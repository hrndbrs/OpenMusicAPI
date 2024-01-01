module.exports = (handler) => [
  {
    method: 'POST',
    path: '/authentications',
    handler: handler.postTokenHandler
  },
  {
    method: 'PUT',
    path: '/authentications',
    handler: handler.putTokenHandler
  },
  {
    method: 'DELETE',
    path: '/authentications',
    handler: handler.deleteTokenHandler
  }
]

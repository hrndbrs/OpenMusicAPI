exports.up = pgm => {
  pgm.createTable('auths', {
    id: 'id',
    token: {
      type: 'TEXT',
      notNull: true
    }
  })
}

exports.down = pgm => {
  pgm.dropTable('auths')
}

exports.up = pgm => {
  pgm.addConstraint('collaborations', 'unique_combination2', {
    unique: ['playlistId', 'userId']
  })
}

exports.down = pgm => {
  pgm.dropConstraint('collaborations', 'unique_combination2')
}

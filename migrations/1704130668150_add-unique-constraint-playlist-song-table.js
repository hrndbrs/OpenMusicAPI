exports.up = pgm => {
  pgm.addConstraint('playlist-song', 'unique_combination', {
    unique: ['playlistId', 'songId']
  })
}

exports.down = pgm => {
  pgm.dropConstraint('playlist-song', 'unique-constraint')
}

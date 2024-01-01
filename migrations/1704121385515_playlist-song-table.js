exports.up = pgm => {
  pgm.createTable('playlist-song', {
    id: 'id',
    playlistId: {
      type: 'VARCHAR(100)',
      references: 'playlists',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    songId: {
      type: 'VARCHAR(100)',
      references: 'songs',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  })
}

exports.down = pgm => {}

exports.up = pgm => {
  pgm.createTable('collaborations', {
    id: {
      type: 'VARCHAR(100)',
      notNull: true,
      primaryKey: true
    },
    userId: {
      type: 'VARCHAR(100)',
      references: 'users',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    playlistId: {
      type: 'VARCHAR(100)',
      references: 'playlists',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  })
}

exports.down = pgm => {
  pgm.dropTable('collaborations')
}

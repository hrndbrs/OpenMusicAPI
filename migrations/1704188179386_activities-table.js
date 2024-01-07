exports.up = pgm => {
  pgm.addType('action_enum', ['add', 'delete'])

  pgm.createTable('activities', {
    id: 'id',
    playlistId: {
      type: 'VARCHAR(100)',
      references: 'playlists',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    userId: {
      type: 'VARCHAR(100)',
      references: 'users',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    songId: {
      type: 'VARCHAR(100)',
      references: 'songs',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    action: {
      type: 'action_enum',
      notNull: true
    },
    time: {
      type: 'timestamp',
      default: pgm.func('current_timestamp')
    }
  })
}

exports.down = pgm => {
  pgm.dropTable('activities')
  pgm.dropType('action_enum')
}

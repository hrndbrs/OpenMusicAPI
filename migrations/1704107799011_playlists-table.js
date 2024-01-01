exports.up = pgm => {
  pgm.createTable('playlists', {
    id: {
      type: 'VARCHAR(100)',
      notNull: true,
      primaryKey: true
    },
    name: {
      type: 'VARCHAR(255)',
      notNull: true
    },
    owner: {
      type: 'VARCHAR(100)',
      references: 'users',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  })
}

exports.down = pgm => {
  pgm.dropTable('playlists')
}

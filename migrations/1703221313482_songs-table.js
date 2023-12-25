exports.up = pgm => {
  pgm.createTable('songs', {
    id: {
      type: 'VARCHAR(50)',
      notNull: true,
      primaryKey: true
    },
    title: {
      type: 'VARCHAR(255)',
      notNull: true
    },
    year: {
      type: 'INTEGER',
      notNull: true
    },
    genre: {
      type: 'VARCHAR(255)',
      notNull: true
    },
    performer: {
      type: 'VARCHAR(255)',
      notNull: true
    },
    duration: 'INTEGER',
    albumId: {
      type: 'VARCHAR(255)',
      references: 'albums',
      onDelete: 'SET NULL',
      onUpdate: 'SET NULL'
    }
  })
}

exports.down = pgm => {
  pgm.dropTable('songs')
}

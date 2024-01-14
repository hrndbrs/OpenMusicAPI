exports.up = pgm => {
  pgm.createTable('likes', {
    id: 'id',
    userId: {
      type: 'VARCHAR(100)',
      references: 'users',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    albumId: {
      type: 'VARCHAR(100)',
      references: 'albums',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  })

  pgm.addConstraint('likes', 'unique_combination3', {
    unique: ['albumId', 'userId']
  })
}

exports.down = pgm => {
  pgm.dropConstraint('likes', 'unique_combination3')

  pgm.dropTable('likes')
}

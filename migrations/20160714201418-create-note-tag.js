'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('noteTags', {
      noteId: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        references: {
            model: 'notes', // this is actually the table name, not a model name
            key: 'id',
            onUpdate: 'cascade',  // i'd say always include this ...
            onDelete: 'cascade'   // ... and this, in a join table
        }
      },
      tagId: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        references: {
            model: 'tags',
            key: 'id',
            onUpdate: 'cascade',
            onDelete: 'cascade'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('NoteTags');
  }
};
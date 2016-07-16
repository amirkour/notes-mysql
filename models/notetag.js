'use strict';
module.exports = function(sequelize, DataTypes) {
  var NoteTag = sequelize.define('NoteTag', {
    noteId: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      references: {
        model: 'Note',
        key: 'id'
      }
    },
    tagId: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      references:{
        model:'Tag',
        key:'id'
      }
    }
  }, {
    tableName: 'noteTags',
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return NoteTag;
};
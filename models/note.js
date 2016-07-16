'use strict';
module.exports = function(sequelize, DataTypes) {
  var Note = sequelize.define('Note', {
    title: {
      type: DataTypes.STRING,
      allowNull:false
    },
    body: DataTypes.TEXT
  }, {

    // if you don't include the tableName, using sequelize#sync generates
    // upper-cased table names by default, which would conflict with
    // convention in your migrations.
    tableName: 'notes', 
    classMethods: {
      associate: function(models) {

        // the 'through' and 'foreignKey' will ensure that the output of
        // sequelize#sync matches convention used in the migrations.
        // otherwise: it makes some assumptions on table names and IDs
        // (i think it defaults to upper-cased, so NoteTags and NoteId in this case.)
        this.belongsToMany(models.Tag, {through: 'noteTags', foreignKey: 'noteId'});
      }
    }
  });
  return Note;
};
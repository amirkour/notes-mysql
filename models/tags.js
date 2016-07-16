'use strict';
module.exports = function(sequelize, DataTypes) {
  var Tag = sequelize.define('Tag', {
    name: {
      type: DataTypes.STRING(32),
      allowNull: false
    }
  }, {

    // see notes in note.js for how/why to include some/all of
    // the information in this section
    tableName: 'tags',
    classMethods: {
      associate: function(models) {
        this.belongsToMany(models.Note, {through:'noteTags', foreignKey: 'tagId'});
      }
    },
    indexes: [
      {
        unique:true,
        fields: ['name']
      }
    ]
  });
  return Tag;
};
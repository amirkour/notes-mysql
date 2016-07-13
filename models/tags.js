'use strict';
module.exports = function(sequelize, DataTypes) {
  var Tags = sequelize.define('Tags', {
    name: {
      type: DataTypes.STRING(32),
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    indexes: [
      {
        unique:true,
        fields: ['name']
      }
    ]
  });
  return Tags;
};
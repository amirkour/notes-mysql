'use strict';
var db = require('../models/index.js'),
    Tags = db.Tags;

module.exports = {
  up: function (queryInterface, Sequelize) {

    return Tags.destroy({
      where:{
        name:null
      }
    }).then(function(){
      console.log("blew away null tag names");
      return queryInterface.changeColumn('tags', 'name', {
        type: Sequelize.STRING(32),
        allowNull:false
      });
    }).then(function(){
      console.log("done with update");
    }).catch(function(err){
      console.log("got this error while trying to delete null tag names: " + err);
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn('tags', 'name', {
      type: Sequelize.STRING(32),
      allowNull:true
    });
  }
};

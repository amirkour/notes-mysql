'use strict';
var db = require('../models/index.js'),
    Tag = db.Tag;

module.exports = {
  up: function (queryInterface, Sequelize) {

    // this migration is adding a restriction on the 'tags' table,
    // making the 'name' column non-nullable.  before adding that
    // restriction, all rows in the table that have name=null have to
    // be destroyed
    return Tag.destroy({
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

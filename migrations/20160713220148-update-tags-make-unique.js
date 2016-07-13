'use strict';
var db = require('../models/index.js'),
    sequelize = db.sequelize,
    Tags = db.Tags;

module.exports = {
  up: function (queryInterface, Sequelize) {
    return sequelize.query("select name, count(*) as num from tags group by name")
             .spread(function(results){
                console.log("Got " + results.length + " distinct entries in Tags db");
                var promises = [];
                results.forEach(function(result){
                  if(result.num > 1)
                    promises.push(Tags.destroy({where:{name: result.name}}));
                });

                console.log("deleting " + promises.length);
                return sequelize.Promise.all(promises);
             })
             .then(function(){
                console.log("deleted dupes ...");
                return queryInterface.changeColumn('tags', 'name', {
                  type: Sequelize.STRING(32),
                  allowNull:false,
                  unique:true
                });
             })
             .catch(function(err){
                console.log("Got this error: " + err);
             });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeIndex('tags', 'name');
  }
};

/*
 * this script uses sequelize#sync to generate database schema
 * based on model definitions.  it's not gauranteed to be consistent
 * with the migration files, but for now, i'm making an honest
 * attempt to try and keep the two methods in sync.
 *
 * for now,the preferred method of getting the database schema
 * correct is to use migrations, but this script provides a convenient
 * and quick way to test sequelize#sync
 */
var db = require('./models/index.js'),
	sequelize = db.sequelize;

sequelize.sync().then(function(){
	console.log('sync complete');
}).catch(function(err){
	console.log('got this error: ' + JSON.stringify(err));
});

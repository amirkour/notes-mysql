var db = require('./models/index.js'),
	sequelize = db.sequelize;

sequelize.sync().then(function(){
	console.log('sync complete');
}).catch(function(err){
	console.log('got this error: ' + JSON.stringify(err));
});

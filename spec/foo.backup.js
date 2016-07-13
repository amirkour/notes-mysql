process.env.NODE_ENV = 'test';

var db = require("../models/index.js"),
	Tags = db.Tags;

if(process.env){
	for(var bla in process.env){
		console.log(bla + " is " + process.env[bla]);
	}
}else{
	console.log("no process.env!?");
}
describe("foo",function(){
	it("runs a test",function(){
		expect(1).toBe(1);
	});
	it("foo",function(done){
		Tags.findAll().then(function(tags){
			expect(tags).not.toBeNull();
			expect(tags.length).toBe(0);
			done();
		}).catch(function(err){
			fail(err);
			done();
		});
	});
});

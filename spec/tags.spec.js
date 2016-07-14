'use strict';

// THIS ABSOLUTELY HAS TO COME BEFORE YOU INCLUDE models/index.js.
// OTHERWISE: YOUR TESTS WILL RUN AGAINST THE WRONG DATABASE
process.env.NODE_ENV='test';

var db	  = require(__dirname + '/../models/index.js'),
	Tag = db.Tag,
	sequelize = db.sequelize;

describe("Tag", function(){
	describe("sequelize", function(){
		it("can authenticate db", function(done){
			sequelize.authenticate()
				.then(function(){
					done();
				})
				.catch(function(err){
					fail(err);
					done();
				});
		});
	});
	describe("#validate",function(){
		describe(".name", function(){
			var name = "no dupes allowed";

			beforeAll(function(done){
				Tag.create({name: name}).then(done, function(err){
					fail(err);
					done();
				});
			});
			it("doesn't allow null name",function(done){
				var tag = Tag.build({name:null}),
					outcome = tag.validate();

				expect(outcome).not.toBeNull();
				if(outcome){
					outcome.then(function(err){
						expect(err).not.toBeNull();
						expect(typeof err.message).toBe('string');
						done();
					}, function(err){
						fail("Validation errors are returned in the success callback of a promise - how did this happen!?");
						done();
					});
				}else{
					fail("validation outcome should have been a promise");
					done();
				}
			});
			it("doesn't allow dupe name",function(done){
				Tag.create({name: name}).then(function(tag){
					fail("should not have been able to create dupe tag with name '" + name + "'");
					done();
				}).catch(function(err){
					expect(err).not.toBeNull();
					expect(typeof err.message).toBe('string');
					done();
				});
			});
		});
	});
	describe("::create",function(){
		it("doesn't allow null names",function(done){
			Tag.create({name:null}).then(function(){
				fail("creating a tag with a null name should not have succeeded");
				done();
			}).catch(function(err){
				// err looks like this:
				// {
  				// name: 'SequelizeValidationError',
				// message: 'notNull Violation: name cannot be null',
			    // errors:
			    //  [ { message: 'name cannot be null',
	    	    //      type: 'notNull Violation',
			    //      path: 'name',
			    //      value: null } ] }
				expect(err).not.toBeNull();
				done();
			});
		});
	});
	describe("::find",function(){
		describe("without any data", function(){
			beforeEach(function(done){
				Tag.truncate().then(done);
			});
			it("returns null",function(done){
				Tag.findById(1).then(function(tag){
					expect(tag).toBeNull();
					done();
				}).catch(function(err){
					fail(err);
					done;
				});
			});
		});
		describe("with data", function(){
			var testObj = null;
			beforeAll(function(done){
				function errorCB(err){
					fail(err);
					done();
				}
				Tag.create({name:'foo'}).then(function(tester){
					testObj = tester;
					done();
				}).catch(errorCB);
			});
			afterAll(function(){
				Tag.truncate();
			});
			it("returns the created object in a list", function(done){
				Tag.findAll().then(function(tags){
					expect(tags).not.toBeNull();
					expect(tags.length).toBe(1);
					expect(tags[0].name).toBe(testObj.name);
					expect(tags[0].id).toBe(testObj.id);
					done();
				}).catch(function(err){
					fail(err);
					done();
				});
			});
		});
		describe("::findAll", function(){
			describe("without data",function(){
				beforeAll(function(done){
					Tag.truncate().then(done);
				});
				it("returns an empty array", function(done){
					Tag.findAll().then(function(tags){
						expect(tags).not.toBeNull();
						expect(tags.length).toBe(0);
						done();
					}).catch(function(err){
						fail(err);
						done();
					});
				});
			});
		});
	});
});

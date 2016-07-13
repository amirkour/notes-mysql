'use strict';

// THIS ABSOLUTELY HAS TO COME BEFORE YOU INCLUDE models/index.js.
// OTHERWISE: YOUR TESTS WILL RUN AGAINST THE WRONG DATABASE
process.env.NODE_ENV='test';

var db	  = require(__dirname + '/../models/index.js'),
	Tags = db.Tags,
	sequelize = db.sequelize;

describe("Tags", function(){
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
		it("doesn't allow null name",function(done){
			var tag = Tags.build({name:null}),
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
	});
	describe("::create",function(){
		it("doesn't allow null names",function(done){
			Tags.create({name:null}).then(function(){
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
				Tags.truncate().then(done);
			});
			it("returns null",function(done){
				Tags.findById(1).then(function(tag){
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
				Tags.create({name:'foo'}).then(function(tester){
					testObj = tester;
					done();
				}).catch(errorCB);
			});
			afterAll(function(){
				Tags.truncate();
			});
			it("returns the created object in a list", function(done){
				Tags.findAll().then(function(tags){
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
					Tags.truncate().then(done);
				});
				it("returns an empty array", function(done){
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
		});
	});
});

'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);

var db	  = require(__dirname + '/../models/index.js');

console.log("db is: " + db.Tags);
var Tags = db.Tags;
var sequelize = db.sequelize;

// var sequelize = new Sequelize(config);

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

	describe("::find",function(){
		describe("without any data", function(){
			it("returns null",function(done){
				Tags.findById(1).then(function(tag){
					expect(tag).toBe(null);
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
					expect(tags).not.toBe(null);
					expect(tags.length).toBe(1);
					expect(tags[0].getDataValue('name')).toBe(testObj.getDataValue('name'));
					expect(tags[0].getDataValue('id')).toBe(testObj.getDataValue('id'));
					done();
				}).catch(function(err){
					fail(err);
					done();
				});
			});
		});
		describe("::findAll", function(){
			describe("without data",function(){
				beforeAll(function(){
					Tags.truncate();
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

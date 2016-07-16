'use strict';

// THIS ABSOLUTELY HAS TO COME BEFORE YOU INCLUDE models/index.js.
// OTHERWISE: YOUR TESTS WILL RUN AGAINST THE WRONG DATABASE
process.env.NODE_ENV='test';
require('./helpers/global.helper.js');

var db	  = require(__dirname + '/../models/index.js'),
	Note = db.Note,
	sequelize = db.sequelize,
	NoteHelper = require('./helpers/note.helper.js'),
	noteHelper = new NoteHelper(),
	TagHelper = require('./helpers/tag.helper.js'),
	tagHelper = new TagHelper();

describe("NoteTag",function(){
	describe("creating",function(){
		it("can't create dupes",function(done){
			var note = null,
				tag = null,
				promises = [noteHelper.createRandom(), tagHelper.createRandom()];

			sequelize.Promise.all(promises).spread(function(newNote,newTag){
				note = newNote;
				tag = newTag;
				return NoteTag.create({noteId: note.id, tagId: tag.id});
			}).then(function(noteTag){
				return NoteTag.create({noteId: note.id, tagId: tag.id});
			}).then(function(){
				fail("dupe note tags should not be allowed - composite primary key constraints in the db/table should prevent it");
				done();
			}).catch(function(err){
				expect(err).toEqual(jasmine.any(Error));
				done();
			});
		});
	});
});

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

describe("Note", function(){
	describe('validates', function(){
		describe("#title", function(){
			it("to not be null", function(done){
				var note = Note.build({title: null});

				note.validate().then(function(err){
					expect(err).toEqual(jasmine.any(Error));
					done();
				}).catch(function(err){
					fail("didn't expect Note#validate to throw, but it did");
					done();
				});
			});
		});
	});

	describe("tags", function(){
		describe('adding', function(){
			beforeEach(function(done){
				noteHelper.destroyAllNotes().then(done);
			});

			it('can be added via addTag', function(done){
				var note = null,
					tag = null;
				noteHelper.createRandom().then(function(newNote){
					note = newNote;
					return tagHelper.createRandom();
				}).then(function(newTag){
					tag = newTag;
					return note.addTag(tag);
				}).then(function(noteTagListOfList){

					// this is weird - sequelize returns a list in a list.  it looks like this:
					// noteTagListOfList = [
					// 	[
					// 		{ the new NoteTag }
					// 	]
					// ]
					//
					// so to get the actual NoteTag, you have to do this:
					// noteTagListOfList[0][0];
					var noteTag = noteTagListOfList[0][0];
					expect(noteTag.noteId).toBe(note.id);
					expect(noteTag.tagId).toBe(tag.id);
					done();
				}).catch(function(err){
					fail(err);
					done();
				});
			});
			it('can be added via setTags', function(done){
				var note = null,
					tag = null;
				noteHelper.createRandom().then(function(newNote){
					note = newNote;
					return tagHelper.createRandom();
				}).then(function(newTag){
					tag = newTag;
					return note.setTags( [tag] );
				}).then(function(noteTagListOfList){

					// this is weird - sequelize returns a list in a list.  it looks like this:
					// noteTagListOfList = [
					// 	[
					// 		{ the new NoteTag }
					// 	]
					// ]
					//
					// so to get the actual NoteTag, you have to do this:
					// noteTagListOfList[0][0];
					var noteTag = noteTagListOfList[0][0];
					expect(noteTag.noteId).toBe(note.id);
					expect(noteTag.tagId).toBe(tag.id);
					done();
				}).catch(function(err){
					fail(err);
					done();
				});
			});
			it("won't add the same tag twice",function(done){
				var note = null,
					tag = null;
				noteHelper.createRandom().then(function(newNote){
					note = newNote;
					return tagHelper.createRandom();
				}).then(function(newTag){
					tag = newTag;

					// add the tag once ...
					return note.addTag( tag );
				}).then(function(noteTagListOfList){

					// then try and add it again ...
					return note.addTag( tag );
				}).then(function(){

					// now fetch the note's tags
					return note.getTags();
				}).then(function(tags){

					// even though we added the same tag twice, the list of tags
					// should only be 1-long
					expect(tags.length).toBe(1);
					done();
				}).catch(function(err){
					fail(err);
					done();
				});
			});
		});// tags - adding

		describe("removing",function(){
			it("is basically a no-op if the tag doesn't belong to the note", function(done){
				var note = null,
					tag = null;

				noteHelper.createRandom().then(function(newNote){
					note = newNote;
					return tagHelper.createRandom();
				}).then(function(newTag){
					tag = newTag;

					// spam it a few times ...
					return note.removeTag(tag);
				}).then(function(){

					// ... one more time ...
					return note.removeTag(tag);
				}).then(function(){

					// ... one more time .. why not?
					return note.removeTag(tag);
				}).then(function(){

					// ... just to prove that it works
					done();
				}).catch(function(err){
					fail("removing a tag from a note should have worked, even though the tag isn't on the note");
					done();
				});
			});
			it("removes a tag that belongs to a note",function(done){
				var note = null,
					tag = null;

				noteHelper.createRandom().then(function(newNote){
					note = newNote;
					return tagHelper.createRandom();
				}).then(function(newTag){
					tag = newTag;
					return note.addTag(tag);
				}).then(function(){
					return note.getTags();
				}).then(function(tags){
					expect(tags.length).toBe(1);
					return note.removeTag(tag);
				}).then(function(){
					return note.getTags();
				}).then(function(tags){
					expect(tags.length).toBe(0);
					return note.hasTag(tag);
				}).then(function(result){
					expect(result).toBe(false);
					done();
				}).catch(function(err){
					fail("removing a tag from a note should have passed but didn't - " + err);
					done();
				})
			});
		});// tags - removing

		describe("creating/assigning on a brand new note",function(){
			it('cannot be done!', function(done){
				var tag = null,
					note = null;

				tagHelper.createRandom().then(function(newTag){
					tag = newTag;
					return Note.create({
						title: getTimestamp(),
						tags: [ tag ]
					});
				}).then(function(newNote){
					note = newNote;
					return note.getTags();
				}).then(function(tags){
					expect(tags.length).toBe(0);
					done();
				}).catch(function(err){
					fail(err);
					done();
				});
			});
		});
	});// describe tags

});

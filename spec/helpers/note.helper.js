require('./global.helper.js');

var db = require('../../models/index.js'),
	sequelize = db.sequelize,
	Note = db.Note,
	NoteTag = db.NoteTag;

var NoteHelper = function(){

}

NoteHelper.prototype.destroyAllNotes = function(){
	return NoteTag.destroy({where: ['noteId > ?', 0]}).then(function(){
		return Note.destroy({where: ['id > ?', 0]});
	});
}
NoteHelper.prototype.createRandom = function(){
	return Note.create({title: getTimestamp()});
}

module.exports = NoteHelper;

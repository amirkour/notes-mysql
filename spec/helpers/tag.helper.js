require('./global.helper.js');

var db = require('../../models/index.js'),
	sequelize = db.sequelize,
	Tag = db.Tag,
	NoteTag = db.NoteTag;

TagHelper = function(){

}
TagHelper.prototype.destroyAllTags = function(){
	return NoteTag.destroy({where: ['tagId > ?', 0]}).then(function(){
		Tag.destroy({where: ['id > ?', 0]});
	});
}
TagHelper.prototype.createRandom = function(){
	return Tag.create({name: getTimestamp()});
}

module.exports = TagHelper;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	username: { type: String, required: [ true, 'Username is required'] },
	hash: { type: String, required: true },
	salt: { type: String, required: true }
}, { timestamps: true } );

module.exports = mongoose.model('User', userSchema);

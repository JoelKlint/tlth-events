var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	username: { type: String, required: [ true, 'Username is required'] },
	__v: { type: Number, select: false },
	updatedAt: { type: Date, select: false },
	createdAt: { type: Date, select: false }
}, { timestamps: true } );

import findOrCreate from 'mongoose-findorcreate';
userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);

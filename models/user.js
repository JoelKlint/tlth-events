import { Schema } from 'mongoose';
import modelNames from './ModelNames';

const userSchema = new Schema({
	username: { type: String, required: [ true, 'Username is required'] },
	admin: { type: Schema.Types.ObjectId, ref: modelNames.Guild },
	__v: { type: Number, select: false },
	updatedAt: { type: Date, select: false },
	createdAt: { type: Date, select: false }
}, { timestamps: true } );

import findOrCreate from 'mongoose-findorcreate';
userSchema.plugin(findOrCreate);

export default userSchema;

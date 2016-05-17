import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { Guild } from './ModelNames';

const guildSchema = new Schema({
	name: {
		type: String,
		required: [true, 'A guild must have a name'],
		index: { unique: true }
	},
	__v: { type: Number, select: false },
	updatedAt: { type: Date, select: false },
	createdAt: { type: Date, select: false }
}, { timestamps: true } );

module.exports = mongoose.model(Guild, guildSchema);

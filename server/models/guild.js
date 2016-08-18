import mongoose from 'mongoose';
const Schema = mongoose.Schema;

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

export default guildSchema;

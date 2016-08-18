import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import * as modelNames from './ModelNames';

const eventSchema = new Schema({
	name: { type: String, required: [true, 'Must have a name'] },
	startDate: { type: Date, required: [true, 'Must have a start time'] },
	endDate: { type: Date, required: [true, 'Must have an end time'] },
	description: String,
	location: String,
	url: String,
	guilds: {
		type: [{ type: Schema.Types.ObjectId, ref: modelNames.Guild }],
			required: [true, 'Not a valid guild']
	},
	owner: { type: Schema.Types.ObjectId, ref: modelNames.Guild, required: true },
	__v: { type: Number, select: false },
	updatedAt: { type: Date, select: false },
	createdAt: { type: Date, select: false }
}, { timestamps: true } );

export default eventSchema;
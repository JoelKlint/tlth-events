import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { Event, Guild } from './ModelNames';

const eventSchema = new Schema({
	name: { type: String, required: [true, 'Must have a name'] },
	startDate: { type: Date, required: [true, 'Must have a start time'] },
	endDate: { type: Date, required: [true, 'Must have an end time'] },
	description: String,
	location: String,
	url: String,
	guilds: {
		type: [{ type: Schema.Types.ObjectId, ref: Guild }],
			required: [true, 'Not a valid guild']
	},
	__v: { type: Number, select: false },
	updatedAt: { type: Date, select: false },
	createdAt: { type: Date, select: false }
}, { timestamps: true } );

module.exports = mongoose.model(Event, eventSchema);

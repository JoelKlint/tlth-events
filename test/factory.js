import mongoose from 'mongoose';
import createMonky from 'monky';
const monky = new createMonky(mongoose);
import * as modelNames from '../models/modelNames';
import moment from 'moment';

monky.factory(modelNames.User, {
	username: 'testuser'
});

monky.factory({ name: 'Admin', model: modelNames.User }, {
	username: 'testuser',
	admin: monky.ref(modelNames.Guild)
})

monky.factory(modelNames.Guild, {
	name: 'Test #n'
})

monky.factory(modelNames.Event, {
	name: 'test event',
	startDate: moment().toISOString(),
	endDate: moment().add(1, 'hour').toISOString(),
	description: 'test event',
	location: 'test event',
	url: 'www.test.event',
	guilds: monky.ref(modelNames.Guild)
})

export default monky;

import winston from 'winston';

import { Event, Guild, User } from '../models';

export const clearDb = (callback) => {
	Event.remove()
	.then(() => {
		return Guild.remove();
	})
	.then(() => {
		return User.remove();
	})
	.then(() => callback())
	.catch(err => callback(err));
}

export const removeAllEventsFromDb = (callback) => {
	Event.remove()
	.then(callback())
	.catch(err => callback(err))
}



import * as mockData from './mockData';
/***************************
*	        Mocks
***************************/

import mongoose from 'mongoose';
export const generateFakeDbId = () => {
	return mockData.fakeDbId();
}

/***************************
*	        Users
***************************/
export const createSavedUser = () => {
	const userData = mockData.user();
	return User.create(userData)
}

export const createSavedAdmin = () => {
	return createSavedGuild()
	.then(guild => {
		const adminData = mockData.admin(guild.id);
		return User.create(adminData)
	})
	.then(admin => {
		return admin;
	})
	.catch(err => done(err))
}


/***************************
*	        Guilds
***************************/
export const createSavedGuild = () => {
	const guildData = mockData.guild();
	return Guild.create(guildData)
}

export const createNonSavedGuild = () => {
	const guildData = mockData.guild();
	return new Guild(req.body);
}

export const generateGuildData = () => {
	return mockData.guild();
}



/***************************
*	        Events
***************************/
export const createSavedEvent = () => {
	return createSavedAdmin()
	.then(admin => {
		const eventData = mockData.event(admin.admin, admin.admin)
		return Event.create(eventData)
	})
	.then(event => {
		return event;
	})
	.catch(err => winston.err(err))
}

export const generateEventData = (ownerId, guildIdArray) => {
	return mockData.event(ownerId, guildIdArray);
}

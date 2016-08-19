import moment from 'moment';

/**
 * Generates unique numbers
 */
let counter = 0;
const uniqueId = () => {
	return counter++;
}

/**
 * Generates MongoDB ID numbers
 */
export const fakeDbId = () => {
  return counter++
}

/**
 * Defines mockdata for an admin user
 */
export const admin = (guildId = fakeDbId()) => {
	return {
		username: 'testuser',
		admin: guildId
	}
}

/**
 * Defines mockdata for a user
 */
export const user = () => {
	return {
		username: 'testuser'
	}
}

/**
 * Defines mockdata for a guild
 */
export const guild = () => {
	return {
		name: 'testguild ' + uniqueId()
	}
}

/**
 * Defines mockdata for an event
 */
export const event = (ownerGuildId = fakeDbId(), invitedGuilds = [ fakeDbId() ]) => {
	return {
		name: 'testevent ' + uniqueId(),
		startDate: moment().toISOString(),
		endDate: moment().add(1, 'hour').toISOString(),
		description: 'description',
		location: 'location',
		url: 'www.test.event',
		owner: ownerId,
		guilds: guildIdArray
	}
}

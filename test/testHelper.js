import winston from 'winston';
import Models from '../server/models'

export const clearDb = (callback) => {
  Models.sequelize.sync({force:true})
}

export const removeAllEventsFromDb = async (callback) => {
  await Models.Event.sync({force:true})
}



import * as mockData from './mockData';
/***************************
*	        Mocks
***************************/

export const generateFakeDbId = () => {
	return mockData.fakeDbId();
}

/***************************
*	        Users
***************************/
export const createSavedUser = async () => {
	const userData = mockData.user();
  return await Models.User.create(userData)
}

export const createSavedAdmin = async () => {
  try {
    let guild = await createSavedGuild()
    let admin = await Models.User.create(mockData.admin(guild.id))
    return admin
  }
  catch(err) {
    winston.err(err)
  }
}


/***************************
*	        Guilds
***************************/
export const createSavedGuild = async () => {
	const guildData = mockData.guild();
  return await Models.Guild.create(guildData)
}

export const createNonSavedGuild = () => {
	const guildData = mockData.guild();
  return Models.Guild.build(req.body)
}

export const generateGuildData = () => {
	return mockData.guild();
}



/***************************
*	        Events
***************************/
export const createSavedEvent = async () => {
  try {
    let admin = await createSavedAdmin()
    let event = Models.Event.create(mockData.event(admin.adminGuildId, [admin.adminGuildId]))
    return event
  }
  catch(err) {
    winston.err(err)
  }
  return
}

export const generateEventData = (ownerId, guildIdArray) => {
	return mockData.event(ownerId, guildIdArray);
}

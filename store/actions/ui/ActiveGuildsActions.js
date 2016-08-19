export const ADD_OR_REMOVE_GUILD_FROM_FILTER = 'ADD_OR_REMOVE_GUILD_FROM_FILTER';

export const addOrRemoveGuildFromFilter = (guildId) => {
	return {
		type: ADD_OR_REMOVE_GUILD_FROM_FILTER,
		guildId
	}
}

export const SET_GUILD_FILTER = 'SET_GUILD_FILTER'

export const setFilter = (guildIds) => {
	return {
		type: SET_GUILD_FILTER,
		guildIds
	}
}

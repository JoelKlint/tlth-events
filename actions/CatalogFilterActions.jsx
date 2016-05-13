export const HANDLE_GUILD_CLICK = 'ADD/REMOVE_GUILD_FROM_FILTER';
export const SET_FILTER = 'SET_FILTER_GUILDS'

export const handleGuildClick = (guildId) => {
	return {
		type: HANDLE_GUILD_CLICK,
		guildId
	}
}

export const setFilter = (guilds) => {
	return {
		type: SET_FILTER,
		guilds
	}
}

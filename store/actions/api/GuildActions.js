import { CALL_API } from 'redux-api-middleware';

export const GET_ALL_GUILDS_REQUEST = 'GET_ALL_GUILDS_REQUEST';
export const GET_ALL_GUILDS_SUCCESS = 'GET_ALL_GUILDS_SUCCESS';
export const GET_ALL_GUILDS_FAILURE = 'GET_ALL_GUILDS_FAILURE';

export const getAllGuilds = () => {
	return {
		[CALL_API]: {
			endpoint: '/api/guilds',
			method: 'GET',
			types: [GET_ALL_GUILDS_REQUEST, GET_ALL_GUILDS_SUCCESS, GET_ALL_GUILDS_FAILURE]
		}
	}
}


export const MAKE_USER_ADMIN_OF_GUILD_REQUEST = 'MAKE_USER_ADMIN_OF_GUILD_REQUEST';
export const MAKE_USER_ADMIN_OF_GUILD_SUCCESS = 'MAKE_USER_ADMIN_OF_GUILD_SUCCESS';
export const MAKE_USER_ADMIN_OF_GUILD_FAILURE = 'MAKE_USER_ADMIN_OF_GUILD_FAILURE';

export const makeUserAdminOfGuild = (guildId, userId) => {
  return {
    [CALL_API]: {
      endpoint: '/api/guilds/' + guildId + '/admin',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: userId }),
      types: [
        MAKE_USER_ADMIN_OF_GUILD_REQUEST,
        MAKE_USER_ADMIN_OF_GUILD_SUCCESS,
        MAKE_USER_ADMIN_OF_GUILD_FAILURE
      ]
    }
  }
}

export const REMOVE_USER_ADMIN_OF_GUILD_REQUEST = 'REMOVE_USER_ADMIN_OF_GUILD_REQUEST';
export const REMOVE_USER_ADMIN_OF_GUILD_SUCCESS = 'REMOVE_USER_ADMIN_OF_GUILD_SUCCESS';
export const REMOVE_USER_ADMIN_OF_GUILD_FAILURE = 'REMOVE_USER_ADMIN_OF_GUILD_FAILURE';

export const removeUserAdminOfGuild = (guildId, userId) => {
  return {
    [CALL_API]: {
      endpoint: '/api/guilds/' + guildId + '/admin',
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: userId }),
      types: [
        REMOVE_USER_ADMIN_OF_GUILD_REQUEST,
        REMOVE_USER_ADMIN_OF_GUILD_SUCCESS,
        REMOVE_USER_ADMIN_OF_GUILD_FAILURE
      ]
    }
  }
}

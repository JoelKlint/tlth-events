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

import { CALL_API } from 'redux-api-middleware';

const baseUrl = 'http://localhost:3000';

export const GET_ALL_REQUEST = 'GET_ALL_GUILDS_REQUEST';
export const GET_ALL_SUCCESS = 'GET_ALL_GUILDS_SUCCESS';
export const GET_ALL_FAILURE = 'GET_ALL_GUILDS_FAILURE';

export const getAllGuilds = () => {
	return {
		[CALL_API]: {
			endpoint: baseUrl + '/guilds',
			method: 'GET',
			types: [GET_ALL_REQUEST, GET_ALL_SUCCESS, GET_ALL_FAILURE]
		}
	}
}

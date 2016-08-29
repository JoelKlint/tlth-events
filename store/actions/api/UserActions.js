import { CALL_API } from 'redux-api-middleware';

export const GET_ALL_USERS_REQUEST = 'GET_ALL_USERS_REQUEST';
export const GET_ALL_USERS_SUCCESS = 'GET_ALL_USERS_SUCCESS';
export const GET_ALL_USERS_FAILURE = 'GET_ALL_USERS_FAILURE';

export const getAllUsers = () => {
	return {
		[CALL_API]: {
			endpoint: '/api/users',
			method: 'GET',
			types: [GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS, GET_ALL_USERS_FAILURE]
		}
	}
}

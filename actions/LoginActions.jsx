import { CALL_API } from 'redux-api-middleware';

const baseUrl = 'http://localhost:3000';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const login = () => {
	return {
		[CALL_API]: {
			endpoint: baseUrl + '/login',
			method: 'GET',
			types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE]
		}
	}
}

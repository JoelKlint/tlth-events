import { LOGIN_REQUEST, LOGIN_SUCCESS } from '../../actions/LoginActions.jsx';
import Immutable, { Set } from 'immutable';

export const login = (state = new Set(), action) => {
	switch (action.type) {
		case LOGIN_REQUEST: {
			console.log('REQUEST');
			console.log(action);
			return state;
		}
		case LOGIN_SUCCESS: {
			console.log('SUCCESS');
			console.log(action);
			return state;
		}
		default:
			return state;
	}
}

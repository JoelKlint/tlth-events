import { GET_ALL_REQUEST, GET_ALL_SUCCESS, GET_ALL_FAILURE } from '../../actions/GuildActions.jsx';

import Immutable, { OrderedSet } from 'immutable';

export const guilds = (state = new OrderedSet(), action) => {
	switch (action.type) {
		case GET_ALL_SUCCESS:
			return state.union(Immutable.fromJS(action.payload).toOrderedSet());
		default:
			return state
	}
}

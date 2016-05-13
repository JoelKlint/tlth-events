import { GET_ALL_REQUEST, GET_ALL_SUCCESS, GET_ALL_FAILURE } from '../../actions/EventActions.jsx';
import { ADD_NEW_REQUEST, ADD_NEW_SUCCESS, ADD_NEW_FAILURE } from '../../actions/EventActions.jsx';

import Immutable, { Map, Set } from 'immutable';

const event = (state, action) => {
	switch (action.type) {
		case 'ADD_EVENT':
			return {
				name: action.name
			}
		default:
			return state
	}
}
const initialState = Map({ serverSide: Set(), local: Set() });

export const events = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_SUCCESS: {
			const oldState = state.get('serverSide');
			const ImmutableResponse = Immutable.fromJS(action.payload).toSet();
			const newState = oldState.union(ImmutableResponse);
			return state.set('serverSide', newState);
		}

		case ADD_NEW_REQUEST: {
			const oldState = state.get('local');
			const newState = oldState.add(action.payload.immutableEventData);
			return state.set('local', newState);
		}

		case ADD_NEW_SUCCESS: {
			const oldState = state.get('serverSide');
			const ImmutableResponse = Immutable.fromJS(action.payload);
			let newState = oldState.add(ImmutableResponse);
			newState = state.set('serverSide', newState);
			newState = newState.set('local', Set() );
			return newState;
		}

		default:
			return state
	}
}

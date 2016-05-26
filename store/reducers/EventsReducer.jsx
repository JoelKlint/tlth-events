import { GET_ALL_REQUEST, GET_ALL_SUCCESS, GET_ALL_FAILURE } from '../../actions/EventActions.jsx';
import { ADD_NEW_REQUEST, ADD_NEW_SUCCESS, ADD_NEW_FAILURE } from '../../actions/EventActions.jsx';
import { DELETE_REQUEST, DELETE_SUCCESS, DELETE_FAILURE } from '../../actions/EventActions.jsx';

import { Map, Set, fromJS } from 'immutable';

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
			const ImmutableResponse = fromJS(action.payload).toSet();
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
			const ImmutableResponse = fromJS(action.payload);
			let newState = oldState.add(ImmutableResponse);
			newState = state.set('serverSide', newState);
			newState = newState.set('local', Set() );
			return newState;
		}

		case DELETE_FAILURE: {
			console.log('Delete failure, this must be handled');
			return state;
		}

		case DELETE_SUCCESS: {
			const oldState = state.get('serverSide');
			let newState = oldState.filterNot((event) => {
				if(event.get('_id') == action.payload._id) {
					return true;
				}
				else {
					return false
				}
			});
			newState = state.set('serverSide', newState);
			return newState;
		}

		default:
			return state
	}
}

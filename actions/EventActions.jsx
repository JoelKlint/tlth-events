import { CALL_API } from 'redux-api-middleware';

export const GET_ALL_REQUEST = 'GET_ALL_EVENTS_REQUEST';
export const GET_ALL_SUCCESS = 'GET_ALL_EVENTS_SUCCESS';
export const GET_ALL_FAILURE = 'GET_ALL_EVENTS_FAILURE';

export const ADD_NEW_REQUEST = 'ADD_NEW_EVENT_REQUEST';
export const ADD_NEW_SUCCESS = 'ADD_NEW_EVENT_SUCCESS';
export const ADD_NEW_FAILURE = 'ADD_NEW_EVENT_FAILURE';

export const DELETE_REQUEST = 'DELETE_EVENT_REQUEST';
export const DELETE_SUCCESS = 'DELETE_EVENT_SUCCESS';
export const DELETE_FAILURE = 'DELETE_EVENT_FAILURE';

export const getAllEvents = () => {
	return {
		[CALL_API]: {
			endpoint: '/api/events',
			method: 'GET',
			types: [GET_ALL_REQUEST, GET_ALL_SUCCESS, GET_ALL_FAILURE]
		}
	}
}

export const addNewEvent = (ImmutableEventData) => {
	return {
		[CALL_API]: {
			endpoint: '/api/events',
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(ImmutableEventData.toJS()),
			types: [
				{
					type: ADD_NEW_REQUEST,
					payload: { immutableEventData: ImmutableEventData }
				},
				ADD_NEW_SUCCESS,
				ADD_NEW_FAILURE]
		}
	}
}

export const deleteEvent = (ImmutableEventData) => {
	return {
		[CALL_API]: {
			endpoint: '/api/events/' + ImmutableEventData.get('_id'),
			method: 'DELETE',
			types: [DELETE_REQUEST, DELETE_SUCCESS, DELETE_FAILURE]
		}
	}
}

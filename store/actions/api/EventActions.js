import { CALL_API } from 'redux-api-middleware';


export const GET_ALL_EVENTS_REQUEST = 'GET_ALL_EVENTS_REQUEST';
export const GET_ALL_EVENTS_SUCCESS = 'GET_ALL_EVENTS_SUCCESS';
export const GET_ALL_EVENTS_FAILURE = 'GET_ALL_EVENTS_FAILURE';

export const getAllEvents = () => {
	return {
		[CALL_API]: {
			endpoint: '/api/events',
			method: 'GET',
			types: [GET_ALL_EVENTS_REQUEST, GET_ALL_EVENTS_SUCCESS, GET_ALL_EVENTS_FAILURE]
		}
	}
}


export const ADD_NEW_EVENT_REQUEST = 'ADD_NEW_EVENT_REQUEST';
export const ADD_NEW_EVENT_SUCCESS = 'ADD_NEW_EVENT_SUCCESS';
export const ADD_NEW_EVENT_FAILURE = 'ADD_NEW_EVENT_FAILURE';

export const addNewEvent = (event) => {
	return {
		[CALL_API]: {
			endpoint: '/api/events',
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(event),
			types: [
				{
					type: ADD_NEW_EVENT_REQUEST,
					payload: event
				},
				ADD_NEW_EVENT_SUCCESS,
				ADD_NEW_EVENT_FAILURE
      ]
		}
	}
}


export const DELETE_EVENT_REQUEST = 'DELETE_EVENT_REQUEST';
export const DELETE_EVENT_SUCCESS = 'DELETE_EVENT_SUCCESS';
export const DELETE_EVENT_FAILURE = 'DELETE_EVENT_FAILURE';

export const deleteEvent = (event) => {
	return {
		[CALL_API]: {
			endpoint: '/api/events/' + event.id,
			method: 'DELETE',
			types: [DELETE_EVENT_REQUEST, DELETE_EVENT_SUCCESS, DELETE_EVENT_FAILURE]
		}
	}
}


export const EDIT_EVENT_REQUEST = 'EDIT_EVENT_REQUEST';
export const EDIT_EVENT_SUCCESS = 'EDIT_EVENT_SUCCESS';
export const EDIT_EVENT_FAILURE = 'EDIT_EVENT_FAILURE';

export const editEvent = (event) => {
  return {
    [CALL_API]: {
      endpoint: '/api/events/' + event.id,
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
      types: [
				{
					type: EDIT_EVENT_REQUEST,
					payload: event
				},
				EDIT_EVENT_SUCCESS,
				EDIT_EVENT_FAILURE
      ]
    }
  }
}

export const DECLINE_EVENT_INVITATION_REQUEST = 'DECLINE_EVENT_INVITATION_REQUEST';
export const DECLINE_EVENT_INVITATION_SUCCESS = 'DECLINE_EVENT_INVITATION_SUCCESS';
export const DECLINE_EVENT_INVITATION_FAILURE = 'DECLINE_EVENT_INVITATION_FAILURE';

export const declineEventInvitation = (eventId, guildId) => {
  return {
    [CALL_API]: {
      endpoint: '/api/events/' + eventId + '/invitation',
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ guildId: guildId }),
      types: [
        DECLINE_EVENT_INVITATION_REQUEST,
        DECLINE_EVENT_INVITATION_SUCCESS,
        DECLINE_EVENT_INVITATION_FAILURE
      ]
    }
  }
}

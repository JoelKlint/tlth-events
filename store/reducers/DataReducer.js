import values from 'lodash/values'
import fp from 'lodash/fp'

import {
  GET_ALL_EVENTS_REQUEST, GET_ALL_EVENTS_SUCCESS, GET_ALL_EVENTS_FAILURE,
  ADD_NEW_EVENT_REQUEST, ADD_NEW_EVENT_SUCCESS, ADD_NEW_EVENT_FAILURE,
  DELETE_EVENT_REQUEST, DELETE_EVENT_SUCCESS, DELETE_EVENT_FAILURE,
  EDIT_EVENT_REQUEST, EDIT_EVENT_SUCCESS, EDIT_EVENT_FAILURE
} from '../../actions/EventActions';

import {
  GET_ALL_GUILDS_REQUEST, GET_ALL_GUILDS_SUCCESS, GET_ALL_GUILDS_FAILURE
 } from '../../actions/GuildActions';

import { normalize, Schema, arrayOf } from 'normalizr'

const eventSchema = new Schema('events', { idAttribute: '_id' })
const guildSchema = new Schema('guilds', { idAttribute: '_id' })

eventSchema.define({
  owner: guildSchema,
  guilds: arrayOf(guildSchema)
});

const initialState = {}

export const data = (state = initialState, action) => {
	switch (action.type) {

    case GET_ALL_GUILDS_SUCCESS: {
      const response = normalize(action.payload, arrayOf(guildSchema))
      return fp.mergeAll([ {}, state, response.entities ])
    }

		case GET_ALL_EVENTS_SUCCESS: {
      const response = normalize(action.payload, arrayOf(eventSchema))
      return fp.mergeAll([ {}, state, response.entities ])
		}

		case ADD_NEW_EVENT_REQUEST: {
      const event = action.payload
      const key = event.name + event.startDate
      return fp.set(['local', key], event, state)
		}

		case ADD_NEW_EVENT_SUCCESS: {
      const event = action.payload
      const key = event.name + event.startDate
      let newState = fp.unset([ 'local', key ], state)
      const response = normalize(action.payload, eventSchema)
      return fp.mergeAll([ {}, newState, response.entities ])
		}

    case DELETE_EVENT_REQUEST: {
      // This must be handled
      return state;
    }

    case DELETE_EVENT_SUCCESS: {
      return fp.unset([ 'events', action.payload._id ], state)
		}

		case DELETE_EVENT_FAILURE: {
			// This must be handled
			return state;
		}

    case EDIT_EVENT_REQUEST: {
      // This must be handled
      return state;
    }

    case EDIT_EVENT_SUCCESS: {
      let response = normalize(action.payload, eventSchema)
      response = values(response.entities.events)
      response = response[0]
      return fp.set(['events', response._id], response, state)
    }

    case EDIT_EVENT_FAILURE: {
      // This must be handled
      return state;
    }

    default:
      return state
    }
}

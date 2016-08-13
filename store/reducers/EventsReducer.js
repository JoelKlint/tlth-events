import _ from 'lodash'

import {
  GET_ALL_REQUEST, GET_ALL_SUCCESS, GET_ALL_FAILURE,
  ADD_NEW_REQUEST, ADD_NEW_SUCCESS, ADD_NEW_FAILURE,
  DELETE_REQUEST, DELETE_SUCCESS, DELETE_FAILURE,
  EDIT_REQUEST, EDIT_SUCCESS, EDIT_FAILURE
} from '../../actions/EventActions';

const initialState = { serverSide: [], local: [] }

export const events = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_SUCCESS: {
      let newState = _.union( state.serverSide, action.payload )
      newState = _.assign({}, state, { serverSide: newState })
      return newState
		}

		case ADD_NEW_REQUEST: {
      return _.assign({}, state, { local: [ action.payload.event ] })
		}

		case ADD_NEW_SUCCESS: {
      const newEvent = action.payload
      const serverSide = _.concat(state.serverSide, newEvent)
      const localEntry = event => _.isEqual(event.name, newEvent.name)
      const local = _.reject(state.local, localEntry)
      return _.assign({}, { serverSide: serverSide, local: local })
		}

    case DELETE_REQUEST: {
      // This must be handled
      return state;
    }

		case DELETE_FAILURE: {
			// This must be handled
			return state;
		}

		case DELETE_SUCCESS: {
      const deletedEvent = event => _.isEqual(event._id, action.payload._id)
      const serverSide =  _.reject(state.serverSide, deletedEvent)
      return _.assign({}, state, { serverSide: serverSide })
		}

    case EDIT_REQUEST: {
      // This must be handled
      return state;
    }

    case EDIT_SUCCESS: {
      // Länst ut har företräde

      const eventReplacer = (event) => {
        return _.isEqual(action.payload._id, event._id) ? action.payload : event
      }
      const serverSide = _.map(state.serverSide, eventReplacer)
      return _.assign({}, state, { serverSide: serverSide })
    }

    case EDIT_FAILURE: {
      // This must be handled
      return state;
    }

    default:
      return state
    }
}

import fp from 'lodash/fp'

import { OPEN_FORM, HIDE_FORM, UPDATE_EVENT_DATA, CLEAR_EVENT_DATA } from '../../actions/AddEventViewActions';

const initialState = {
  open: false,
  event: { guilds: [] }
}

export const addEventForm = (state = initialState, action) => {
	switch (action.type) {

		case OPEN_FORM: {
      return fp.assignAll([ state, { open: true } ])
		}

    case HIDE_FORM: {
      return fp.assignAll([ state, { open: false } ])
    }

    case UPDATE_EVENT_DATA: {
      return fp.assignAll([ state, { event: action.event } ])
    }

    case CLEAR_EVENT_DATA: {
      return fp.assignAll([ state, { event: { guilds: [] } } ])
    }

		default:
			return state
	}
}

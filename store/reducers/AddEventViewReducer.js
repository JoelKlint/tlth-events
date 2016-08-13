import _ from 'lodash'

import { OPEN_FORM, HIDE_FORM, UPDATE_EVENT_DATA, CLEAR_EVENT_DATA } from '../../actions/AddEventViewActions';

const initialState = {
  open: false,
  event: { guilds: [] }
}

export const addEventForm = (state = initialState, action) => {
	switch (action.type) {

		case OPEN_FORM: {
      return _.assign({}, state, { open: true })
		}

    case HIDE_FORM: {
      return _.assign({}, state, { open: false })
    }

    case UPDATE_EVENT_DATA: {
      return _.assign({}, state, { event: action.event })
    }

    case CLEAR_EVENT_DATA: {
      return _.assign({}, state, { event: { guilds: [] } })
    }

		default:
			return state
	}
}

import { OPEN_FORM, HIDE_FORM, UPDATE_EVENT_DATA, CLEAR_EVENT_DATA } from '../../actions/AddEventViewActions';

import { Map, Set } from 'immutable';

const initialState = Map(
  {
    open: false,
    event: Map({ guilds: Set() })
  });

export const addEventForm = (state = initialState, action) => {
	switch (action.type) {

		case OPEN_FORM: {
      return state.set('open', true)
		}

    case HIDE_FORM: {
      return state.set('open', false)
    }

    case UPDATE_EVENT_DATA: {
      return state.set('event', action.ImmutableEventData)
    }

    case CLEAR_EVENT_DATA: {
      return state.set('event', Map({ guilds: Set() }))
    }

		default:
			return state
	}
}

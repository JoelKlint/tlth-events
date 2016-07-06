import { OPEN_FORM, HIDE_FORM, UPDATE_EVENT_DATA } from '../../actions/EditEventViewActions';

import { Map, Set } from 'immutable';

const initialState = Map(
  {
    open: false,
    event: Map({ guilds: Set() })
  });

export const editEventForm = (state = initialState, action) => {
	switch (action.type) {

		case OPEN_FORM: {
      let newState = state.set('event', action.ImmutableEventData)
      return newState.set('open', true)
		}

    case HIDE_FORM: {
      return state.set('open', false)
    }

    case UPDATE_EVENT_DATA: {
      return state.set('event', action.ImmutableEventData)
    }

		default:
			return state
	}
}

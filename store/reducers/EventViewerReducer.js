import { VIEW_DETAILS, HIDE_DETAILS } from '../../actions/EventDetailViewActions';

import { Map } from 'immutable';

const initialState = Map(
  {
    open: false,
    event: Map()
  });

export const eventViewer = (state = initialState, action) => {
	switch (action.type) {

		case VIEW_DETAILS: {
      let newState = state.set('event', action.ImmutableEventData)
      return newState.set('open', true)
		}

    case HIDE_DETAILS: {
      return state.set('open', false)
    }

		default:
			return state
	}
}

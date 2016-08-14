import fp from 'lodash/fp'

import { VIEW_DETAILS, HIDE_DETAILS } from '../../actions/EventDetailViewActions';

const initialState = {
  open: false,
}

export const eventViewer = (state = initialState, action) => {
	switch (action.type) {

		case VIEW_DETAILS: {
      return fp.assignAll([ state, { open: true, eventID: action.eventID } ])
		}

    case HIDE_DETAILS: {
      return fp.assignAll([ initialState, { open: false } ])
    }

		default:
			return state
	}
}

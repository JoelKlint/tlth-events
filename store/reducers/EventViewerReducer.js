import _ from 'lodash'

import { VIEW_DETAILS, HIDE_DETAILS } from '../../actions/EventDetailViewActions';

const initialState = {
  open: false,
  event: {}
}

export const eventViewer = (state = initialState, action) => {
	switch (action.type) {

		case VIEW_DETAILS: {
      return _.assign({}, state, { open: true, event: action.event })
		}

    case HIDE_DETAILS: {
      return _.assign({}, initialState, { open: false })
    }

		default:
			return state
	}
}

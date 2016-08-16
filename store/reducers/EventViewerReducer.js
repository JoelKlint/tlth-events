import assign from 'lodash/fp/assign'
import unset from 'lodash/fp/unset'

import { VIEW_DETAILS, HIDE_DETAILS } from '../../actions/EventDetailViewActions';

const initialState = {
  open: false,
}

export const eventViewer = (state = initialState, action) => {
  switch (action.type) {

    case VIEW_DETAILS: {
      return assign(state, { open: true, eventID: action.eventID })
    }

    case HIDE_DETAILS: {
      let newState = unset('eventID', state)
      return assign(newState, { open: false })
    }

    default:
      return state
  }
}

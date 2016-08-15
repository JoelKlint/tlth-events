import assign from 'lodash/fp/assign'

import { OPEN_FORM, HIDE_FORM, UPDATE_EVENT_DATA, CLEAR_EVENT_DATA } from '../../actions/AddEventViewActions';

const initialState = {
  open: false,
  event: {}
}

export const addEventForm = (state = initialState, action) => {
  const assignToState = assign(state)

  switch (action.type) {

    case OPEN_FORM: {
      return assignToState({ open: true })
    }

    case HIDE_FORM: {
      return assignToState({ open: false })
    }

    case UPDATE_EVENT_DATA: {
      return assignToState({ event: action.event })
    }

    case CLEAR_EVENT_DATA: {
      return assignToState({ event: {} })
    }

    default:
      return state
  }
}

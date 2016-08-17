import assign from 'lodash/fp/assign'
import UI from '../actions/ui'

const initialState = {
  open: false,
  event: {}
}

export const addEventForm = (state = initialState, action) => {
  const assignToState = assign(state)

  switch (action.type) {

    case UI.OPEN_ADD_EVENT_FORM: {
      return assignToState({ open: true })
    }

    case UI.HIDE_ADD_EVENT_FORM: {
      return assignToState({ open: false })
    }

    case UI.UPDATE_ADD_EVENT_FORM_DATA: {
      return assignToState({ event: action.event })
    }

    case UI.CLEAR_ADD_EVENT_FORM_DATA: {
      return assignToState({ event: {} })
    }

    default:
      return state
  }
}

import moment from 'moment'
import assign from 'lodash/fp/assign'
import UI from '../actions/ui'

const initialState = {
  open: false,
  event: {}
}

export const editEventForm = (state = initialState, action) => {
  switch (action.type) {

    case UI.OPEN_EDIT_EVENT_FORM: {
      return assign(state, { event: action.event, open: true })
    }

    case UI.HIDE_EDIT_EVENT_FORM: {
      return assign(state, { open: false })
    }

    case UI.UPDATE_EDIT_EVENT_FORM_DATA: {
      return assign(state, { event: action.event })
    }

    default:
      return state
  }
}

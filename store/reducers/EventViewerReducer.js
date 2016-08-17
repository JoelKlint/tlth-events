import assign from 'lodash/fp/assign'
import unset from 'lodash/fp/unset'
import UI from '../actions/ui'

const initialState = {
  open: false,
}

export const eventViewer = (state = initialState, action) => {
  switch (action.type) {

    case UI.VIEW_EVENT_DETAILS: {
      return assign(state, { open: true, eventID: action.eventID })
    }

    case UI.HIDE_EVENT_DETAILS: {
      let newState = unset('eventID', state)
      return assign(newState, { open: false })
    }

    default:
      return state
  }
}

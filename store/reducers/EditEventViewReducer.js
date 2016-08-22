import moment from 'moment'
import assign from 'lodash/fp/assign'
import UI from '../actions/ui'
import FormEvent from '../../objects/FormEvent'

const initialState = {
  open: false,
  event: new FormEvent()
}

export const editEventForm = (state = initialState, action) => {
  switch (action.type) {

    case UI.OPEN_EDIT_EVENT_FORM: {
      return assign(state, { open: true, event: new FormEvent(action.event.toFormEventData()) })
    }

    case UI.HIDE_EDIT_EVENT_FORM: {
      return assign(state, { open: false })
    }

    case UI.UPDATE_EDIT_EVENT_FORM_DATA: {
      return assign(state, { event: new FormEvent(action.event) })
    }

    default:
      return state
  }
}

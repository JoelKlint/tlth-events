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
      const start = splitDateAndTime(action.event.startDate)
      const end = splitDateAndTime(action.event.endDate)
      let event = assign(action.event, {
        startDate: start[0],
        startTime: start[1],
        endDate: end[0],
        endTime: end[1]
      })
      return assign(state, { event: event, open: true })
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

const splitDateAndTime = (dateTime) => {
  dateTime = moment(dateTime);

  let time = moment().set('hour', dateTime.hours())
  time = time.set('minute', dateTime.minutes())

  let date = dateTime.set('hour', 0).set('minute', 0)

  return [date.toDate(), time.toDate()]
}

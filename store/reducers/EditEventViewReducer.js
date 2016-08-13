import moment from 'moment'
import _ from 'lodash'

import { OPEN_FORM, HIDE_FORM, UPDATE_EVENT_DATA } from '../../actions/EditEventViewActions';

const initialState = {
  open: false,
  event: {
    guilds: []
  }
}

export const editEventForm = (state = initialState, action) => {
	switch (action.type) {

		case OPEN_FORM: {
      const start = splitDateAndTime(action.event.startDate)
      const end = splitDateAndTime(action.event.endDate)
      let event = _.assign({}, action.event)
      event.startDate = start[0];
      event.startTime = start[1];
      event.endDate = end[0];
      event.endTime = end[1];
      return _.assign({}, state, { event: event, open: true })
		}

    case HIDE_FORM: {
      return _.assign({}, state, { open: false })
    }

    case UPDATE_EVENT_DATA: {
      return _.assign({}, state, { event: action.event })
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

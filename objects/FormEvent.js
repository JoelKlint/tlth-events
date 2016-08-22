import moment from 'moment'
import flow from 'lodash/fp/flow'
import omit from 'lodash/fp/omit'
import set from 'lodash/fp/set'
import assign from 'lodash/fp/assign'
import toString from 'lodash/fp/toString'
import isDate from 'lodash/fp/isDate'
import includes from 'lodash/includes'
import Event from './Event'
import omitBy from 'lodash/fp/omitBy'
import isNil from 'lodash/fp/isNil'

function FormEvent(event) {
  const newCopy = omitBy(isNil, event)
  Event.call(this, newCopy)
  this.startTime = newCopy.startTime
  this.endTime = newCopy.endTime

}

FormEvent.prototype = Object.create(Event.prototype);
FormEvent.prototype.constructor = FormEvent
/*
* Helper methods
*/
FormEvent.prototype.toEvent = function() {
  const convertObject = flow(
    omit([ 'startTime', 'endTime' ]),
    set('startDate', mergeDateAndTime(this.startDate, this.startTime)),
    set('endDate', mergeDateAndTime(this.endDate, this.endTime))
  )
  const eventData = assign({}, convertObject(this))
  return new Event(eventData)
}

FormEvent.prototype.isValid = function(userAdminGuildId) {
  if( toString(this.name).length < 1 ) {
    return false
  }

  // Validate startDate
  if( !isDate(this.startDate) ) {
    return false
  }

  // Validate startTime
  if( !isDate(this.startTime) ) {
    return false
  }

  // Validate endDate
  if( !isDate(this.endDate) ) {
    return false
  }

  // Validate endTime
  if( !isDate(this.endTime) ) {
    return false
  }

  // Validate guilds
  if( !includes(this.invitedGuilds, userAdminGuildId) ) {
    return false
  }

  return true
}

FormEvent.prototype.getErrorMessage = function(userAdminGuildId) {
  // Validate name
  if( toString(this.name).length < 1 ) {
    return 'You must enter a name'
  }

  // Validate startDate
  if( !isDate(this.startDate) ) {
    return 'You must enter a start date'
  }

  // Validate startTime
  if( !isDate(this.startTime) ) {
    return 'You must enter a start time'
  }

  // Validate endDate
  if( !isDate(this.endDate) ) {
    return 'You must enter an end date'
  }

  // Validate endTime
  if( !isDate(this.endTime) ) {
    return 'You must enter an end time'
  }

  // Validate guilds
  if( !includes(this.invitedGuilds, userAdminGuildId) ) {
    return 'You must enter your own guild'
  }

  return
}

const mergeDateAndTime = (date, time) => {
  date = moment(date.toISOString());
	time = moment(time.toISOString());
	let dateTime = date.add(time.hours(), 'hours');
	dateTime = date.add(time.minutes(), 'minutes');
	return dateTime.toISOString();
}

export default FormEvent

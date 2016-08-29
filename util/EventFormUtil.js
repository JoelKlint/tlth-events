import toString from 'lodash/toString'
import isDate from 'lodash/isDate'
import includes from 'lodash/includes'
import omit from 'lodash/fp/omit'
import set from 'lodash/fp/set'
import flow from 'lodash/fp/flow'
import map from 'lodash/fp/map'
import unset from 'lodash/fp/unset'
import omitBy from 'lodash/fp/omitBy'
import isEmpty from 'lodash/fp/isEmpty'
import moment from 'moment'

// Merge date and time object into one unified date object
const mergeDateAndTime = (date, time) => {
  date = moment(date.toISOString());
	time = moment(time.toISOString());
	let dateTime = date.add(time.hours(), 'hours');
	dateTime = date.add(time.minutes(), 'minutes');
	return dateTime.toISOString();
}

// Validate form data. Returns true if form is valid
export const validateFormData = (event, adminGuildId) => {

  // Validate name
  if( toString(event.name).length < 1 ) {
    alert('You must enter a name')
    return false;
  }

  // Validate startDate
  if( !isDate(event.startDate) ) {
    alert('You must enter a start date')
    return false;
  }

  // Validate startTime
  if( !isDate(event.startTime) ) {
    alert('You must enter a start time')
    return false;
  }

  // Validate endDate
  if( !isDate(event.endDate) ) {
    alert('You must enter an end date')
    return false;
  }

  // Validate endTime
  if( !isDate(event.endTime) ) {
    alert('You must enter an end time')
    return false;
  }

  // Validate guilds
  if( !includes(event.invitedGuilds, adminGuildId) ) {
    alert('You must enter your own guild')
    return false
  }

  return true
}


// Converts the Event form data to an Event Object
const toEventObject = (event) => {
  const convertObject = flow(
    omit([ 'startTime', 'endTime' ]),
    set('startDate', mergeDateAndTime(event.startDate, event.startTime)),
    set('endDate', mergeDateAndTime(event.endDate, event.endTime))
  )
  return convertObject(event)
}

export const toApiData = (event) => {
  let response = toEventObject(event)
  return omitBy(isEmpty, response)
}

// Unpopulates an event object. Use this prior to loading the EventForm with data
export const unpopulateEventObject = (event) => {
  const replaceWithIds = map(guild => guild.id)
  event.invitedGuilds = replaceWithIds(event.invitedGuilds)
  event = unset('owner', event)
  return event
}

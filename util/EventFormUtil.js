import _ from 'lodash'
import moment from 'moment'

// Merge date and time object into one unified date object
const mergeDateAndTime = (date, time) => {
  date = moment(date);
	time = moment(time);
	let dateTime = date.add(time.hours(), 'hours');
	dateTime = date.add(time.minutes(), 'minutes');
	return dateTime.toISOString();
}

// Validate form data. Returns true if form is valid
export const validateFormData = (event, adminGuild) => {

  // Validate name
  if( _.toString(event.name).length < 1 ) {
    alert('You must enter a name')
    return false;
  }

  // Validate startDate
  if( !_.isDate(event.startDate) ) {
    alert('You must enter a start date')
    return false;
  }

  // Validate startTime
  if( !_.isDate(event.startTime) ) {
    alert('You must enter a start time')
    return false;
  }

  // Validate endDate
  if( !_.isDate(event.endDate) ) {
    alert('You must enter an end date')
    return false;
  }

  // Validate endTime
  if( !_.isDate(event.endTime) ) {
    alert('You must enter an end time')
    return false;
  }

  // Validate guilds
  if( !_.some(event.guilds, adminGuild) ) {
    alert('You must enter your own guild')
    return false
  }

  return true
}

// Converts the Event form data to an Event Object
export const convertToEventObject = (event) => {
  event = _.assign({}, event)
  event.startDate = mergeDateAndTime(event.startDate, event.startTime)
  event.endDate = mergeDateAndTime(event.endDate, event.endTime)

  return _.omit(event, 'startTime', 'endTime')
}

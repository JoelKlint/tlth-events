import assign from 'lodash/fp/assign'
import clone from 'lodash/fp/clone'
import map from 'lodash/fp/map'
import moment from 'moment'
import omitBy from 'lodash/fp/omitBy'
import isNil from 'lodash/fp/isNil'

function Event(event) {
  const newCopy = omitBy(isNil, event)
  this.id = newCopy.id
  this.name = newCopy.name
  this.description = newCopy.description
  this.location = newCopy.location
  this.startDate = newCopy.startDate
  this.endDate = newCopy.endDate
  this.url = newCopy.url
  this.invitedGuilds = newCopy.invitedGuilds
  this.ownerGuild = newCopy.ownerGuild
}

Event.prototype.contructor = Event

/*
* Helper methods
*/

Event.prototype.getDateAsString = function() {
  const dateFormat = 'D MMM';
  const startDate = moment(this.startDate);
  const endDate = moment(this.endDate);
  let dateString = startDate.format(dateFormat);
  if(endDate.isAfter(startDate, 'day')) {
    dateString += ' - ' + endDate.format(dateFormat);
  }
  return dateString
}

Event.prototype.getTimeAsString = function() {
  const timeFormat = 'HH:mm'
  const startTime = moment(this.startDate).format(timeFormat);
  const endTime = moment(this.endDate).format(timeFormat);
  const timeString =  startTime + ' - ' + endTime;
  return timeString
}

Event.prototype.toFormEventData = function() {
  const start = splitDateAndTime(this.startDate)
  const end = splitDateAndTime(this.endDate)
  let formEventData = assign(this, {
    startDate: start[0],
    startTime: start[1],
    endDate: end[0],
    endTime: end[1]
  })
  return formEventData
}

Event.prototype.unpopulate = function() {
  let newEvent = clone(this)
  newEvent.invitedGuilds = newEvent.invitedGuilds.map(guild => guild.id)
  newEvent.ownerGuild = newEvent.ownerGuild.id
  return newEvent
}

const splitDateAndTime = (dateTime) => {
  dateTime = moment(dateTime);
  let time = moment().set('hour', dateTime.hours())
  time = time.set('minute', dateTime.minutes())
  let date = dateTime.set('hour', 0).set('minute', 0)
  return [date.toDate(), time.toDate()]
}

export default Event;

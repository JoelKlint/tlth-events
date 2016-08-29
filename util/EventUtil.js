import isEqual from 'lodash/fp/isEqual'
import isNil from 'lodash/fp/isNil'
import map from 'lodash/fp/map'
import join from 'lodash/fp/join'
import flow from 'lodash/fp/flow'
import get from 'lodash/fp/get'
import assign from 'lodash/fp/assign'
import includes from 'lodash/fp/includes'
import moment from 'moment'

export const mayUserDeclineInvitation = (event, user) => {
  if(isNil(event) || isNil(user)) {
    return false
  }
  if( isEqual(event.ownerGuild.id, user.adminGuildId) ) {
    return false
  }
  const userAdminGuildId = user.adminGuildId
  const invitedGuilds = map(guild => guild.id)(event.invitedGuilds)
  return includes(userAdminGuildId, invitedGuilds)
}

const splitDateAndTime = (dateTime) => {
  dateTime = moment(dateTime);
  let time = moment().set('hour', dateTime.hours())
  time = time.set('minute', dateTime.minutes())
  let date = dateTime.set('hour', 0).set('minute', 0)
  return [date.toDate(), time.toDate()]
}

export const toFormEventData = (event) => {
  const start = splitDateAndTime(event.startDate)
  const end = splitDateAndTime(event.endDate)
  let formEventData = assign(event, {
    startDate: start[0],
    startTime: start[1],
    endDate: end[0],
    endTime: end[1]
  })
  formEventData.invitedGuilds = map(guild => guild.id)(formEventData.invitedGuilds)
  formEventData.ownerGuild = formEventData.ownerGuild.id
  return formEventData
}

export const isNotSaved = (event) => {
  return event.local === true
}

export const mayUserEdit = (event, user) => {
  if(isNil(event) || isNil(user)) {
    return false
  }
  const userAdminGuildId = user.adminGuildId
  const eventOwnerGuildId = event.ownerGuildId
  return isEqual(userAdminGuildId, eventOwnerGuildId) || isNotSaved(event)
}

export const hasAttendingGuilds = (event) => {
  return event.invitedGuilds ? true : false
}

export const getGuildNamesAsString = (event) => {
  const format = flow(
    map(guild => guild.name),
    join(' ')
  )
  return format(event.invitedGuilds)
}

export const getName = (event) => {
  return get('name', event)
}

export const getOwnerGuildAsString = (event) => {
  return get('ownerGuild.name', event)
}

export const getDateAsString = (event) => {
  const dateFormat = 'D MMM';
  const startDate = moment(event.startDate);
  const endDate = moment(event.endDate);
  let dateString = startDate.format(dateFormat);
  if(endDate.isAfter(startDate, 'day')) {
    dateString += ' - ' + endDate.format(dateFormat);
  }
  return dateString
}

export const getTimeAsString = (event) => {
  const timeFormat = 'HH:mm'
  const startTime = moment(event.startDate).format(timeFormat);
  const endTime = moment(event.endDate).format(timeFormat);
  return startTime + ' - ' + endTime;
}

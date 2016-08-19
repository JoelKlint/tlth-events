import isEqual from 'lodash/fp/isEqual'
import isNil from 'lodash/fp/isNil'
import map from 'lodash/fp/map'
import join from 'lodash/fp/join'
import flow from 'lodash/fp/flow'
import get from 'lodash/fp/get'
import moment from 'moment'

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

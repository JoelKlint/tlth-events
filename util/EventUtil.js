import isEqual from 'lodash/fp/isEqual'
import isNil from 'lodash/fp/isNil'

export const isNotSaved = (event) => {
  return event.local === true
}

export const mayUserEdit = (event, user) => {
  if(isNil(event) || isNil(user)) {
    return false
  }
  const userAdmin = user.admin
  const eventOwner = event.owner
  return isEqual(userAdmin, eventOwner) || isNotSaved(event)
}

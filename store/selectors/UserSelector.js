import { createSelector } from 'reselect'
import isEmpty from 'lodash/fp/isEmpty'
import isNil from 'lodash/fp/isNil'
import has from 'lodash/has'

export const getLoggedInUser = (state) => state.user

export const getAdminGuildId = (state) => state.user.adminGuildId

export const isLoggedInUserAdmin = createSelector(
  [ getLoggedInUser ],
  (loggedInUser) => {
    return has(loggedInUser, 'adminGuildId') && !isNil(loggedInUser.adminGuildId)
  }
)

export const isUserLoggedIn = createSelector(
  [ getLoggedInUser ],
  (loggedInUser) => {
    return !isEmpty(loggedInUser)
  }
)

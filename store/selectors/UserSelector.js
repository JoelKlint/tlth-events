import { createSelector } from 'reselect'
import has from 'lodash/has'

export const getLoggedInUser = (state) => state.user

export const getAdminGuildId = (state) => state.user.adminGuildId

export const isLoggedInUserAdmin = createSelector(
  [ getLoggedInUser ],
  (loggedInUser) => {
    return has(loggedInUser, 'adminGuildId')
  }
)

export const isUserLoggedIn = createSelector(
  [ getLoggedInUser ],
  (loggedInUser) => {
    return has(loggedInUser, 'username')
  }
)

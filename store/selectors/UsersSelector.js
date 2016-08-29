import { createSelector } from 'reselect'
import values from 'lodash/fp/values'

import { getAdminGuildId } from './UserSelector'
import { _getAllGuildsAsMap } from './GuildSelector'

const _getAllUsersAsMap = (state) => state.data.users

export const getAllUsers = createSelector(
  [ _getAllUsersAsMap ],
  ( allUsers ) => {
    return values(allUsers)
  }
)

export const getAllAdminsOfCurrentAdminGuild = createSelector(
  [ _getAllUsersAsMap, getAdminGuildId, _getAllGuildsAsMap ],
  ( allUsers, adminGuildId, allGuilds ) => {
    const adminIds = allGuilds[adminGuildId].administrators
    let adminUsers = []
    adminIds.forEach(id => adminUsers.push(allUsers[id]))
    return adminUsers
  }
)

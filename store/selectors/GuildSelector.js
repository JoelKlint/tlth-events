import { createSelector } from 'reselect'
import values from 'lodash/fp/values'
import map from 'lodash/fp/map'

export const getAllGuilds = (state) => state.data.guilds
export const getActiveGuilds = (state) => state.activeGuilds

export const getAllActiveGuildNames = createSelector(
  [ getAllGuilds, getActiveGuilds ],
  (allGuilds, activeGuilds) => {
    const format = map(guild => allGuilds[guild].name)
    return format(activeGuilds)
  }
)

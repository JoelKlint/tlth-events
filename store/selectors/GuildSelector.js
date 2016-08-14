import { createSelector } from 'reselect'
import values from 'lodash/values'
import fp from 'lodash/fp'

const getAllGuilds = (state) => state.data.guilds
const getActiveGuilds = (state) => state.activeGuilds

export const getAllActiveGuildNames = createSelector(
  [ getAllGuilds, getActiveGuilds ],
  (allGuilds, activeGuilds) => {
    const format = fp.map(guild => allGuilds[guild].name)
    return format(activeGuilds)
  }
)

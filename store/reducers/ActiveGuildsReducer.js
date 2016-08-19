import includes from 'lodash/fp/includes'
import without from 'lodash/fp/without'
import concat from 'lodash/fp/concat'
import clone from 'lodash/fp/clone'
import UI from '../actions/ui'

const initialState = []

export const activeGuilds = (state = initialState, action) => {
  switch (action.type) {

    case UI.ADD_OR_REMOVE_GUILD_FROM_FILTER: {
      const guild = action.guildId
      return includes(guild, state) ? without([ guild ], state) : concat(state, guild)
    }

    case UI.SET_GUILD_FILTER: {
      return clone(action.guildIds)
    }

    default:
      return state;
  }
}

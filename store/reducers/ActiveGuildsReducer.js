import includes from 'lodash/fp/includes'
import without from 'lodash/fp/without'
import concat from 'lodash/fp/concat'
import clone from 'lodash/fp/clone'

import { HANDLE_GUILD_CLICK, SET_FILTER } from '../../actions/ActiveGuildsActions';

const initialState = []

export const activeGuilds = (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_GUILD_CLICK: {
      const guild = action.guildId
      return includes(guild, state) ? without([ guild ], state) : concat(state, guild)
    }
    case SET_FILTER: {
      return clone(action.guilds)
    }
    default:
      return state;
  }
}

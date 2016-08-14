import fp from 'lodash/fp'

import { HANDLE_GUILD_CLICK, SET_FILTER } from '../../actions/ActiveGuildsActions';

const initialState = []

export const activeGuilds = (state = initialState, action) => {
	switch (action.type) {
		case HANDLE_GUILD_CLICK: {
      const guild = action.guildId
      return fp.includes(guild, state) ? fp.without([ guild ], state) : fp.concat(state, guild)
		}
		case SET_FILTER: {
      return fp.assign([], [ action.guilds ] )
		}
		default:
			return state;
	}
}

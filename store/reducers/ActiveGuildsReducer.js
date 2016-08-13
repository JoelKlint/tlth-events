import _ from 'lodash'

import { HANDLE_GUILD_CLICK, SET_FILTER } from '../../actions/ActiveGuildsActions';

const initialState = []

export const activeGuilds = (state = initialState, action) => {
	switch (action.type) {
		case HANDLE_GUILD_CLICK: {
      const guild = action.guildId
      return _.includes(state, guild) ? _.without(state, guild) : _.concat(state, guild)
		}
		case SET_FILTER: {
      return _.assign([], [ action.guilds ])
		}
		default:
			return state;
	}
}

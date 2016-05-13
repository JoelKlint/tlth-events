import { HANDLE_GUILD_CLICK, SET_FILTER } from '../../actions/CatalogFilterActions.jsx';
import Immutable, { Set } from 'immutable';

export const activeGuilds = (state = new Set(), action) => {
	switch (action.type) {
		case HANDLE_GUILD_CLICK: {
			const guild = Immutable.fromJS(action.guildId);
			return state.includes(guild) ? state.delete(guild): state.add(guild);
		}
		case SET_FILTER: {
			return Immutable.fromJS(action.guilds).toSet();
		}
		default:
			return state;
	}
}

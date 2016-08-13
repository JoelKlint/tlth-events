import { getAllGuilds } from './GuildActions';
import { setFilter } from './ActiveGuildsActions';

export const getAllGuildsAndSetAsFilter = () => {
	return (dispatch, getState) => {
		return dispatch(getAllGuilds()).then((guilds) => dispatch(setFilter(guilds.payload)));
	}
}

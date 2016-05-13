import { getAllGuilds } from './GuildActions.jsx';
import { setFilter } from './CatalogFilterActions.jsx';

export const getAllGuildsAndSetAsFilter = () => {
	return (dispatch, getState) => {
		return dispatch(getAllGuilds()).then((guilds) => dispatch(setFilter(guilds.payload)));
	}
}

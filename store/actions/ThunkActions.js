import UI from './ui'
import API from './api'

export const getAllGuildsAndSetAsFilter = () => {
	return (dispatch, getState) => {
		return dispatch(
      API.getAllGuilds())
      .then((guilds) => dispatch(UI.setFilter(guilds.payload)));
	}
}

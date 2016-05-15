import { combineReducers } from 'redux';
import { events } from './EventsReducer.jsx';
import { guilds } from './GuildsReducer.jsx';
import { activeGuilds } from './CatalogFilterReducer.jsx';

const reducer = combineReducers({
	events,
	guilds,
	activeGuilds
})

export default reducer;
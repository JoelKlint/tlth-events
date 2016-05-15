import { combineReducers } from 'redux';
import { events } from './EventsReducer.jsx';
import { guilds } from './GuildsReducer.jsx';
import { activeGuilds } from './CatalogFilterReducer.jsx';
import { user } from './UserReducer';

const reducer = combineReducers({
	events,
	guilds,
	activeGuilds,
	user
})

export default reducer;

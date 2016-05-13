import { combineReducers } from 'redux';
import { events } from './EventsReducer.jsx';
import { guilds } from './GuildsReducer.jsx';
import { activeGuilds } from './CatalogFilterReducer.jsx';
import { login } from './LoginReducer.jsx';

const rootReducer = combineReducers({
	events,
	guilds,
	activeGuilds,
	login
})

export default rootReducer;

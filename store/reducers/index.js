import { combineReducers } from 'redux';
import { events } from './EventsReducer.jsx';
import { guilds } from './GuildsReducer.jsx';
import { activeGuilds } from './CatalogFilterReducer.jsx';
import { user } from './UserReducer';
import { eventViewer } from './EventViewerReducer'
import { addEventForm } from './AddEventViewReducer'
import { editEventForm } from './EditEventViewReducer'

const reducer = combineReducers({
	events,
	guilds,
	activeGuilds,
	user,
  eventViewer,
  addEventForm,
  editEventForm
})

export default reducer;

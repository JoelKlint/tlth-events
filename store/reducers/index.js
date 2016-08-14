import { combineReducers } from 'redux';
// import { events } from './EventsReducer';
// import { guilds } from './GuildsReducer';
import { data } from './DataReducer'
import { activeGuilds } from './ActiveGuildsReducer';
import { user } from './UserReducer';
import { eventViewer } from './EventViewerReducer'
import { addEventForm } from './AddEventViewReducer'
import { editEventForm } from './EditEventViewReducer'

const reducer = combineReducers({
  data, 
	activeGuilds,
	user,
  eventViewer,
  addEventForm,
  editEventForm
})

export default reducer;

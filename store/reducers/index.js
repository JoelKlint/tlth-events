import { combineReducers } from 'redux';
import { data } from './DataReducer'
import { activeGuilds } from './ActiveGuildsReducer';
import { user } from './UserReducer';
import { eventViewer } from './EventViewerReducer'
import { addEventForm } from './AddEventViewReducer'
import { editEventForm } from './EditEventViewReducer'
import UI from './UIReducer'

const reducer = combineReducers({
  data,
  activeGuilds,
  user,
  eventViewer,
  addEventForm,
  editEventForm,
	UI
})

export default reducer;

import assignAll from 'lodash/fp/assignAll'

import * as ActiveGuilds from './ActiveGuildsActions'
import * as AddEventView from './AddEventViewActions'
import * as EditEventView from './EditEventViewActions'
import * as EventDetailView from './EventDetailViewActions'
import * as UI from './UIActions'


export default assignAll([
  ActiveGuilds,
  AddEventView,
  EditEventView,
  EventDetailView,
	UI
])

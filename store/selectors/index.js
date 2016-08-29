import assignAll from 'lodash/fp/assignAll'

import * as Event from './EventsSelector'
import * as Guild from './GuildSelector'
import * as AddEventForm from './AddEventFormSelector'
import * as EditEventForm from './EditEventFormSelector'
import * as User from './UserSelector'
import * as EventViewer from './EventViewerSelector'
import * as UI from './UISelector'
import * as Users from './UsersSelector'


export default assignAll([
  Event,
  Guild,
  AddEventForm,
  EditEventForm,
  User,
  EventViewer,
	UI,
  Users
])

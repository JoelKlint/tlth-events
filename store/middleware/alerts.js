import createActionSpy from '../actionSpy'
import Alert from 'react-s-alert';

import {
  ADD_NEW_EVENT_SUCCESS, ADD_NEW_EVENT_FAILURE,
  DELETE_EVENT_SUCCESS, DELETE_EVENT_FAILURE,
  EDIT_EVENT_SUCCESS, EDIT_EVENT_FAILURE
} from '../../actions/EventActions'

const agent = {
	[ADD_NEW_EVENT_SUCCESS]: (action) => {
		Alert.success('Event created')
	},
  [ADD_NEW_EVENT_FAILURE]: (action) => {
		Alert.error('Event could not be saved')
	},
  [DELETE_EVENT_SUCCESS]: (action) => {
		Alert.success('Event deleted')
	},
  [DELETE_EVENT_FAILURE]: (action) => {
		Alert.error('Event could not be deleted')
	},
  [EDIT_EVENT_SUCCESS]: (action) => {
		Alert.success('Event saved')
	},
  [EDIT_EVENT_FAILURE]: (action) => {
		Alert.failure('Event could not be saved')
	}
}

const alertSpy = createActionSpy(agent)

export default alertSpy

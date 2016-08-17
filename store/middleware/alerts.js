import createActionSpy from '../actionSpy'
import Alert from 'react-s-alert';
import API from '../actions/api'

const agent = {
	[API.ADD_NEW_EVENT_SUCCESS]: (action) => {
		Alert.success('Event created')
	},
  [API.ADD_NEW_EVENT_FAILURE]: (action) => {
		Alert.error('Event could not be saved')
	},
  [API.DELETE_EVENT_SUCCESS]: (action) => {
		Alert.success('Event deleted')
	},
  [API.DELETE_EVENT_FAILURE]: (action) => {
		Alert.error('Event could not be deleted')
	},
  [API.EDIT_EVENT_SUCCESS]: (action) => {
		Alert.success('Event saved')
	},
  [API.EDIT_EVENT_FAILURE]: (action) => {
		Alert.error('Event could not be saved')
	}
}

const alertSpy = createActionSpy(agent)

export default alertSpy

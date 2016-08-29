import assign from 'lodash/fp/assign'
import Actions from '../actions/ui'

let initialState = {
	mainView: 'Calendar'
}

const UI = (state = initialState, action) => {
  switch(action.type) {

		case Actions.SHOW_CALENDAR_VIEW: {
			return assign(state, { mainView: 'Calendar' })
		}

		case Actions.SHOW_DASHBOARD_VIEW: {
			return assign(state, { mainView: 'Dashboard' })
		}

    default:
      return state
  }
}

export default UI

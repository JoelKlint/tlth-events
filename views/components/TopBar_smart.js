import { connect } from 'react-redux'
import TopBar from './TopBar.jsx'
import { getSubscribeLink } from '../../util/SubscribeUtil'
import UI from '../../store/actions/ui'
import Selector from '../../store/selectors'

let currentMainView

const mapStateToProps = (state) => {
	currentMainView = Selector.getCurrentMainView(state)

	return {
    loggedIn: Selector.isUserLoggedIn(state),
    userIsAdmin: Selector.isLoggedInUserAdmin(state),
    subscribeLink: getSubscribeLink(state),
		mainViewSwitchLabel: currentMainView === 'Calendar' ? 'Dashboard' : 'Calendar',
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
    openEventEditor: () => {
      dispatch(UI.openAddEventForm())
    },
		openDashboard: () => {
			dispatch(UI.showDashboardView())
		},
		changeMainView: () => {
			if(currentMainView === 'Calendar') {
				dispatch(UI.showDashboardView())
			}
			else {
				dispatch(UI.showCalendarView())
			}
		}
	}
}

const TopBar_smart = connect(mapStateToProps, mapDispatchToProps)(TopBar);

export default TopBar_smart;

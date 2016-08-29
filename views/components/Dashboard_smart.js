import { connect } from 'react-redux'
import Dashboard from './Dashboard.jsx'
import UI from '../../store/actions/ui'
import API from '../../store/actions/api'
import Selector from '../../store/selectors'

let currentGuildId

const mapStateToProps = (state) => {

  currentGuildId = Selector.getAdminGuildId(state)

	return {
    currentView: Selector.getCurrentMainView(state),
    eventsHostedByAdminGuild: Selector.getEventsHostedByAdminSorted(state),
    adminsOfCurrentAdminGuild: Selector.getAllAdminsOfCurrentAdminGuild(state),
    allUsers: Selector.getAllUsers(state)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
    viewEventDetails: (eventId) => {
      dispatch(UI.viewEventDetails(eventId))
    },
    getAllUsers: () => {
      dispatch(API.getAllUsers())
    },
    makeUserAdmin: (userId) => {
      dispatch(API.makeUserAdminOfGuild(currentGuildId, userId))
    },
    deleteUserAdmin: (userId) => {
      dispatch(API.removeUserAdminOfGuild(currentGuildId, userId))
    }
	}
}

const Dashboard_smart = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

export default Dashboard_smart;

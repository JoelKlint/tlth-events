import { connect } from 'react-redux'
import Dashboard from './Dashboard.jsx'
import UI from '../../store/actions/ui'
import Selector from '../../store/selectors'

const mapStateToProps = (state) => {
	return {
    currentView: Selector.getCurrentMainView(state),
    eventsHostedByAdminGuild: Selector.getEventsHostedByAdminSorted(state)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
    viewEventDetails: (eventId) => {
      dispatch(UI.viewEventDetails(eventId))
    }
	}
}

const Dashboard_smart = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

export default Dashboard_smart;

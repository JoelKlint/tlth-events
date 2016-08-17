import { connect } from 'react-redux';
import App from './App.jsx';
import values from 'lodash/values';
import Selector from '../../store/selectors'
import API from '../../store/actions/api'
import UI from '../../store/actions/ui'

const mapStateToProps = (state) => {

	return {
    events: Selector.getVisibleEvents(state),
    guilds: Selector.getAllGuilds(state),
		activeGuilds: Selector.getActiveGuilds(state)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getAllEvents: () => {
			dispatch(API.getAllEvents());
		},
		getAllGuilds: () => {
			dispatch(API.getAllGuilds());
		},
		handleGuildClick: (guild) => {
			dispatch(UI.addOrRemoveGuildFromFilter(guild));
		},
    viewEventDetails: (event) => {
      dispatch(UI.viewEventDetails(event._id));
    }
	}
}

const VisibleApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default VisibleApp

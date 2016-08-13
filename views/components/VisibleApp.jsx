import { connect } from 'react-redux';
import App from './App.jsx';
import { getAllEvents } from '../../actions/EventActions';
import { viewEventDetails } from '../../actions/EventDetailViewActions'
import { getAllGuilds } from '../../actions/GuildActions';
import { handleGuildClick } from '../../actions/ActiveGuildsActions';
import { openAddEventForm } from '../../actions/AddEventViewActions'
import _ from 'lodash';

const getVisibleEvents = (events, activeGuilds) => {
  return _.filter(events, (event) => {
    return _.some(event.guilds, (guild) => {
      return _.includes(activeGuilds, guild._id)
    })
  })
}

const mapStateToProps = (state) => {
	const visibleSavedEvents = getVisibleEvents(state.events.serverSide, state.activeGuilds);
	return {
		events: _.concat(visibleSavedEvents, state.events.local),
		guilds: state.guilds,
		activeGuilds: state.activeGuilds,
		user: state.user
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
    openAddEventForm: () => {
      dispatch(openAddEventForm())
    },
		getAllEvents: () => {
			dispatch(getAllEvents());
		},
		getAllGuilds: () => {
			dispatch(getAllGuilds());
		},
		handleGuildClick: (guild) => {
			dispatch(handleGuildClick(guild));
		},
    viewEventDetails: (event) => {
      event.startDate = event.startDate.toISOString();
  		event.endDate = event.endDate.toISOString();
      dispatch(viewEventDetails(event));
    }
	}
}

const VisibleApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default VisibleApp

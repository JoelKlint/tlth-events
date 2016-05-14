import { connect } from 'react-redux';
import App from './App.jsx';
import { getAllEvents, addNewEvent } from '../../actions/EventActions.jsx';
import { getAllGuilds } from '../../actions/GuildActions.jsx';
import { handleGuildClick } from '../../actions/CatalogFilterActions.jsx';
import Immutable from 'immutable';

const getVisibleEvents = (events, activeGuilds) => {
	return events.filter((event) => {
		// Return true for those events that has atleast one of the guilds in
		// activeGuilds in its own list of guilds

		return event.get('guilds').some((currentEventGuild) => {
			// Return true for those guild id:s that exists in activeGuilds
			return activeGuilds.includes(currentEventGuild.get('_id'));
		});
	});
}

const mapStateToProps = (state) => {
	const visibleSavedEvents = getVisibleEvents(state.events.get('serverSide'), state.activeGuilds);
	return {
		events: visibleSavedEvents.concat(state.events.get('local')),
		guilds: state.guilds,
		activeGuilds: state.activeGuilds
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getAllEvents: () => {
			dispatch(getAllEvents());
		},
		getAllGuilds: () => {
			dispatch(getAllGuilds());
		},
		handleGuildClick: (guild) => {
			dispatch(handleGuildClick(guild));
		},
		addNewEvent: (ImmutableEventData) => {
			dispatch(addNewEvent(ImmutableEventData));
		}
	}
}

const VisibleApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default VisibleApp

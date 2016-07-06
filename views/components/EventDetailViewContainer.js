import { connect } from 'react-redux'
import EventDetailView from './EventDetailView.jsx';
import { deleteEvent } from '../../actions/EventActions.jsx';
import { hideEventDetails } from '../../actions/EventDetailViewActions';
import { openEditEventForm } from '../../actions/EditEventViewActions'


const mapStateToProps = (state) => {
	return {
		user: state.user,
    open: state.eventViewer.get('open'),
    event: state.eventViewer.get('event')
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		deleteEvent: (ImmutableEventData) => {
			dispatch(deleteEvent(ImmutableEventData));
		},
    close: () => {
      dispatch(hideEventDetails());
    },
    editEvent: (ImmutableEventData) => {
      dispatch(openEditEventForm(ImmutableEventData));
    }
	}
}

const EventDetailViewContainer = connect(mapStateToProps, mapDispatchToProps)(EventDetailView);

export default EventDetailViewContainer;

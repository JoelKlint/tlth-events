import { connect } from 'react-redux'
import EventDetailView from './EventDetailView.jsx';
import { deleteEvent } from '../../actions/EventActions';
import { hideEventDetails } from '../../actions/EventDetailViewActions';
import { openEditEventForm } from '../../actions/EditEventViewActions'


const mapStateToProps = (state) => {
	return {
		user: state.user,
    open: state.eventViewer.open,
    event: state.eventViewer.event
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		deleteEvent: (event) => {
			dispatch(deleteEvent(event));
		},
    close: () => {
      dispatch(hideEventDetails());
    },
    editEvent: (event) => {
      dispatch(openEditEventForm(event));
    }
	}
}

const EventDetailViewContainer = connect(mapStateToProps, mapDispatchToProps)(EventDetailView);

export default EventDetailViewContainer;

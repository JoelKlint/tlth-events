import { connect } from 'react-redux'
import EventDetailView from './EventDetailView.jsx';
import { deleteEvent } from '../../actions/EventActions';
import { hideEventDetails } from '../../actions/EventDetailViewActions';
import { openEditEventForm } from '../../actions/EditEventViewActions'
import { getCurrentEvent } from '../../store/selectors/EventsSelector'
import { unpopulateEventObject } from '../../util/EventFormUtil'

import * as EventUtil from '../../util/EventUtil'


const mapStateToProps = (state) => {
	return {
    userIsOwner: EventUtil.userIsOwner(getCurrentEvent(state), state.user),
    open: state.eventViewer.open,
    event: getCurrentEvent(state)
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
      const unpopulatedEvent = unpopulateEventObject(event)
      dispatch(openEditEventForm(unpopulatedEvent));
    }
	}
}

const EventDetailViewContainer = connect(mapStateToProps, mapDispatchToProps)(EventDetailView);

export default EventDetailViewContainer;

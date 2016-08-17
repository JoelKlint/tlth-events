import { connect } from 'react-redux'
import EventDetailView from './EventDetailView.jsx';
import { deleteEvent } from '../../actions/EventActions';
import { hideEventDetails } from '../../actions/EventDetailViewActions';
import { openEditEventForm } from '../../actions/EditEventViewActions'
import { unpopulateEventObject } from '../../util/EventFormUtil'

import Selector from '../../store/selectors'

import * as EventUtil from '../../util/EventUtil'


const mapStateToProps = (state) => {

  const currentEvent = Selector.getCurrentEvent(state)
  const loggedInUser = Selector.getLoggedInUser(state)

	return {
    editAllowed: EventUtil.mayUserEdit(currentEvent, loggedInUser),
    open: state.eventViewer.open,
    event: currentEvent
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

import { connect } from 'react-redux'
import EventDetailView from './EventDetailView.jsx';
import { unpopulateEventObject } from '../../util/EventFormUtil'
import Selector from '../../store/selectors'
import API from '../../store/actions/api'
import UI from '../../store/actions/ui'
import * as EventUtil from '../../util/EventUtil'

const mapStateToProps = (state) => {

  const currentEvent = Selector.getCurrentEvent(state)
  const loggedInUser = Selector.getLoggedInUser(state)

	return {
    editAllowed: EventUtil.mayUserEdit(currentEvent, loggedInUser),
    open: Selector.shouldEventViewerBeOpen(state),
    event: currentEvent
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		deleteEvent: (event) => {
			dispatch(API.deleteEvent(event));
		},
    close: () => {
      dispatch(UI.hideEventDetails());
    },
    editEvent: (event) => {
      const unpopulatedEvent = unpopulateEventObject(event)
      dispatch(UI.openEditEventForm(unpopulatedEvent));
    }
	}
}

const EventDetailViewContainer = connect(mapStateToProps, mapDispatchToProps)(EventDetailView);

export default EventDetailViewContainer;

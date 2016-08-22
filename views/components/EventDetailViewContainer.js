import { connect } from 'react-redux'
import EventDetailView from './EventDetailView.jsx';
import Selector from '../../store/selectors'
import API from '../../store/actions/api'
import UI from '../../store/actions/ui'
import * as EventUtil from '../../util/EventUtil'
import Event from '../../objects/Event'

const mapStateToProps = (state) => {

  const currentEvent = Selector.getCurrentEvent(state)
  const loggedInUser = Selector.getLoggedInUser(state)

	return {
    editAllowed: EventUtil.mayUserEdit(currentEvent, loggedInUser),
    open: Selector.shouldEventViewerBeOpen(state),
    event: new Event(currentEvent)
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
      const unpopulatedEvent = event.unpopulate()
      dispatch(UI.openEditEventForm(unpopulatedEvent));
    }
	}
}

const EventDetailViewContainer = connect(mapStateToProps, mapDispatchToProps)(EventDetailView);

export default EventDetailViewContainer;

import { connect } from 'react-redux'
import EventDetailView from './EventDetailView.jsx';
import { unpopulateEventObject } from '../../util/EventFormUtil'
import Selector from '../../store/selectors'
import API from '../../store/actions/api'
import UI from '../../store/actions/ui'
import * as EventUtil from '../../util/EventUtil'

let adminGuildId
let eventId

const mapStateToProps = (state) => {

  const currentEvent = Selector.getCurrentEvent(state)
  const loggedInUser = Selector.getLoggedInUser(state)
  adminGuildId = Selector.getAdminGuildId(state)

	return {
    editAllowed: EventUtil.mayUserEdit(currentEvent, loggedInUser),
    open: Selector.shouldEventViewerBeOpen(state),
    event: currentEvent,
    userMayDeleteInvitation: EventUtil.mayUserDeclineInvitation(currentEvent, loggedInUser)
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
      let formEvent = EventUtil.toFormEventData(event)
      dispatch(UI.openEditEventForm(formEvent));
    },
    declineEventInvitation: (eventId) => {
      dispatch(API.declineEventInvitation(eventId, adminGuildId))
      dispatch(UI.hideEventDetails())
    }
	}
}

const EventDetailViewContainer = connect(mapStateToProps, mapDispatchToProps)(EventDetailView);

export default EventDetailViewContainer;

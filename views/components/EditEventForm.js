import { connect } from 'react-redux';
import EventForm from './EventForm.jsx';
import values from 'lodash/fp/values'
import * as EventFormUtil from '../../util/EventFormUtil'
import Selector from '../../store/selectors'
import UI from '../../store/actions/ui'
import API from '../../store/actions/api'

const mapStateToProps = (state) => {

  const adminGuild = Selector.getAdminGuildId(state)
  const eventFormData = Selector.getEditEventFormData(state)

	return {
		guilds: Selector.getAllGuilds(state),
    open: Selector.shouldEditEventFormBeOpen(state),
    event: eventFormData,
    submitLabel: 'Save',
    title: 'Edit event',
    validateForm: () =>  {
      return EventFormUtil.validateFormData(eventFormData, adminGuild)
    }
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		submit: (event) => {
      let apiData = EventFormUtil.toEventObject(event)
			dispatch(API.editEvent(apiData));
		},
    close: () => {
      dispatch(UI.hideEditEventForm())
    },
    updateEventData: (event) => {
      dispatch(UI.updateEditEventData(event));
    }
	}
}

const EditEventForm = connect(
	mapStateToProps,
	mapDispatchToProps
)(EventForm)

export default EditEventForm

import { connect } from 'react-redux';
import EventForm from './EventForm.jsx';
import { hideEditEventForm, updateEditEventData } from '../../actions/EditEventViewActions'
import { editEvent } from '../../actions/EventActions'
import values from 'lodash/fp/values'
import * as EventFormUtil from '../../util/EventFormUtil'
import Selector from '../../store/selectors'

const mapStateToProps = (state) => {

  const adminGuild = Selector.getAdminGuild(state)
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
			dispatch(editEvent(event));
		},
    close: () => {
      dispatch(hideEditEventForm())
    },
    updateEventData: (event) => {
      dispatch(updateEditEventData(event));
    }
	}
}

const EditEventForm = connect(
	mapStateToProps,
	mapDispatchToProps
)(EventForm)

export default EditEventForm

import { connect } from 'react-redux';
import EventForm from './EventForm.jsx';
import { hideEditEventForm, updateEditEventData } from '../../actions/EditEventViewActions'
import { editEvent } from '../../actions/EventActions'
import values from 'lodash/fp/values'
import * as EventFormUtil from '../../util/EventFormUtil'

const mapStateToProps = (state) => {
	return {
		guilds: values(state.data.guilds),
    open: state.editEventForm.open,
    event: state.editEventForm.event,
    submitLabel: 'Save',
    title: 'Edit event',
    validateForm: () =>  {
      return EventFormUtil.validateFormData(state.editEventForm.event, state.user.admin)
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

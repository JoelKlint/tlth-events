import { connect } from 'react-redux';
import EventForm from './EventForm.jsx';
import { hideEditEventForm, updateEditEventData } from '../../actions/EditEventViewActions'
import { editEvent } from '../../actions/EventActions'
import values from 'lodash/values'

const mapStateToProps = (state) => {
	return {
		guilds: values(state.data.guilds),
		user: state.user,
    open: state.editEventForm.open,
    event: state.editEventForm.event,
    submitLabel: 'Save',
    title: 'Edit event'
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

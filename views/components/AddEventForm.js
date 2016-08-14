import { connect } from 'react-redux';
import EventForm from './EventForm.jsx';
import { addNewEvent } from '../../actions/EventActions';
import { hideAddEventForm, updateAddEventData, clearAddEventData } from '../../actions/AddEventViewActions'
import values from 'lodash/values'

const mapStateToProps = (state) => {
	return {
		guilds: values(state.data.guilds),
		user: state.user,
    open: state.addEventForm.open,
    event: state.addEventForm.event,
    clearButtonEnabled: true,
    submitLabel: 'Add event',
    title: 'Add event'
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		submit: (event) => {
			dispatch(addNewEvent(event));
		},
    close: () => {
      dispatch(hideAddEventForm())
    },
    updateEventData: (event) => {
      dispatch(updateAddEventData(event));
    },
    clearForm: () => {
      dispatch(clearAddEventData());
    }
	}
}

const AddEventForm = connect(
	mapStateToProps,
	mapDispatchToProps
)(EventForm)

export default AddEventForm

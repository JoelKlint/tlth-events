import { connect } from 'react-redux';
import EventForm from './EventForm.jsx';
import { addNewEvent } from '../../actions/EventActions.jsx';
import { hideAddEventForm, updateAddEventData, clearAddEventData } from '../../actions/AddEventViewActions'

import Immutable from 'immutable';

const mapStateToProps = (state) => {
	return {
		guilds: state.guilds,
		user: state.user,
    open: state.addEventForm.get('open'),
    event: state.addEventForm.get('event')
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		submit: (ImmutableEventData) => {
			dispatch(addNewEvent(ImmutableEventData));
		},
    close: () => {
      dispatch(hideAddEventForm())
    },
    updateEventData: (ImmutableEventData) => {
      dispatch(updateAddEventData(ImmutableEventData));
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

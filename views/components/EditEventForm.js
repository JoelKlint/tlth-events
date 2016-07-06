import { connect } from 'react-redux';
import EventForm from './EventForm.jsx';
import { hideEditEventForm, updateEditEventData } from '../../actions/EditEventViewActions'
import { editEvent } from '../../actions/EventActions.jsx'

import Immutable from 'immutable';

const mapStateToProps = (state) => {
	return {
		guilds: state.guilds,
		user: state.user,
    open: state.editEventForm.get('open'),
    event: state.editEventForm.get('event')
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		submit: (ImmutableEventData) => {
			dispatch(editEvent(ImmutableEventData));
		},
    close: () => {
      dispatch(hideEditEventForm())
    },
    updateEventData: (ImmutableEventData) => {
      dispatch(updateEditEventData(ImmutableEventData));
    }
	}
}

const EditEventForm = connect(
	mapStateToProps,
	mapDispatchToProps
)(EventForm)

export default EditEventForm

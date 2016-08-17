import { connect } from 'react-redux';
import EventForm from './EventForm.jsx';
import { addNewEvent } from '../../actions/EventActions';
import { hideAddEventForm, updateAddEventData, clearAddEventData } from '../../actions/AddEventViewActions'
import values from 'lodash/fp/values'
import * as EventFormUtil from '../../util/EventFormUtil'
import Selector from '../../store/selectors'

const mapStateToProps = (state) => {

  const adminGuild = Selector.getAdminGuild(state)
  const eventFormData = Selector.getAddEventFormData(state)

	return {
		guilds: Selector.getAllGuilds(state),
    open: Selector.shouldAddEventFormBeOpen(state),
    event: eventFormData,
    clearButtonEnabled: true,
    submitLabel: 'Add event',
    title: 'Add event',
    validateForm: () =>  {
      return EventFormUtil.validateFormData(eventFormData, adminGuild)
    }
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

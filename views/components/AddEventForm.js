import { connect } from 'react-redux';
import EventForm from './EventForm.jsx';
import values from 'lodash/fp/values'
import Selector from '../../store/selectors'
import API from '../../store/actions/api'
import UI from '../../store/actions/ui'
import assign from 'lodash/fp/assign'

const mapStateToProps = (state) => {

  const adminGuild = Selector.getAdminGuildId(state)
  const eventFormData = Selector.getAddEventFormData(state)

	return {
		guilds: Selector.getAllGuilds(state),
    open: Selector.shouldAddEventFormBeOpen(state),
    event: eventFormData,
    clearButtonEnabled: true,
    submitLabel: 'Add event',
    title: 'Add event',
    validateForm: () =>  {
      if( !eventFormData.isValid(adminGuild) ) {
        alert(eventFormData.getErrorMessage())
      }
      else {
        return true
      }
    }
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		submit: (event) => {
      let apiData = event.toEvent()
			dispatch(API.addNewEvent(apiData));
		},
    close: () => {
      dispatch(UI.hideAddEventForm())
    },
    updateEventData: (event) => {
      dispatch(UI.updateAddEventData(event));
    },
    clearForm: () => {
      dispatch(UI.clearAddEventData());
    }
	}
}

const AddEventForm = connect(
	mapStateToProps,
	mapDispatchToProps
)(EventForm)

export default AddEventForm

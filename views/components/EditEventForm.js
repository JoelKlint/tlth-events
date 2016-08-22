import { connect } from 'react-redux';
import EventForm from './EventForm.jsx';
import values from 'lodash/fp/values'
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

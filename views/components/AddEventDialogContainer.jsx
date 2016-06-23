import { connect } from 'react-redux';
import AddEventDialog from './AddEventDialog.jsx';
import { addNewEvent } from '../../actions/EventActions.jsx';
import Immutable from 'immutable';

const mapStateToProps = (state) => {
	return {
		guilds: state.guilds,
		user: state.user
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addNewEvent: (ImmutableEventData) => {
			dispatch(addNewEvent(ImmutableEventData));
		}
	}
}

const AddEventDialogContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(AddEventDialog)

export default AddEventDialogContainer

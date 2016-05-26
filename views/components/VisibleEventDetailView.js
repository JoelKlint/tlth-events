import { connect } from 'react-redux'
import EventDetailView from './EventDetailView.jsx';
import { deleteEvent } from '../../actions/EventActions.jsx';

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		deleteEvent: (ImmutableEventData) => {
			dispatch(deleteEvent(ImmutableEventData));
		}
	}
}

const VisibleEventDetailView = connect(mapStateToProps, mapDispatchToProps)(EventDetailView);

export default VisibleEventDetailView;

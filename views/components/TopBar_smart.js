import { connect } from 'react-redux'
import TopBar from './TopBar.jsx'
import { openAddEventForm } from '../../actions/AddEventViewActions'
import { getSubscribeLink } from '../../util/SubscribeUtil'
import has from 'lodash/has'

const mapStateToProps = (state) => {
	return {
		loggedIn: has(state.user, 'username'),
    admin: has(state.user, 'admin'),
    subscribeLink: getSubscribeLink(state)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
    openEventEditor: () => {
      dispatch(openAddEventForm())
    }
	}
}

const TopBar_smart = connect(mapStateToProps, mapDispatchToProps)(TopBar);

export default TopBar_smart;

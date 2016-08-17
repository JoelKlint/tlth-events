import { connect } from 'react-redux'
import TopBar from './TopBar.jsx'
import { getSubscribeLink } from '../../util/SubscribeUtil'
import has from 'lodash/has'
import UI from '../../store/actions/ui'

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
      dispatch(UI.openAddEventForm())
    }
	}
}

const TopBar_smart = connect(mapStateToProps, mapDispatchToProps)(TopBar);

export default TopBar_smart;

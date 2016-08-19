import { connect } from 'react-redux'
import TopBar from './TopBar.jsx'
import { getSubscribeLink } from '../../util/SubscribeUtil'
import UI from '../../store/actions/ui'
import Selector from '../../store/selectors'

const mapStateToProps = (state) => {
	return {
    loggedIn: Selector.isUserLoggedIn(state),
    userIsAdmin: Selector.isLoggedInUserAdmin(state),
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

import { connect } from 'react-redux'
import MainContainer from './MainContainer.jsx'
import UI from '../../store/actions/ui'
import Selector from '../../store/selectors'

const mapStateToProps = (state) => {
	return {
    currentView: Selector.getCurrentMainView(state)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
	}
}

const MainContainer_smart = connect(mapStateToProps, mapDispatchToProps)(MainContainer);

export default MainContainer_smart;

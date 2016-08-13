import React, { Component, PropTypes } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import VisibleApp from './components/VisibleApp.jsx';
import configureStore from '../store/configureStore';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

export default class Root extends Component {

	render() {
		return (
			<Provider store={this.props.store}>
				<MuiThemeProvider muiTheme={getMuiTheme()}>
			    <VisibleApp />
			  </MuiThemeProvider>
			</Provider>
		)
	}
}

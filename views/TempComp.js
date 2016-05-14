import React, { Component, PropTypes } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import VisibleApp from './components/VisibleApp.jsx';
import configureStore from '../store/configureStore.jsx';

export default class TempComp extends Component {

	render() {
		const store = configureStore();
		return (
			<Provider store={store}>
				<MuiThemeProvider muiTheme={getMuiTheme()}>
			    <VisibleApp />
			  </MuiThemeProvider>
			</Provider>
		)
	}
}

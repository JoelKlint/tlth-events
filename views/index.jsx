import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

import configureStore from '../store/configureStore.jsx';
import VisibleApp from './components/VisibleApp.jsx';

import Root from './Root.jsx';

injectTapEventPlugin();

// Get initial state from server
const initialState = window.__INITIAL_STATE__;

const store = configureStore(initialState);

ReactDOM.render(
	<Root store={store}/>,
	document.getElementById('view')
);

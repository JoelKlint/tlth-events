import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

import configureStore from '../store/configureStore.jsx';
import VisibleApp from './components/VisibleApp.jsx';

import TempComp from './tempComp.js';

injectTapEventPlugin();

const store = configureStore();

ReactDOM.render(
	<TempComp/>,
	document.getElementById('view')
);

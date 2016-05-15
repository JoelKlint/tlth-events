import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

import configureStore from '../store/configureStore.jsx';
import VisibleApp from './components/VisibleApp.jsx';

import TempComp from './tempComp.js';
import Immutable, { OrderedSet, Map, Set } from 'immutable';

injectTapEventPlugin();

const populateState = (stateFromServer) => {
	const events = Map({
		serverSide: Immutable.fromJS(stateFromServer.events.serverSide).toSet(),
		local: Immutable.fromJS(stateFromServer.events.local).toSet() });
	const guilds = Immutable.fromJS(stateFromServer.guilds).toOrderedSet();
	const activeGuilds = Immutable.fromJS(stateFromServer.activeGuilds).toSet();
	const user = Immutable.fromJS(stateFromServer.user);
	return { events, guilds, activeGuilds, user };
};

// Get initial state from server
const stateFromServer = window.__INITIAL_STATE__;
// Transform state to immutable
let initialState = {};
if(stateFromServer) {
	initialState = populateState(stateFromServer);
}

const store = configureStore(initialState);

ReactDOM.render(
	<TempComp store={store}/>,
	document.getElementById('view')
);

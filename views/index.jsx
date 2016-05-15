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

// Get initial state from server
const stateFromServer = window.__INITIAL_STATE__;
// Transform state to immutable
const serverEvents = Immutable.fromJS(stateFromServer.events.serverSide).toSet();
const localEvents = Immutable.fromJS(stateFromServer.events.local).toSet();
const events = Map({ serverSide: serverEvents, local: localEvents });
const guilds = Immutable.fromJS(stateFromServer.guilds).toOrderedSet();
const activeGuilds = Immutable.fromJS(stateFromServer.activeGuilds).toSet();
const initialState = { events, guilds, activeGuilds };

const store = configureStore(initialState);

ReactDOM.render(
	<TempComp store={store}/>,
	document.getElementById('view')
);

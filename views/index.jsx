import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from '../store/configureStore';
import Root from './Root.jsx';

// Get initial state from server
const initialState = window.__INITIAL_STATE__;

const store = configureStore(initialState);

ReactDOM.render(
	<Root store={store}/>,
	document.getElementById('view')
);

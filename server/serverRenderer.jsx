import React from 'react';
import Root from '../views/Root.jsx';
import { renderToString } from 'react-dom/server'
import configureStore from '../store/configureStore.jsx';
import { fromJS } from 'immutable';

const renderFromServer = (res, initialState) => {
	const store = configureStore(initialState);

	const html = renderToString(<Root store={store}/>);

	const immutableState = fromJS(store.getState());
	const state = JSON.stringify(immutableState.toJS());

	res.render('index', { html: html, initialState: state });
}

export default renderFromServer;

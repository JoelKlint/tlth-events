import React from 'react';
import TempComp from '../views/TempComp.jsx';
import { renderToString } from 'react-dom/server'
import configureStore from '../store/configureStore.jsx';

const renderFromServer = (res, initialState) => {
	const store = configureStore(initialState);

	const html = renderToString(<TempComp store={store}/>);

	const state = JSON.stringify(store.getState());

	res.render('index', { html: html, initialState: state });
}

export default renderFromServer;

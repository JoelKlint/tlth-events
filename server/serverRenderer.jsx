import React from 'react';
import Root from '../views/Root.jsx';
import { renderToString } from 'react-dom/server'
import configureStore from '../store/configureStore.jsx';

const renderFromServer = (res, initialState) => {
	const store = configureStore(initialState);

	const html = renderToString(<Root store={store}/>);

  const JSONstate = JSON.stringify(store.getState())

	res.render('index', { html: html, initialState: JSONstate });
}

export default renderFromServer;

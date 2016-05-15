import express from 'express';
const router = express.Router();
import cas from '../middleware/cas';

import TempComp from '../../views/TempComp.js';
import React from 'react';
import { renderToString } from 'react-dom/server'
import configureStore from '../../store/configureStore.jsx';
import { Map, Set, OrderedSet } from 'immutable';

router.get('/', cas.bounce, function(req, res) {
	const username = req.session.cas_user;

	const initialState = {};
	const store = configureStore(initialState);

	const html = renderToString(<TempComp store={store}/>);

	const state = JSON.stringify(store.getState());

	res.render('index', { html: html, initialState: state });
});

export default router;

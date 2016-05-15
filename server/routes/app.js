import express from 'express';
const router = express.Router();
import cas from '../middleware/cas';

import TempComp from '../../views/TempComp.js';
import React from 'react';
import { renderToString } from 'react-dom/server'
import configureStore from '../../store/configureStore.jsx';

router.get('/', cas.bounce, function(req, res) {
	const username = req.session.cas_user;
	const store = configureStore();
	const html = renderToString(<TempComp store={store}/>);
	res.render('index', { html: html});
});

export default router;

import express from 'express';
const router = express.Router();
import cas from '../middleware/cas';
import { User } from '../../models';
import renderFromServer from '../../public/serverRenderer';
import { fromJS } from 'immutable';

router.get('/', function(req, res) {
	if(req.session.cas_user) {
		const username = req.session.cas_user;
		User.findOrCreate({ username: username }, function(err, user, wasCreated) {
			// Returned user object cannot be directly converted to Immutable.
			// It must first be converted to JSON and then parsed.
			const jsonUser = JSON.stringify(user);
			const immutableUser = fromJS(JSON.parse(jsonUser));
			const initialState = { user: immutableUser };
			renderFromServer(res, initialState);
		});
	}
	else {
		renderFromServer(res, {});
	}
});

router.get('/login', cas.bounce, function(req, res) {
	res.redirect('/');
})

export default router;

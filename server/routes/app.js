import express from 'express';
const router = express.Router();
import cas from '../middleware/cas';
import { User } from '../../models';
import renderFromServer from '../../public/serverRenderer';
import { fromJS } from 'immutable';
import winston from 'winston';

router.get('/', function(req, res) {
	if(req.session.cas_user) {
		const username = req.session.cas_user;
		User.findOrCreate({ username: username }, function(err, user, wasCreated) {
			if(err) winston.error(err);
			User.populate(user, 'admin')
			.then(populatedUser => {
				// Returned user object cannot be directly converted to Immutable.
				// It must first be converted to JSON and then parsed.
				const jsonUser = JSON.stringify(user);
				const immutableUser = fromJS(JSON.parse(jsonUser));
				const initialState = { user: immutableUser };
				renderFromServer(res, initialState);
			})
			.catch(err => winston.error(err));
		});
	}
	else {
		renderFromServer(res, {});
	}
});

/**
 * @api {get} /login Login user
 * @apiName Login
 * @apiGroup Authentication
 * @apiDescription Authentication is handled via Lund University CAS system.
 * This route redirects to base url upon successful authentication
 */
router.get('/login', cas.bounce, function(req, res) {
	res.redirect('/');
})

/**
 * @api {get} /logout Logout user
 * @apiName Logout
 * @apiGroup Authentication
 * @apiDescription Authentication is handled via Lund University CAS system
 * This route redirects to CAS logout screen
 */
router.get('/logout', cas.logout );

export default router;

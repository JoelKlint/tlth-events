import express from 'express';
const router = express.Router();
import cas from '../middleware/cas';
import User from '../../models/user';
import renderFromServer from '../../public/serverRenderer';

router.get('/', cas.bounce, function(req, res) {
	const username = req.session.cas_user;
	User.findOrCreate({ username: username }, function(err, user, wasCreated) {
		const initialState = { user };
		renderFromServer(res, initialState);
	});
});

export default router;

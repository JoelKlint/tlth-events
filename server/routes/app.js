import express from 'express';
const router = express.Router();
import cas from '../middleware/cas';
import { User } from '../../models';
import renderFromServer from '../../public/serverRenderer';

router.get('/', function(req, res) {
	if(req.session.cas_user) {
		const username = req.session.cas_user;
		User.findOrCreate({ username: username }, function(err, user, wasCreated) {
			const initialState = { user };
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

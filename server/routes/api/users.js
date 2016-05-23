var router = require('express').Router();
import { Guild, User } from '../../../models';
import cas from '../../middleware/cas';
import ParameterError from '../../config/ParameterError';

router.route('/')
	.get((req, res, next) => {
		User.find()
		.populate('admin')
		.then((users) => res.json(users) )
		.catch((error) => {	return next(err) });
	})

	.post((req, res, next) => {
		User.create(req.body)
		.then((user) => res.json(user))
		.catch((err) => { return next(err) });
	});

/**
 * @api {post} /api/user/admin/:user_id Make user admin
 * @apiName Make user admin
 * @apiGroup User
 * @apiParam {String} guildId The guild user should be admin of
 * @apiSuccess {Object} user The updated user object
 */
router.post('/admin/:user_id', (req, res, next) => {
	const guildId = req.body.guildId;
	// Validate guild
	Guild.findById(guildId)
	.then((guild) => {
		if(!guild) {
			const err = new ParameterError('Guild does not exist');
			return next(err);
		}

		const userId = req.params.user_id;
		User.findByIdAndUpdate(userId, { admin: guild._id }, '_id')
		.then((user) => { /* So it will perform synchronous */})
		.catch((err) => { return next(err) })
		User.findById(userId)
		.populate('admin')
		.then((user) => res.json(user))
		.catch((err) => { return next(err) });

	})
	.catch((err) => { return next(err) })
});

export default router;

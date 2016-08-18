import { Router } from 'express';
const router = Router();
import { Guild, User } from '../../models';
import cas from '../../middleware/cas';
import ParameterError from '../../config/ParameterError';

/**
 * @api {get} /api/users Get all users
 * @apiName Get all users
 * @apiGroup User
 * @apiDescription
 * Get a list of all users
 */
router.get('/', (req, res, next) => {
	User.find()
	.populate('admin')
	.then((users) => res.json(users) )
	.catch((error) => {	return next(err) });
});

/**
 * @api {post} /api/users Create user
 * @apiName Create user
 * @apiGroup User
 * @apiDescription
 * Create a new user
 */
router.post('/', (req, res, next) => {
	User.create(req.body)
	.then((user) => res.json(user))
	.catch((err) => { return next(err) });
});

/**
 * @api {post} /api/users/admin/:user_id Make user admin
 * @apiName Make user admin
 * @apiGroup User
 * @apiDescription
 * Make an existing user admin
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

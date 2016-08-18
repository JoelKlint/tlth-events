import { Router } from 'express';
const router = Router();
import { Guild } from '../../models';
import ParameterError from '../../config/ParameterError';

/**
 * @api {get} /api/guilds Get all guilds
 * @apiName Get all guilds
 * @apiGroup Guild
 * @apiDescription
 * Get a list of all guilds
 */
router.get('/', function(req, res, next) {
	Guild.find().then(function(guilds) {
		res.json(guilds);
	})
	.catch(function(err) {
		return next(err);
	})
});

/**
 * @api {post} /api/guilds Create a guild
 * @apiName Create a guild
 * @apiGroup Guild
 * @apiDescription
 * Create a new guild
 */
router.post('/', function(req, res, next) {
	var guild = new Guild(req.body);
	guild.save().then(function(guild) {
		res.json(guild);
	})
	.catch(function(err) {
		return next(err);
	})
});

/**
 * @api {get} /api/guilds/:guild_id Get specific guild
 * @apiName Get specific guild
 * @apiGroup Guild
 * @apiDescription
 * Get a specific guild
 */
router.get('/:guild_id', function(req, res, next) {
	Guild.findById(req.params.guild_id).then(function(guild) {
		if(!guild) {
			const err = new ParameterError('Guild does not exist');
			return next(err);
		}
		res.json(guild);
	})
	.catch(function(err) {
		return next(err);
	})
});

/**
 * @api {put} /api/guilds/:guild_id Edit guild
 * @apiName Edit guild
 * @apiGroup Guild
 * @apiDescription
 * Edit a guild
 */
router.put('/:guild_id', function(req, res, next) {
	Guild.findByIdAndUpdate(req.params.guild_id, req.body).then(function(guild) {
		if(!guild) {
			const err = new ParameterError('Guild does not exist');
			return next(err);
		}
		Guild.findById(req.params.guild_id)
		.then(guild => res.json(guild))
		.catch(err => next(err))
	})
	.catch(function(err) {
		return next(err);
	})
});

/**
 * @api {delete} /api/guilds/:guild_id Delete guild
 * @apiName Delete guild
 * @apiGroup Guild
 * @apiDescription
 * Delete a guild
 */
router.delete('/:guild_id', function(req, res, next) {
	Guild.findByIdAndRemove(req.params.guild_id).then(function(guild) {
		if(!guild) {
			const err = new ParameterError('Guild does not exist');
			return next(err);
		}
		res.json(guild);
	})
	.catch(function(err) {
		return next(err);
	})
});

export default router;

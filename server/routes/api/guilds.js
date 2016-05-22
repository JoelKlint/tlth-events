var router = require('express').Router();
import { Guild } from '../../../models';
import ParameterError from '../../config/ParameterError';

router.route('/')

	.get(function(req, res, next) {
		Guild.find().then(function(guilds) {
			res.json(guilds);
		})
		.catch(function(err) {
			return next(err);
		});
	})

	.post(function(req, res, next) {
		var guild = new Guild(req.body);
		guild.save().then(function(guild) {
			res.json(guild);
		})
		.catch(function(err) {
			return next(err);
		});
	});

router.route('/:guild_id')

	.get(function(req, res, next) {
		Guild.findById(req.params.guild_id).then(function(guild) {
			if(!guild) {
				const err = new ParameterError('Guild does not exist');
				return next(err);
			}
			res.json(guild);
		})
		.catch(function(err) {
			return next(err);
		});
	})

	.put(function(req, res, next) {
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
	})

	.delete(function(req, res, next) {
		Guild.findByIdAndRemove(req.params.guild_id).then(function(guild) {
			if(!guild) {
				const err = new ParameterError('Guild does not exist');
				return next(err);
			}
			res.json(guild);
		})
		.catch(function(err) {
			return next(err);
		});
	});

module.exports = router;

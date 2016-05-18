var router = require('express').Router();
import { Event, Guild } from '../../../models';
import ParameterError from '../../config/ParameterError';

router.route('/')

	.get(function(req, res, next) {
		Event.find()
		.populate('guilds')
		.then(function(events) {
			res.json(events);
		})
		.catch(function(err) {
			return next(err);
		});
	})

	.post(function(req, res, next) {
		Guild.find({ _id: { $in: req.body.guilds } }, '_id').then(function(guilds) {
			var eventParams = req.body;
			eventParams.guilds = guilds;
			var event = new Event(eventParams);
			event.save().then(function(event) {
				Event.populate(event, 'guilds').then(function(populatedEvent) {
					res.json(populatedEvent);
				})
			})
			.catch(function(err) {
				return next(err);
			})
		})
		.catch(function(err) {
			return next(err);
		});
	});

router.route('/:event_id')

	.get(function(req, res, next) {
		Event.findById(req.params.event_id).then(function(event) {
			if(!event) {
				const err = new ParameterError('Event does not exist');
				return next(err);
			}
			res.json(event);
		})
		.catch(function(err) {
			return next(err);
		});
	})

	.put(function(req, res, next) {
		Event.findByIdAndUpdate(req.params.event_id, req.body).then(function(event) {
			if(!event) {
				const err = new ParameterError('Event does not exist');
				return next(err);
			}
			res.json(event);
		})
		.catch(function(err) {
			return next(err);
		})
	})

	.delete(function(req, res, next) {
		Event.findByIdAndRemove(req.params.event_id).then(function(event) {
			if(!event) {
				const err = new ParameterError('Event does not exist');
				return next(err);
			}
			res.json(event);
		})
		.catch(function(err) {
			return next(err);
		});
	});

module.exports = router;

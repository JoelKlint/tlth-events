import { Router } from 'express';
const router = Router();
import { User, Event, Guild } from '../../../models';
import ParameterError from '../../config/ParameterError';
import UnauthorizedError from '../../config/UnauthorizedError';
import cas from '../../middleware/cas';

/**
 * @api {get} /events Get all events
 * @apiName Get all events
 * @apiGroup Event
 * @apiDescription
 * Get a list of all events
 */
router.get('/', function(req, res, next) {
	Event.find()
	.populate('guilds owner')
	.then(function(events) {
		res.json(events);
	})
	.catch(function(err) {
		return next(err);
	})
});

/**
 * @api {post} /events Create event
 * @apiName Create event
 * @apiGroup Event
 * @apiDescription
 * Create a new Event. The owner of the event will be the guild that the
 * user sending the request is admin of. Required admin login
 */
router.post('/', cas.block, function(req, res, next) {
	// Clear values which should not be retrieved from outside
	delete req.body.owner;

	const eventParams = req.body;
	User.findOne({ username: req.session.cas_user })
	.then(user => {
		// Exit if user does not exist or is not admin
		if(!user || !user.admin) {
			next(new UnauthorizedError());
		}
		// Set owner of event = the guild the user is admin of
		eventParams.owner = user.admin;
		return Guild.find({ _id: { $in: req.body.guilds } }, '_id');
	})
	.then(guilds => {
		// Exit if no given guild exists
		if(guilds.length < 1) {
			next(new ParameterError('Guild does not exist'));
		}
		// Set existing guilds of request
		eventParams.guilds = guilds;
		return Event.create(eventParams)
	})
	.then(event => {
		return Event.populate(event, 'guilds owner')
	})
	.then(populatedEvent => res.json(populatedEvent))
	.catch(err => next(err))
});

/**
 * @api {get} /events/:event_id Get event
 * @apiName Get event
 * @apiGroup Event
 * @apiDescription
 * Get a specific event
 */
router.get('/:event_id', function(req, res, next) {
	Event.findById(req.params.event_id).then(function(event) {
		if(!event) {
			const err = new ParameterError('Event does not exist');
			return next(err);
		}
		res.json(event);
	})
	.catch(function(err) {
		return next(err);
	})
});

/**
 * @api {put} /events/:event_id Edit event
 * @apiName Edit event
 * @apiGroup Event
 * @apiDescription
 * Edit an event.
 */
router.put('/:event_id', function(req, res, next) {
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
});

/**
 * @api {delete} /events/:event_id Delete event
 * @apiName Delete event
 * @apiGroup Event
 * @apiDescription
 * Delete an event.
 */
router.delete('/:event_id', function(req, res, next) {
	Event.findByIdAndRemove(req.params.event_id).then(function(event) {
		if(!event) {
			const err = new ParameterError('Event does not exist');
			return next(err);
		}
		res.json(event);
	})
	.catch(function(err) {
		return next(err);
	})
});

export default router;

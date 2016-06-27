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
router.post('/', cas.block, cas.attachUser, function(req, res, next) {
  // Clear values which should not be set from outside
  delete req.body.owner;

  // Create object for building parameters for the new event
  const eventParams = req.body;

  // Validate user is admin
  if(!req.user || !req.user.admin) { return next(new UnauthorizedError()) }
  else { eventParams.owner = req.user.admin }

  // Validate endDate is later than startDate
  if(eventParams.endDate <= eventParams.startDate) {
    return next(new ParameterError('End date must be after startDate'))
  }

  // Validate guilds
  Guild.find({ _id: { $in: req.body.guilds } }, '_id')
	.then(guilds => {

		// Validate event is created for existing guilds
		if(guilds.length < 1) {
			return next(new ParameterError('Guild does not exist'));
		}

		// Validate event is created for the admin's guild
		const areAdminedByUser = (guild) => {
			return eventParams.owner == guild.id ? true : false
		}
		if(!guilds.some(areAdminedByUser)) {
			return next(new ParameterError('You must create an event for your own guild'));
		}
		eventParams.guilds = guilds;

    // Create the new event
		return Event.create(eventParams)
	})
	.then(event => {
		return Event.populate(event, 'guilds owner')
	})
	.then(populatedEvent => res.json(populatedEvent))
	.catch(err => {
		return next(err)
	})
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

var router = require('express').Router();
import { User, Event, Guild } from '../../../models';
import ParameterError from '../../config/ParameterError';
import UnauthorizedError from '../../config/UnauthorizedError';
import cas from '../../middleware/cas';

	/**
	 * @apiDefine EventSuccessResponse
	 *
	 * @apiSuccess {String} _id ID of the event
	 * @apiSuccess {String} name  Name of the event
	 * @apiSuccess {String} description Description of the Event
	 * @apiSuccess {String} location Location of the event
	 * @apiSuccess {Date} startDate Start time of the event. ISO formatted string
	 * @apiSuccess {Date} endDate End time of the event. ISO formatted string
	 * @apiSuccess {String} url URL of the event,
	 * @apiSuccess {Object} owner The creator of the event
	 * @apiSuccess {Object[]} guilds Guilds whom the event are for
	 *
	 * @apiSuccessExample {json} Success-Response:
	 * 	HTTP/1.1 200 OK
	 * 	{
	 * 		"_id": "abcdefghijklmnopqrstuvwx"
	 * 		"name": "Lunch"
	 * 		"description": "Come enjoy some lunch"
	 * 		"location": "Dining room"
	 * 		"startDate": "2016-05-11T13:00:00.000Z"
	 * 		"endDate": "2016-05-11T15:00:00.000Z"
	 * 		"url": "www.lunch.com",
	 * 		"owner": {
	 *			"_id": "abcdefghijklmnopqrstuvwx",
   *			"name": "Great guild"
	 *		},
	 * 		"guilds": [
	 * 			{
	 * 				"_id": "abcdefghijklmnopqrstuvwx",
	 * 				"name": "Great guild"
	 * 			}
	 * 		]
	 * 	}
	 */

	/**
	 * @apiDefine EventBodyParams
	 *
	 * @apiParam (Body) {String} name Name of the event
	 * @apiParam (Body) {String} description Description of the event
	 * @apiParam (Body) {String} location Location of the event
	 * @apiParam (Body) {Date} startDate Start time of the event. ISO formatted string
	 * @apiParam (Body) {Date} endDate End time of the event. ISO formatted string
	 * @apiParam (Body) {String} url URL of the event
	 * @apiParam (Body) {Object[]} guilds Guilds whom the event are for
	 *
	 * @apiParamExample {json} Request-Example:
	 * 	HTTP/1.1 200 OK
	 * 	{
	 * 		"name": "Lunch"
	 * 		"description": "Come enjoy some lunch"
	 * 		"location": "Dining room"
	 * 		"startDate": "2016-05-11T13:00:00.000Z"
	 * 		"endDate": "2016-05-11T15:00:00.000Z"
	 * 		"url": "www.lunch.com"
	 * 		"guilds": [
	 * 			{
	 * 				"_id": "abcdefghijklmnopqrstuvwx"
	 * 				"name": "Great guild"
	 * 			}
	 * 		]
	 * 	}
	 */

router.route('/')

	/**
	 * @api {get} /events Get all events
	 * @apiName Get all events
	 * @apiGroup Event
	 */
	.get(function(req, res, next) {
		Event.find()
		.populate('guilds owner')
		.then(function(events) {
			res.json(events);
		})
		.catch(function(err) {
			return next(err);
		});
	})

	/**
	 * @api {post} /events Create event
	 * @apiName Create event
	 * @apiGroup Event
	 * @apiDescription
	 * Create a new Event. The owner of the event will be the guild that the
	 * user sending the request is admin of.
	 *
	 * @apiUse EventBodyParams
	 * @apiUse EventSuccessResponse
	 */
	.post(cas.block, function(req, res, next) {
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

router.route('/:event_id')

	/**
	 * @apiDefine UrlEncodedEventIdParam
	 * @apiParam (URL) {String} event_id ID of the event
	 */

	/**
	 * @api {get} /event/:event_id Get event
	 * @apiName Get event
	 * @apiGroup Event
	 *
	 * @apiUse UrlEncodedEventIdParam
	 * @apiUse EventSuccessResponse
	 */
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

	/**
	 * @api {put} /event/:event_id Edit event
	 * @apiName Edit event
	 * @apiGroup Event
	 *
	 * @apiUse UrlEncodedEventIdParam
	 * @apiUse EventBodyParams
	 * @apiUse EventSuccessResponse
	 *
	 */
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

	/**
	 * @api {delete} /event/:event_id Delete event
	 * @apiName Delete event
	 * @apiGroup Event
	 *
	 * @apiUse UrlEncodedEventIdParam
	 * @apiUse EventSuccessResponse
	 */
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

import { Router } from 'express';
const router = Router();
import { Event, Guild } from '../../models';
import { VCalendar, VEvent } from 'cozy-ical';
import ParameterError from '../../config/ParameterError';
import moment from 'moment';

// Gets all events for any of the specified guilds
// Guilds are specified via URL parameters
// ?guild=D&guild=A etc.
router.get('/', function(req, res, next) {
	// Validate input was specified
	if(!req.query.guild) {
		const err = new ParameterError('No guilds specified');
		return next(err);
	}
	// Place input into array
	var inputGuilds = [];
	if(typeof req.query.guild === 'string') {
		inputGuilds.push(req.query.guild);
	}
	else if (req.query.guild instanceof Array) {
		inputGuilds = req.query.guild
	}
	else {
		const err = new ParameterError('Unknown input type');
		return next(err);
	}

	Guild.find({ name: { $in: inputGuilds } }).then(function(guilds) {

		if(guilds.length === 0) {
			const err = new ParameterError('Invalid guild specified');
			return next(err);
		}

		Event.find({ guilds: { $in: guilds } }).then(function(events) {
			var org = 'Cal';
			var cal = new VCalendar( {
				organization: org,
				title: org + 'Calendar'
			});
			events.forEach(function(event) {
				var desc;
				if(event.url) {
					desc = event.url + '\n' + event.description;
				}
				else {
					desc = event.description;
				}
				var vevent = new VEvent({
					stampDate: moment(new Date(event.startDate)).subtract(2, 'hours').toISOString(),
					startDate: moment(new Date(event.startDate)).subtract(2, 'hours').toISOString(),
					endDate: moment(new Date(event.endDate)).subtract(2, 'hours').toISOString(),
					description: desc,
					location: event.location,
					summary: event.name,
					uid: event.id
				});
				cal.add(vevent);
			});
			res.type('text/calendar').send(cal.toString());
		})
		.catch(function(err) {
			return next(err);
		})
	})
	.catch(function(err) {
		return next(err);
	})
});

export default router;

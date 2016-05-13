var router = require('express').Router();
var Event = require('../models/event');
var Guild = require('../models/guild');
var VCalendar = require('cozy-ical').VCalendar;
var VEvent = require('cozy-ical').VEvent;
var conf = require('../config/config.json');
var ParameterError = require('../config/ParameterError.js');
var moment = require('moment');

// Gets all events for any of the specified guilds
// Guilds are specified via URL parameters
// ?guild=D&guild=A etc.
router.get('/', function(req, res, next) {
	// Validate input was specified
	if(!req.query.guild) {
		throw err = new ParameterError('No guilds specified');
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
		throw err = new ParameterError('Unknown input type');
		return next(err);
	}

	Guild.find({ name: { $in: inputGuilds } }).then(function(guilds) {

		if(guilds.length === 0) {
			throw err = new ParameterError('Invalid guild specified');
			return next(err);
		}

		Event.find({ guilds: { $in: guilds } }).then(function(events) {
			var org = conf.organization;
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

module.exports = router;

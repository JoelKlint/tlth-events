var superagent = require('superagent');
var expect = require('chai').expect;
var Guild = require('../models/guild.js');
var uniqueName = 'ical-events-test';

describe('/ical-events', function() {

	describe('GET', function() {

		var eventParams;
		var guild;
		var eventId;

		before(function(done) {
			superagent.post('http://localhost:3000/guilds')
			.send({ name: uniqueName })
			.then(function(res) {
				guild = res.body;

				eventParams = {
					name: uniqueName,
					location: 'test',
					startDate: new Date(),
					endDate: new Date(),
					description: 'test',
					url: 'www.test.com',
					guilds: [ guild._id ]
				}
				superagent.post('http://localhost:3000/events')
				.send(eventParams)
				.then(function(res) {
					eventId = res.body._id;
					done();
				})
			})
		});

		after(function(done) {
			superagent.del('http://localhost:3000/guilds/' + guild._id)
			.then(function(res) {

				superagent.del('http://localhost:3000/events/' + eventId)
				.then(function(res) {
					done();
				})
			})
		})

		it('should return an ical feed', function(done) {
			superagent.get('http://localhost:3000/ical-events?guild=' + guild.name)
			.end(function(err, res) {
				expect(err).to.not.exist;
				expect(res.type).to.eql('text/calendar');
				expect(res.text).to.contain('BEGIN:VCALENDAR');
				done();
			})
		});

		it('should allow quering for one guild', function(done) {
			superagent.get('http://localhost:3000/ical-events?guild=' + guild.name)
			.end(function(err, res) {
				expect(err).to.not.exist;
				done();
			})
		});

		it('should allow quering for multiple guilds', function(done) {
			superagent.get('http://localhost:3000/ical-events?guild=R&guild=' + guild.name)
			.end(function(err, res) {
				expect(err).to.not.exist;
				done();
			})
		});

		it('should reject incorrect guild parameters', function(done) {
			superagent.get('http://localhost:3000/ical-events?guild=Q')
			.end(function(err, res) {
				expect(err.status).to.eql(500);
				done();
			})
		});

		it('should return all events if no guild is specified');

		it('should put url in description', function(done) {
			superagent.get('http://localhost:3000/ical-events?guild=' + guild.name)
			.end(function(err, res) {
				expect(err).to.not.exist;
				expect(res.text).to.contain('DESCRIPTION:' + eventParams.url);
				done();
			})
		});

	});

});

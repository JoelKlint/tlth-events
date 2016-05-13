var superagent = require('superagent');
var expect = require('chai').expect;
var Guild = require('../models/guild.js');
var Event = require('../models/event.js');
var uniqueName = 'events-test';
var invalidEventId = new Event(eventParams).id;

var guildId;
var eventParams;

before(function(done) {
	superagent.post('http://localhost:3000/guilds')
	.send({ name: uniqueName })
	.end(function(err, res) {
		guildId = res.body._id;
		done();
	})
});

beforeEach(function(done){
	eventParams = {
		name: uniqueName,
		startDate: new Date(),
		endDate: new Date(),
		description: "test",
		location: 'test',
		url: 'www.test.com',
		guilds: [ guildId ]
	}
	done()
});

after(function(done) {
	superagent.del('http://localhost:3000/guilds/' + guildId)
	.then(function(res) {
		done();
	})
});

describe('/events', function() {

	describe('GET', function() {

		it('should return an json array', function(done) {
			superagent.get('http://localhost:3000/events')
			.end(function(err, res) {
				expect(res.status).to.eql(200);
				expect(res.type).to.eql('application/json');
				expect(res.body).to.be.an('Array');
				done();
			})
		});

	});

	describe('POST', function() {

		it('should require a name', function(done) {
			delete eventParams.name;
			superagent.post('http://localhost:3000/events')
			.send(eventParams)
			.end(function(err, res) {
				expect(err.status).to.eql(500);
				done();
			});
		});

		it('should require a start date', function(done) {
			delete eventParams.startDate;
			superagent.post('http://localhost:3000/events')
			.send(eventParams)
			.end(function(err, res) {
				expect(err.status).to.eql(500);
				done();
			});
		});

		it('should require an end date', function(done) {
			delete eventParams.endDate;
			superagent.post('http://localhost:3000/events')
			.send(eventParams)
			.end(function(err, res) {
				expect(err.status).to.eql(500);
				done();
			});
		});

		it('should require atleast one guild', function(done) {
			eventParams.guilds = [];
			superagent.post('http://localhost:3000/events')
			.send(eventParams)
			.end(function(err, res) {
				expect(err.status).to.eql(500);
				done();
			})
		});

		it('should only accept existing guilds', function(done) {
			eventParams.guilds = [ new Guild({ name: uniqueName }).id ];
			superagent.post('http://localhost:3000/events')
			.send(eventParams)
			.end(function(err, res) {
				expect(err.status).to.eql(500);
				done();
			});
		});

		it('should create an event given valid parameters', function(done) {
			superagent.post('http://localhost:3000/events')
			.send(eventParams)
			.end(function(err, res) {
				expect(err).to.not.exist;
				var event = res.body;
				expect(event.name).to.eql(eventParams.name);
				expect(new Date(event.startDate)).to.eql(eventParams.startDate);
				expect(new Date(event.endDate)).to.eql(eventParams.endDate);
				expect(event.description).to.eql(eventParams.description);
				expect(event.location).to.eql(eventParams.location);
				expect(event.url).to.eql(eventParams.url);
				var eventId = event._id;

				superagent.del('http://localhost:3000/events/' + eventId)
				.then(function(res) {
					done();
				})
			})
		});

	});

});

describe('/events/:event_id', function() {

	describe('GET', function() {

		it('should not accept nonexisting events', function(done) {
			superagent.get('http://localhost:3000/events/' + invalidEventId )
			.end(function(err, res) {
				expect(err.status).to.eql(500);
				done();
			})
		});

		it('should return the specified event', function(done) {
			superagent.post('http://localhost:3000/events')
			.send(eventParams)
			.then(function(res) {
				var eventId = res.body._id;

				superagent.get('http://localhost:3000/events/' + eventId )
				.end(function(err, res) {
					expect(err).to.not.exist;
					expect(res.body._id).to.eql(eventId);

					superagent.del('http://localhost:3000/events/' + eventId )
					.then(function(res) {
						expect(err).to.not.exist;
						done();
					})
				})
			})
		});

	});

	describe('PUT', function() {

		it('should reject invalid parameters', function(done) {
			superagent.put('http://localhost:3000/events/' + invalidEventId)
			.send(eventParams)
			.end(function(err, res) {
				expect(err.status).to.eql(500);
				done();
			})
		});

		it('should change the specified event');
		it('should return the event with the changed parameters');

	});

	describe('DELETE', function() {

		it('should not accept nonexisting events', function(done) {
			superagent.del('http://localhost:3000/events/' + invalidEventId )
			.end(function(err, res) {
				expect(err.status).to.eql(500);
				done();
			})
		});

		it('should remove the specified event', function(done) {
			superagent.post('http://localhost:3000/events')
			.send(eventParams)
			.then(function(res) {
				var eventId = res.body._id;

				superagent.del('http://localhost:3000/events/' + eventId )
				.end(function(err, res) {
					expect(err).to.not.exist;
					expect(res.body._id).to.eql(eventId);
					done();
				})
			})
		});
	});

});

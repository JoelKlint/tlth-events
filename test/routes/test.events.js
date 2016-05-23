import superagent from 'superagent';
import { expect } from 'chai';
import { Guild, Event } from '../../models';
import baseUrl from './index';
import moment from 'moment';

describe('/events', function() {

	let eventParams;
	before(function(done) {
		Guild.create({ name: "Test" })
		.then(guild => {
			eventParams = {
				name: "test",
				startDate: moment().toISOString(),
				endDate: moment().add(1, 'hour').toISOString(),
				description: "test",
				location: 'test',
				url: 'www.test.com',
				guilds: [ guild.id ]
			}
			done();
		})
		.catch(err => done(err));
	});

	after(function(done) {
		Event.remove({})
		.then(() => {
			return Guild.remove({})
		})
		.then(() => done())
		.catch(err => done(err))
	});

	describe('GET', function() {

		it('should return an json array', function(done) {
			superagent.get(baseUrl + '/events')
			.end((err, res) => {
				expect(res.status).to.eql(200);
				expect(res.type).to.eql('application/json');
				expect(res.body).to.be.an('Array');
				done();
			})
		});

	});

	describe('POST', function() {

		it('should require a name', function(done) {
			let params = Object.assign({}, eventParams);
			delete params.name;
			superagent.post(baseUrl + '/events')
			.send(params)
			.end((err, res) => {
				expect(err.status).to.eql(400);
				done();
			});
		});

		it('should require a start date', function(done) {
			let params = Object.assign({}, eventParams);
			delete params.startDate;
			superagent.post(baseUrl + '/events')
			.send(params)
			.end((err, res) => {
				expect(err.status).to.eql(400);
				done();
			});
		});

		it('should require an end date', function(done) {
			let params = Object.assign({}, eventParams);
			delete params.endDate;
			superagent.post(baseUrl + '/events')
			.send(params)
			.end((err, res) => {
				expect(err.status).to.eql(400);
				done();
			});
		});

		it('should require the end date to be after the start date');

		it('should require atleast one guild', function(done) {
			let params = Object.assign({}, eventParams)
			delete params.guilds;
			params.guilds = [];
			superagent.post(baseUrl + '/events')
			.send(params)
			.end((err, res) => {
				expect(err.status).to.eql(400);
				done();
			})
		});

		it('should only accept existing guilds', function(done) {
			// Create guild that does not exist in database
			let params = Object.assign({}, eventParams)
			delete params.guilds;
			params.guilds = [ new Guild({ name: "test" }).id ];
			superagent.post(baseUrl + '/events')
			.send(params)
			.end((err, res) => {
				expect(err.status).to.eql(400);
				done();
			});
		});

		it('should create an event given valid parameters', function(done) {
			superagent.post(baseUrl + '/events')
			.send(eventParams)
			.end((err, res) => {
				expect(err).to.not.exist;
				const event = res.body;
				expect(event.name).to.eql(eventParams.name);
				expect(event.startDate).to.eql(eventParams.startDate);
				expect(event.endDate).to.eql(eventParams.endDate);
				expect(event.description).to.eql(eventParams.description);
				expect(event.location).to.eql(eventParams.location);
				expect(event.url).to.eql(eventParams.url);
				done();
			})
		});

	});

});

describe('/events/:event_id', function() {

	let eventId;
	before(function(done) {
		Guild.create({ name: 'test' })
		.then(guild => {
			const eventParams = {
				name: "test",
				startDate: moment().toISOString(),
				endDate: moment().add(1, 'hour').toISOString(),
				description: "test",
				location: 'test',
				url: 'www.test.com',
				guilds: [ guild.id ]
			}
			return Event.create(eventParams)
		})
		.then(event => {
			eventId = event._id.toString();
			done();
		})
		.catch(err => done(err))
	});

	after(function(done) {
		Guild.remove({})
		.then(() => {
			return Event.remove({})
		})
		.then(() => done())
		.catch(err => done(err))
	})

	describe('GET', function() {

		it('should not accept nonexisting events', function(done) {
			superagent.get(baseUrl + '/events/' + 'invalid' )
			.end((err, res) => {
				expect(err.status).to.eql(400);
				done();
			})
		});

		it('should return the specified event', function(done) {
			superagent.get(baseUrl + '/events/' + eventId)
			.end((err, res) => {
				expect(err).to.not.exist;
				expect(res.body._id).to.eql(eventId);
				done();
			})
		});

	});

	describe('PUT', function() {

		it('should reject an invalid id', function(done) {
			superagent.put(baseUrl + '/events/' + 'invalid')
			.send({ name: 'Other name' })
			.end((err, res) => {
				expect(err.status).to.eql(400);
				done();
			})
		});

		it('should reject invalid parameters');
		it('should change the specified event');
		it('should return the event with the changed parameters');

	});

	describe('DELETE', function() {

		it('should not accept nonexisting events', function(done) {
			superagent.del(baseUrl + '/events/' + 'invalid' )
			.end((err, res) => {
				expect(err.status).to.eql(400);
				done();
			})
		});

		it('should remove the specified event', function(done) {
			superagent.del(baseUrl + '/events/' + eventId )
			.end((err, res) => {
				expect(err).to.not.exist;
				expect(res.body._id).to.eql(eventId);
				done();
			})
		});

	});

});

import superagent from 'superagent';
import { expect, assert } from 'chai';
import baseUrl from './index';
import moment from 'moment';
import * as testHelper from '../testHelper';
import _ from 'underscore';

describe('/events', function() {

	describe('GET', function() {

		before(function(done) {
			testHelper.createSavedEvent()
			.then(event => done())
			.catch(err => done(err))
		})

		after(function(done) {
			testHelper.clearDb(done);
		})

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

		describe('unauthenticated', function() {

			before(function(done) {
				testHelper.createSavedUser()
				.then(user => done())
				.catch(err => done(err))
			})

			after(function(done) {
				testHelper.clearDb(done);
			})

			it('should require an admin to be logged in', function(done) {
				superagent.post(baseUrl + '/events')
				.send()
				.end((err, res) => {
					expect(err).to.exist;
					expect(err.status).to.eql(401);
					done();
				})
			})

		})

		describe('authenticated', function() {

			let admin;
			let guild;
			before(function(done) {
				testHelper.createSavedAdmin()
				.then(savedAdmin => {
					admin = savedAdmin;
					return testHelper.createSavedGuild()
				})
				.then(savedGuild => {
					guild = savedGuild
					done()
				})
				.catch(err => done(err))
			})

			let eventData;
			beforeEach(function(done) {
				let event = testHelper.generateEventData(admin.admin, [ guild.id ]);
				eventData = event;
				done()
			})

			after(function(done) {
				testHelper.clearDb(done);
			})

			it('should require a name', function(done) {
				let params = _.omit(eventData, 'name');
				superagent.post(baseUrl + '/events')
				.send(params)
				.end((err, res) => {
					expect(err).to.exist;
					expect(err.status).to.eql(400);
					done();
				});
			});

			it('should require a start date', function(done) {
				let params = _.omit(eventData, 'startDate');
				superagent.post(baseUrl + '/events')
				.send(params)
				.end((err, res) => {
					expect(err).to.exist;
					expect(err.status).to.eql(400);
					done();
				});
			});

			it('should require an end date', function(done) {
				let params = _.omit(eventData, 'endDate');
				superagent.post(baseUrl + '/events')
				.send(params)
				.end((err, res) => {
					expect(err).to.exist;
					expect(err.status).to.eql(400);
					done();
				});
			});

			it('should require the end date to be after the start date');

			it('should require atleast one guild', function(done) {
				let params = _.omit(eventData, 'guilds');
				params.guilds = [];
				superagent.post(baseUrl + '/events')
				.send(params)
				.end((err, res) => {
					expect(err).to.exist;
					expect(err.status).to.eql(400);
					done();
				})
			});

			it('should only accept existing guilds', function(done) {
				let params = _.omit(eventData, 'guilds');
				const fakeId = testHelper.generateFakeDbId();
				params.guilds = [ fakeId ]
				superagent.post(baseUrl + '/events')
				.send(params)
				.end((err, res) => {
					expect(err).to.exist;
					expect(err.status).to.eql(400);
					done();
				});
			});

			it.skip('should require the admin\'s guild in the request', function(done) {
				let params = _.omit(eventData, 'guilds');
				testHelper.createSavedGuild()
				.then(guild => {
					params.guilds = [ guild.id ]
					superagent.post(baseUrl + '/events')
					.send(params)
					.end((err, res) => {
						expect(err).to.exist;
						expect(err.status).to.eql(400)
						done()
					})
				})
				.catch(err => done(err))
			})

			describe('on success', function(done) {

				beforeEach(function(done) {
					testHelper.removeAllEventsFromDb(done)
				})

				afterEach(function(done) {
					testHelper.removeAllEventsFromDb(done)
				})

				it('should be successful given valid parameters', function(done) {
					superagent.post(baseUrl + '/events')
					.send(eventData)
					.end((err, res) => {
						expect(err).to.not.exist;
						expect(res.status).to.eql(200);
						done();
					})
				});

				it('should automatically assign the logged in admin\'s guild as owner', function(done) {
					superagent.post(baseUrl + '/events')
					.send(eventData)
					.end((err, res) => {
						expect(err).to.not.exist;
						assert.equal(res.body.owner._id, eventData.owner)
						done();
					})
				});

				it('should return a populated event on success', function(done) {
					superagent.post(baseUrl + '/events')
					.send(eventData)
					.end((err, res) => {
						expect(err).to.not.exist;
						const event = res.body;
						assert.equal(event.name, eventData.name);
						assert.equal(event.startDate, eventData.startDate);
						assert.equal(event.endDate, eventData.endDate);
						assert.equal(event.description, eventData.description);
						assert.equal(event.location, eventData.location);
						assert.equal(event.url, eventData.url);
						assert.equal(res.body.owner._id, eventData.owner	);
						assert.equal(event.guilds.length, eventData.guilds.length);
						assert.equal(event.guilds[0]._id, eventData.guilds[0])
						done();
					})
				})

			})

		})

	});

});

describe('/events/:event_id', function() {

	describe('GET', function() {

		it('should not accept nonexisting events', function(done) {
			superagent.get(baseUrl + '/events/' + 'invalid' )
			.end((err, res) => {
				expect(err.status).to.eql(400);
				done();
			})
		});

		describe('on success', function() {

			let eventId;
			before(function(done) {
				testHelper.createSavedEvent()
				.then(event => {
					eventId = event.id
					done()
				})
				.catch(err => done(err))
			})

			after(function(done) {
				testHelper.clearDb(done);
			})

			it('should return the specified event', function(done) {
				superagent.get(baseUrl + '/events/' + eventId)
				.end((err, res) => {
					expect(err).to.not.exist;
					expect(res.body._id).to.eql(eventId);
					done();
				})
			});
		})

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

		describe('on success', function(done) {
			it('should change the specified event');
			it('should return the event with the changed parameters');
		})

	});

	describe('DELETE', function() {

		it('should not accept nonexisting events', function(done) {
			superagent.del(baseUrl + '/events/' + 'invalid' )
			.end((err, res) => {
				expect(err.status).to.eql(400);
				done();
			})
		});

		describe('on success', function(done) {

			let eventId;
			beforeEach(function(done) {
				testHelper.createSavedEvent()
				.then(event => {
					eventId = event.id
					done();
				})
				.catch(err => done(err))
			})

			after(function(done) {
				testHelper.clearDb(done);
			})

			it('should remove the specified event', function(done) {
				superagent.del(baseUrl + '/events/' + eventId )
				.end((err, res) => {
					expect(err).to.not.exist;
					expect(res.body._id).to.eql(eventId);
					done();
				})
			});
		})

	});

});

import superagent from 'superagent';
import { expect } from 'chai';
import { User, Guild, Event } from '../../models';
import baseUrl from './index';
import moment from 'moment';
import factory from '../factory';
import * as modelNames from '../../models/modelNames';
import { clearDb } from '../testHelper';

describe('/events', function() {

	describe('GET', function() {

		before(function(done) {
			factory.create(modelNames.Event)
			.then(event => done())
			.catch(err => done(err));
		})

		after(function(done) {
			clearDb(done);
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
				factory.create(modelNames.User)
				.then(user => done())
				.catch(err => done(err));
			})

			after(function(done) {
				clearDb(done);
			})

			it('should require an admin to be logged in', function(done) {
				superagent.post(baseUrl + '/events')
				.send({ test: 'test' })
				.end((err, res) => {
					expect(err).to.exist;
					expect(err.status).to.eql(401);
					done();
				})
			})

		})

		describe('authenticated', function() {

			let eventParams;
			before(function(done) {
				factory.create('Admin')
				.then(adminUser => {
					return factory.build(modelNames.Event, { guilds: adminUser.admin })
				})
				.then(eventData => {
					delete eventData._id
					eventParams = eventData;
					done();
				})
				.catch(err => done(err))
			})

			after(function(done) {
				clearDb(done);
			})

			it('should require a name', function(done) {
				let params = Object.assign({}, eventParams);
				delete params.name;
				superagent.post(baseUrl + '/events')
				.send(params)
				.end((err, res) => {
					expect(err).to.exist;
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
					expect(err).to.exist;
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
					expect(err).to.exist;
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
					expect(err).to.exist;
					expect(err.status).to.eql(400);
					done();
				})
			});

			it('should only accept existing guilds', function(done) {
				let params = Object.assign({}, eventParams)
				delete params.guilds;
				factory.build(modelNames.Guild)
				.then(guild => {
					params.guilds = [ factory.build(modelNames.Guild) ]
				})
				superagent.post(baseUrl + '/events')
				.send(params)
				.end((err, res) => {
					expect(err).to.exist;
					expect(err.status).to.eql(400);
					done();
				});
			});

			describe('on success', function(done) {

				afterEach(function(done) {
					Event.remove()
					.then(() => done())
					.catch(err => done(err))
				})

				it('should be successful given valid parameters', function(done) {
					superagent.post(baseUrl + '/events')
					.send(eventParams)
					.end((err, res) => {
						expect(err).to.not.exist;
						expect(res.status).to.eql(200);
						done();
					})
				})

				it('should return a populated event on success', function(done) {
					superagent.post(baseUrl + '/events')
					.send(eventParams)
					.end((err, res) => {
						expect(err).to.not.exist;
						const event = res.body;
						expect(event.name).to.eql(eventParams.name);
						expect(event.startDate).to.eql(eventParams.startDate.toISOString());
						expect(event.endDate).to.eql(eventParams.endDate.toISOString());
						expect(event.description).to.eql(eventParams.description);
						expect(event.location).to.eql(eventParams.location);
						expect(event.url).to.eql(eventParams.url);
						expect(event.guilds.length).to.eql(eventParams.guilds.length);
						expect(event.guilds[0]._id).to.eql(eventParams.guilds[0].id)
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
				factory.create(modelNames.Event)
				.then(event => {
					eventId = event.id
					done();
				})
				.catch(err => done(err))
			})

			after(function(done) {
				clearDb(done);
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
				factory.create(modelNames.Event)
				.then(event => {
					eventId = event.id;
					done()
				})
				.catch(err => done(err))
			})

			after(function(done) {
				clearDb(done);
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

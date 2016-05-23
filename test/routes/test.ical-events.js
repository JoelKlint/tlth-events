import superagent from 'superagent';
import { expect } from 'chai';
import { Guild, Event } from '../../models';
import baseUrl from './index';

describe('/ical-events', function() {

	describe('GET', function() {

		let createdGuild;
		let createdEvent

		before(function(done) {
			Guild.create({ name: 'test' })
			.then(guild => {
				createdGuild = guild;
				const eventParams = {
					name: 'test',
					location: 'test',
					startDate: new Date(),
					endDate: new Date(),
					description: 'test',
					url: 'www.test.com',
					guilds: [ guild._id ]
				}
				return Event.create(eventParams);
			})
			.then(event => {
				createdEvent = event;
				done();
			})
			.catch(err => done(err))
		})

		after(function(done) {
			Event.remove({})
			.then(() => {
				return Guild.remove({})
			})
			.then(() => done())
			.catch(err => done(err))
		})

		it('should return an ical feed', function(done) {
			superagent.get(baseUrl + '/ical-events?guild=' + createdGuild.name)
			.end((err, res) => {
				expect(err).to.not.exist;
				expect(res.type).to.eql('text/calendar');
				expect(res.text).to.contain('BEGIN:VCALENDAR');
				done();
			})
		});

		it('should allow quering for one guild', function(done) {
			superagent.get(baseUrl + '/ical-events?guild=' + createdGuild.name)
			.end((err, res) => {
				expect(err).to.not.exist;
				done();
			})
		});

		it('should allow quering for multiple guilds', function(done) {
			superagent.get(baseUrl + '/ical-events?guild=R&guild=' + createdGuild.name)
			.end((err, res) => {
				expect(err).to.not.exist;
				done();
			})
		});

		it('should reject incorrect guild parameters', function(done) {
			superagent.get(baseUrl + '/ical-events?guild=incorrectGuild')
			.end((err, res) => {
				expect(err.status).to.eql(400);
				done();
			})
		});

		it('should return all events if no guild is specified');

		it('should put url in description', function(done) {
			superagent.get(baseUrl + '/ical-events?guild=' + createdGuild.name)
			.end((err, res) => {
				expect(err).to.not.exist;
				expect(res.text).to.contain('DESCRIPTION:' + createdEvent.url);
				done();
			})
		});

	});

});

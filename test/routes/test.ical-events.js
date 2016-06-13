import superagent from 'superagent';
import { expect } from 'chai';
import baseUrl from './index';
import * as testHelper from '../testHelper';

describe('/ical-events', function() {

	describe('GET', function() {

		let existingEvent;
		let existingGuildName;
		before(function(done) {
			testHelper.createSavedEvent()
			.then(event => {
				existingEvent = event;
				return event.populate('guilds').execPopulate()
			})
			.then(populatedEvent => {
				existingGuildName = populatedEvent.guilds[0].name;
				done()
			})
			.catch(err => done(err))
		});

		after(function(done) {
			testHelper.clearDb(done);
		})


		it('should return an ical feed', function(done) {
			superagent.get(baseUrl + '/ical-events?guild=' + existingGuildName)
			.end((err, res) => {
				expect(err).to.not.exist;
				expect(res.type).to.eql('text/calendar');
				expect(res.text).to.contain('BEGIN:VCALENDAR');
				done();
			})
		});

		it('should allow quering for one guild', function(done) {
			superagent.get(baseUrl + '/ical-events?guild=' + existingGuildName)
			.end((err, res) => {
				expect(err).to.not.exist;
				done();
			})
		});

		it('should allow quering for multiple guilds', function(done) {
			superagent.get(baseUrl + '/ical-events?guild=R&guild=' + existingGuildName)
			.end((err, res) => {
				expect(err).to.not.exist;
				done();
			})
		});

		it('should reject incorrect guild parameters', function(done) {
			superagent.get(baseUrl + '/ical-events?guild=incorrectGuild')
			.end((err, res) => {
				expect(err).to.exist;
				expect(err.status).to.eql(400);
				done();
			})
		});

		it('should return all events if no guild is specified');

		it('should put url in description', function(done) {
			superagent.get(baseUrl + '/ical-events?guild=' + existingGuildName)
			.end((err, res) => {
				expect(err).to.not.exist;
				expect(res.text).to.contain('DESCRIPTION:' + existingEvent.url);
				done();
			})
		});

	});

});

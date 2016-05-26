import superagent from 'superagent';
import { expect } from 'chai';
import { Guild, Event } from '../../models';
import baseUrl from './index';
import factory from '../factory';
import * as modelNames from '../../models/modelNames';
import { clearDb } from '../testHelper';

describe('/ical-events', function() {

	describe('GET', function() {

		let guildName;
		let existingEvent;
		before(function(done) {
			factory.create(modelNames.Event)
			.then(event => {
				guildName = event.guilds[0].name
				existingEvent = event;
				done()
			})
			.catch(err => done(err));
		});

		after(function(done) {
			clearDb(done);
		})


		it('should return an ical feed', function(done) {
			superagent.get(baseUrl + '/ical-events?guild=' + guildName)
			.end((err, res) => {
				expect(err).to.not.exist;
				expect(res.type).to.eql('text/calendar');
				expect(res.text).to.contain('BEGIN:VCALENDAR');
				done();
			})
		});

		it('should allow quering for one guild', function(done) {
			superagent.get(baseUrl + '/ical-events?guild=' + guildName)
			.end((err, res) => {
				expect(err).to.not.exist;
				done();
			})
		});

		it('should allow quering for multiple guilds', function(done) {
			superagent.get(baseUrl + '/ical-events?guild=R&guild=' + guildName)
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
			superagent.get(baseUrl + '/ical-events?guild=' + guildName)
			.end((err, res) => {
				expect(err).to.not.exist;
				expect(res.text).to.contain('DESCRIPTION:' + existingEvent.url);
				done();
			})
		});

	});

});

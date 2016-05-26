import superagent from 'superagent';
import { expect } from 'chai';
import { Guild } from '../../models';
import baseUrl from './index';
import factory from '../factory';
import * as modelNames from '../../models/modelNames';
import { clearDb } from '../testHelper';

describe('/guilds', function() {

	describe('GET', function() {

		before(function(done) {
			factory.create(modelNames.Guild)
			.then(guild => done())
			.catch(err => done(err));
		})

		after(function(done) {
			clearDb(done);
		})

		it('should return an json array of guilds', function(done) {
			superagent.get(baseUrl + '/guilds')
			.end((err, res) => {
				expect(res.status).to.eql(200);
				expect(res.type).to.eql('application/json');
				expect(res.body).to.be.an('Array');
				expect(res.body.length).to.be.above(0);
				expect(res.body[0]).to.have.ownProperty('name');
				done();
			})
		});

	});

	describe('POST', function() {

		let guildParams;
		before(function(done) {
			factory.build(modelNames.Guild)
			.then(guildParams => {
				delete guildParams._id
				guildParams = guildParams;
				done();
			})
			.catch(err => done(err))
		})

		after(function(done) {
			clearDb(done);
		})

		it('should require a name', function(done) {
			const params = Object.assign({}, guildParams);
			delete params.name;
			superagent.post(baseUrl + '/guilds')
			.send(params)
			.end((err, res) => {
				expect(err.status).to.eql(400);
				done();
			})
		});

		it('should return the created guild given valid parameters', function(done) {
			superagent.post(baseUrl + '/guilds')
			.send({ name: 'uniqueName' })
			.end((err, res) => {
				expect(res.status).to.eql(200);
				// TEST IF THE GUILD WAS RETURNED HERE!!
				done();
			})
		});

		describe('uniqueness', function() {

			let existingGuild;
			before(function(done) {
				factory.create(modelNames.Guild)
				.then(guild => {
					existingGuild = guild;
					done();
				})
				.catch(err => done(err));
			})

			after(function(done) {
				clearDb(done);
			})

			it('should not allow an already existing name', function(done) {
				superagent.post(baseUrl + '/guilds')
				.send(guildParams)
				.end((err, res) => {
					expect(err).to.exist;
					done();
				});
			});

		})

	});

});

describe('/guilds/:guild_id', function() {

	describe('GET', function() {

		let guildId;
		before(function(done) {
			factory.create(modelNames.Guild)
			.then(guild => {
				guildId = guild.id;
				done();
			})
			.catch(err => done(err));
		})

		after(function(done) {
			clearDb(done);
		})

		it('should not accept nonexisting guilds', function(done) {
			superagent.get(baseUrl + '/guilds/' + 'invalidID' )
			.end((err, res) => {
				expect(err.status).to.eql(400);
				done();
			})
		});

		it('should return the specified guild', function(done) {
			superagent.get(baseUrl + '/guilds/' + guildId)
			.end((err, res) => {
				expect(err).not.to.exist;
				expect(res.body._id).to.eql(guildId);
				done();
			})
		});

	});

	describe('PUT', function() {

		let guildId;
		let newParams;
		before(function(done) {
			newParams = { name: 'new' }
			factory.create(modelNames.Guild)
			.then(guild => {
				guildId = guild.id;
				done();
			})
			.catch(err => done(err));
		})

		after(function(done) {
			clearDb(done);
		})

		it('should reject an invalid id', function(done) {
			superagent.put(baseUrl + '/guilds/' + 'invalidGuildId')
			// .send(guildParams)
			.end((err, res) => {
				expect(err.status).to.eql(400);
				done();
			})
		});

		it('should change the specified guild', function(done) {
			superagent.put(baseUrl + '/guilds/' + guildId)
			.send(newParams)
			.end((err, res) => {
				expect(err).to.not.exist;
				expect(res.body._id).to.eql(guildId);
				expect(res.body.name).to.eql(newParams.name);
				done();
			})
		});

	});

	describe('DELETE', function(done) {

		let existingGuild;
		beforeEach(function(done) {
			factory.create(modelNames.Guild)
			.then(guild => {
				existingGuild = guild;
				done();
			})
			.catch(err => done(err));
		})

		after(function(done) {
			clearDb(done);
		})

		it('should not accept nonexisting guilds', function(done) {
			superagent.del(baseUrl + '/guilds/' + 'invalidGuildId' )
			.end((err, res) => {
				expect(err.status).to.eql(400);
				done();
			})
		});

		it('should remove the specified guild', function(done) {
			superagent.del(baseUrl + '/guilds/' + existingGuild.id)
			.end((err, res) => {
				expect(err).not.to.exist;
				expect(res.body._id).to.eql(existingGuild.id);
				done();
			})
		});

	})

});

import superagent from 'superagent';
import { expect } from 'chai';
import baseUrl from './index';
import * as testHelper from '../testHelper';

describe('/guilds', function() {

	describe('GET', function() {

		before(function(done) {
			testHelper.createSavedGuild()
			.then( done() )
			.catch(err => done(err))
		})

		after(function(done) {
			testHelper.clearDb(done);
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
		beforeEach(function(done) {
			guildParams = testHelper.generateGuildData();
			done();
		})

		after(function(done) {
			testHelper.clearDb(done);
		})

		it('should require a name', function(done) {
			delete guildParams.name;
			superagent.post(baseUrl + '/guilds')
			.send(guildParams)
			.end((err, res) => {
				expect(err.status).to.eql(400);
				done();
			})
		});

		it('should return the created guild given valid parameters', function(done) {
			superagent.post(baseUrl + '/guilds')
			.send(guildParams)
			.end((err, res) => {
				expect(res.status).to.eql(200);
				expect(res.body.name).to.eql(guildParams.name)
				done();
			})
		});

		describe('uniqueness', function() {

			let existingGuild;
			before(function(done) {
				testHelper.createSavedGuild()
				.then(guild => {
					existingGuild = guild;
					done();
				})
				.catch(err => done(err))
			})

			after(function(done) {
				testHelper.clearDb(done);
			})

			it('should not allow an already existing name', function(done) {
				superagent.post(baseUrl + '/guilds')
				.send(existingGuild)
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

		let existingGuild;
		before(function(done) {
			testHelper.createSavedGuild()
			.then(createdGuild => {
				existingGuild = createdGuild;
				done();
			})
			.catch(err => done(err))
		})

		after(function(done) {
			testHelper.clearDb(done);
		})

		it('should not accept nonexisting guilds', function(done) {
			const invalidId = testHelper.generateFakeDbId();
			superagent.get(baseUrl + '/guilds/' + invalidId )
			.end((err, res) => {
				expect(err.status).to.eql(400);
				done();
			})
		});

		it('should return the specified guild', function(done) {
			superagent.get(baseUrl + '/guilds/' + existingGuild.id)
			.end((err, res) => {
				expect(err).not.to.exist;
				expect(res.body._id).to.eql(existingGuild.id);
				done();
			})
		});

	});

	describe('PUT', function() {

		let guild;
		let newParams;
		before(function(done) {
			testHelper.createSavedGuild()
			.then(createdGuild => {
				guild = createdGuild;
				newParams = testHelper.generateGuildData();
				done();
			})
			.catch(err => done(err))
		})

		after(function(done) {
			testHelper.clearDb(done);
		})

		it('should reject an invalid id', function(done) {
			const invalidId = testHelper.generateFakeDbId();
			superagent.put(baseUrl + '/guilds/' + invalidId)
			.send(newParams)
			.end((err, res) => {
				expect(err).to.exist;
				expect(err.status).to.eql(400);
				done();
			})
		});

		it('should change the specified guild', function(done) {
			superagent.put(baseUrl + '/guilds/' + guild.id)
			.send(newParams)
			.end((err, res) => {
				expect(err).to.not.exist;
				expect(res.body._id).to.eql(guild.id);
				expect(res.body.name).to.eql(newParams.name);
				done();
			})
		});

	});

	describe('DELETE', function(done) {

		let existingGuild;
		beforeEach(function(done) {
			testHelper.createSavedGuild()
			.then(guild => {
				existingGuild = guild;
				done();
			})
			.catch(err => done(err))
		})

		after(function(done) {
			testHelper.clearDb(done);
		})

		it('should not accept nonexisting guilds', function(done) {
			const invalidId = testHelper.generateFakeDbId();
			superagent.del(baseUrl + '/guilds/' + invalidId )
			.end((err, res) => {
				expect(err).to.exist;
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

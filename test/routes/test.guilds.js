import superagent from 'superagent';
import { expect } from 'chai';
import { Guild } from '../../models';
import baseUrl from './index';

describe('/guilds', function() {
	let existingGuild;
	let existingGuildParams;
	before(function(done) {
		existingGuildParams = { name: 'test' };
		Guild.create(existingGuildParams)
		.then(guild => {
			existingGuild = guild;
			done();
		})
	})

	after(function(done) {
		Guild.remove({}).then(() => done());
	})

	describe('GET', function() {

		it('should return an json array of guilds', function(done) {
			superagent.get(baseUrl + '/guilds')
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
			const params = Object.assign({}, existingGuildParams);
			delete params.name;
			superagent.post(baseUrl + '/guilds')
			.send(params)
			.end(function(err, res) {
				expect(err.status).to.eql(500);
				done();
			})
		});

		it('should return the created guild given valid parameters', function(done) {
			superagent.post(baseUrl + '/guilds')
			.send({ name: 'uniqueName' })
			.end(function(err, res) {
				expect(res.status).to.eql(200);
				// TEST IF THE GUILD WAS RETURNED HERE!!
				done();
			})
		});

		it('should not allow an already existing name', function(done) {
			superagent.post(baseUrl + '/guilds')
			.send(existingGuildParams)
			.end(function(err, res) {
				expect(err).to.exist;
				done();
			});
		});

	});

});

describe('/guilds/:guild_id', function() {
	let guildId;
	before(function(done) {
		Guild.create({ name: 'test' }).then(guild => {
			guildId = guild.id;
			done()
		})
	});

	after(function(done) {
		Guild.remove({}).then(() => done());
	})

	describe('GET', function() {

		it('should not accept nonexisting guilds', function(done) {
			superagent.get(baseUrl + '/guilds/' + 'invalidID' )
			.end(function(err, res) {
				expect(err.status).to.eql(500);
				done();
			})
		});

		it('should return the specified guild', function(done) {
			superagent.get(baseUrl + '/guilds/' + guildId)
			.end(function(err, res) {
				expect(err).not.to.exist;
				expect(res.body._id).to.eql(guildId);
				done();
			})
		});

	});

	describe('PUT', function() {

		let guildParams;
		before(function(done) {
			guildParams = { name: 'new name' };
			done();
		})

		it('should reject an invalid id', function(done) {
			superagent.put(baseUrl + '/guilds/' + 'invalidGuildId')
			.send(guildParams)
			.end(function(err, res) {
				expect(err.status).to.eql(500);
				done();
			})
		});

		it('should change the specified guild', function(done) {
			superagent.put(baseUrl + '/guilds/' + guildId)
			.send(guildParams)
			.end(function(err, res) {
				expect(err).to.not.exist;
				expect(res.body._id).to.eql(guildId);
				expect(res.body.name).to.eql(guildParams.name);
				done();
			})
		});

	});

	describe('DELETE', function(done) {

		it('should not accept nonexisting guilds', function(done) {
			superagent.del(baseUrl + '/guilds/' + 'invalidGuildId' )
			.end(function(err, res) {
				expect(err.status).to.eql(500);
				done();
			})
		});

		it('should remove the specified guild', function(done) {
			superagent.del(baseUrl + '/guilds/' + guildId)
			.end(function(err, res) {
				expect(err).not.to.exist;
				expect(res.body._id).to.eql(guildId);
				done();
			})
		});

	})

});

var superagent = require('superagent');
var expect = require('chai').expect;
var Guild = require('../models/guild.js');
var uniqueName = 'guilds-test';

describe('/guilds', function() {

	describe('GET', function() {
		var guildId;

		before(function(done) {
			superagent.post('http://localhost:3000/guilds')
			.send({ name: uniqueName })
			.end(function(err, res) {
				guildId = res.body._id;
				done();
			})
		});

		it('should return an json array of guilds', function(done) {
			superagent.get('http://localhost:3000/guilds')
			.end(function(err, res) {
				expect(res.status).to.eql(200);
				expect(res.type).to.eql('application/json');
				expect(res.body).to.be.an('Array');
				expect(res.body[0]).to.include.keys('name');
				done();
			})
		});

		after(function(done) {
			superagent.del('http://localhost:3000/guilds/' + guildId)
			.end(function(err, res) {
				done();
			})
		});

	});

	describe('POST', function() {
		var guildParams;

		beforeEach(function(done) {
			guildParams = { name: uniqueName };
			done();
		})

		it('should require a name', function(done) {
			guildParams.name = '';
			superagent.post('http://localhost:3000/guilds')
			.send(guildParams)
			.end(function(err, res) {
				expect(err.status).to.eql(500);
				done();
			})
		});

		it('should accept valid parameters', function(done) {
			superagent.post('http://localhost:3000/guilds')
			.send(guildParams)
			.then(function(res) {
				expect(res.status).to.eql(200);
				var guildId = res.body._id;

				// Clean up
				superagent.del('http://localhost:3000/guilds/' + guildId)
				.then(function(res) {
					done();
				})
			})
		});

		it('should not allow an already existing name', function(done) {

			superagent.post('http://localhost:3000/guilds')
			.send(guildParams)
			.then(function(res) {
				var guildId = res.body._id;

				// Create a duplicate
				superagent.post('http://localhost:3000/guilds')
				.send(guildParams)
				.then(null, function(err) {

					// Clean up
					superagent.del('http://localhost:3000/guilds/' + guildId)
					.then(function(res) {
						done();
					});
				});
			});

		});

	});

});

describe('/guilds/:guild_id', function() {
	var guildParams;
	var invalidGuildId;

	before(function(done) {
		guildParams = { name: uniqueName };
		invalidGuildId = new Guild(guildParams).id;
		done();
	});

	describe('GET', function() {

		it('should not accept nonexisting guilds', function(done) {
			superagent.get('http://localhost:3000/guilds/' + invalidGuildId )
			.end(function(err, res) {
				expect(err.status).to.eql(500);
				done();
			})
		});

		it('should return the specified guild', function(done) {
			superagent.post('http://localhost:3000/guilds')
			.send(guildParams)
			.end(function(err, res) {
				expect(err).not.to.exist;
				var guildId = res.body._id;

				superagent.get('http://localhost:3000/guilds/' + guildId)
				.end(function(err, res) {
					expect(err).not.to.exist;
					expect(res.body.name).to.eql(guildParams.name);

					// Clean up
					superagent.del('http://localhost:3000/guilds/' + guildId)
					.then(function(res) {
						done();
					})
				})
			})
		});

	});

	describe('PUT', function() {

		it('should reject invalid parameters', function(done) {
			superagent.put('http://localhost:3000/guilds/' + invalidGuildId)
			.send(guildParams)
			.end(function(err, res) {
				expect(err.status).to.eql(500);
				done();
			})
		});

		it('should change the specified guild', function(done) {
			superagent.post('http://localhost:3000/guilds')
			.send(guildParams)
			.then(function(res) {
				var guild = res.body;

				superagent.put('http://localhost:3000/guilds/' + guild._id)
				.send({ name: 'new name' })
				.end(function(err, res) {
					expect(err).to.not.exist;
					expect(res.body._id).to.eql(guild._id);
					expect(res.body.name).to.eql(guildParams.name);

					superagent.del('http://localhost:3000/guilds/' + guild._id)
					.then(function(res) {
						done();
					})
				})
			})
		});

	});

	describe('DELETE', function(done) {

		it('should not accept nonexisting guilds', function(done) {
			superagent.del('http://localhost:3000/guilds/' + invalidGuildId )
			.end(function(err, res) {
				expect(err.status).to.eql(500);
				done();
			})
		});

		it('should remove the specified guild', function(done) {
			superagent.post('http://localhost:3000/guilds')
			.send(guildParams)
			.then(function(res) {
				var guildId = res.body._id;

				superagent.del('http://localhost:3000/guilds/' + guildId)
				.end(function(err, res) {
					expect(err).not.to.exist;
					expect(res.body.name).to.eql(guildParams.name);
					done();
				})
			})
		});

	})

});

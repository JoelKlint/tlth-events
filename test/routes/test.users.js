import superagent from 'superagent';
import { expect } from 'chai';
import { User, Guild } from '../../models';
import baseUrl from './index';

describe('/users', function() {

	describe('POST /admin/:user_id', function() {

		let userId;
		let guildId;
		/**
		 * Store a user in database before tests
		 */
		before(function(done) {
			User.create({ username: 'test' })
			.then(user => {
				userId = user.id;
				return Guild.create({ name: 'test' })
			})
			.then(guild => {
				guildId = guild.id;
				done();
			})
			.catch(err => done(err))
		});

		after(function(done) {
			User.remove({})
			.then(() => {
				return Guild.remove({})
			})
			.then(() => done())
			.catch(err => done(err))
		})

		it('should deny an invalid guildId', function(done) {
			const params = { guildId: 'invalid guild' }
			superagent.post(baseUrl + '/users/admin/' + userId)
			.send(params)
			.end((err, res) => {
				expect(err.status).to.eql(400);
				done();
			})
		});

		it('should return the updated user on success', function(done) {
			superagent.post(baseUrl + '/users/admin/' + userId)
			.send({ guildId: guildId })
			.end((err, res) => {
				expect(err).to.not.exist;
				expect(res.body.admin._id).to.eql(guildId);
				done();
			})
		});

	})

})

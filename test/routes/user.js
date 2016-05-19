import superagent from 'superagent';
import { expect } from 'chai';
import { User, Guild } from '../../models';

let createdUser;

describe('/users', function() {

	describe('POST /admin/:user_id', function() {

		/**
		 * Store a user in database before tests
		 */
		before(function(done) {
			User.create({ username: 'test' })
			.then((user) => {
				createdUser = user;
				done();
			})
		});

		it('should deny an invalid guildId', function(done) {
			const params = { guildId: 'invalid guild' }
			superagent.post('http://localhost:3000/api/users/admin/' + createdUser._id)
			.send(params)
			.end((err, res) => {
				expect(err.status).to.eql(500);
				done();
			})
		});

		it('should return the updated user on success', function(done) {
			Guild.create({ name: 'Test' })
			.then((guild) => {
				// Must be converted to string since string is returned from API
				const guildId = guild._id.toString();
				superagent.post('http://localhost:3000/api/users/admin/' + createdUser._id)
				.send({ guildId: guildId })
				.end((err, res) => {
					expect(err).to.not.exist;
					const user = res.body;
					expect(user.admin._id).to.eql(guildId);
					done();
				})
			})
		});

	})

})

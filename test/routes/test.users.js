import superagent from 'superagent';
import { expect } from 'chai';
import baseUrl from './index';
import * as testHelper from '../testHelper'

describe('/users', function() {

	describe('POST /admin/:user_id', function() {

		let existingUser;
		let existingGuild;
		before(function(done) {
			testHelper.createSavedGuild()
			.then(guild => {
				existingGuild = guild;
				return testHelper.createSavedUser()
			})
			.then(user => {
				existingUser = user;
				done()
			})
			.catch(err => done(err))
		})

		after(function(done) {
			testHelper.clearDb(done);
		})

		it('should deny an invalid guildId', function(done) {
			const fakeId = testHelper.generateFakeDbId();
			const params = { guildId: fakeId }
			superagent.post(baseUrl + '/users/admin/' + existingUser.id)
			.send(params)
			.end((err, res) => {
				expect(err).to.exist;
				expect(err.status).to.eql(400);
				done();
			})
		});

		it('should return the updated user on success', function(done) {
			const params = { guildId: existingGuild.id }
			superagent.post(baseUrl + '/users/admin/' + existingUser.id)
			.send(params)
			.end((err, res) => {
				expect(err).to.not.exist;
				expect(res.body.admin._id).to.eql(existingGuild.id);
				done();
			})
		});

	})

})

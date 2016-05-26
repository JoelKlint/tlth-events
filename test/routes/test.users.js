import superagent from 'superagent';
import { expect } from 'chai';
import { User, Guild } from '../../models';
import baseUrl from './index';
import factory from '../factory';
import * as modelNames from '../../models/modelNames';
import { clearDb } from '../testHelper';

describe('/users', function() {

	describe('POST /admin/:user_id', function() {

		let userId;
		let guildId;
		before(function(done) {
			factory.create(modelNames.User)
			.then(user => {
				userId = user.id;
				return factory.create(modelNames.Guild);
			})
			.then(guild => {
				guildId = guild.id;
				done();
			})
			.catch(err => done(err));
		})

		after(function(done) {
			clearDb(done);
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

import { Event, Guild, User } from '../models';

export const clearDb = (callback) => {
	Event.remove({})
	.then(() => {
		return Guild.remove({});
	})
	.then(() => {
		return User.remove({});
	})
	.then(() => callback())
	.catch(err => callback(err));
}

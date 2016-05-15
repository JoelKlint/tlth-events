import express from 'express';

// Api routes
import eventRoutes from './api/events';
import icalEventRoutes from './api/icalEvents';
import userRoutes from './api/users';
import guildRoutes from './api/guilds';

export const applyApiRoutes = (app) => {
	const router = express.Router();
	router.use('/events', eventRoutes);
	router.use('/ical-events', icalEventRoutes);
	router.use('/users', userRoutes);
	router.use('/guilds', guildRoutes);

	app.use('/api', router);
}

// App routes
import appRoutes from './app';

export const applyAppRoutes = (app) => {
	app.use('/', appRoutes);
}

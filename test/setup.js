// Remove logging from console
import winston from 'winston';
winston.remove(winston.transports.Console);

// Create mock database
import mockgoose from 'mockgoose';
import mongoose from 'mongoose';
import server from '../server/server';
mockgoose(mongoose).then(() => {
	mongoose.connect('mock-database');
	// Start server
	server.listen(4000);
});

// Import all tests in order to run them
import './routes';

// Remove logging from console
import winston from 'winston';
winston.remove(winston.transports.Console);

// Create mock database
import mockgoose from 'mockgoose';
import mongoose from 'mongoose';
mockgoose(mongoose).then(() => {
	mongoose.connect('mock-database');
})

// Setup server so we can test against something
import '../server/server';

// Import all tests in order to run them
import './routes';

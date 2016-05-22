// Remove logging from console
import winston from 'winston';
winston.remove(winston.transports.Console);

// Connect to test database
import mongoose from 'mongoose';
mongoose.connect('mongodb://firefox:firefox@ds025782.mlab.com:25782/tlth-events-test');

// Clear database before tests
import { Event, Guild, User } from '../models';
Event.remove({}).exec();
Guild.remove({}).exec();
User.remove({}).exec();

// Setup server so we can test against something
import '../server/server';

// Import all tests in order to run them
import './routes';

// Remove logging from console
import winston from 'winston';
winston.remove(winston.transports.Console);

// Import all tests in order to run them
import './routes';

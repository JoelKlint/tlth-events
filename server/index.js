import server from './server';
import winston from 'winston';

// Connect to Server Database
import mongoose from 'mongoose';
const port = 3000;
const dbUri = 'mongodb://firefox:firefox@ds013260.mlab.com:13260/tlth-events-server';
mongoose.connect(dbUri,	(err) => {
	if(err) {
		winston.warn('Could not connect to database: ' + dbUri)
		process.exit();
	}
	// Start server
	server.listen(port);
	winston.info('Server is listening on port ' + port);
});

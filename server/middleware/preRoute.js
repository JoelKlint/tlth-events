import bodyParser from 'body-parser';
import session from 'express-session';
import winston from 'winston';

const apply = (app) => {
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	app.use(function(req, res, next) {
		const time = new Date();
		winston.info();
		winston.info('-------------------');
		winston.info(time.toString());
		winston.info(req.ip);
		winston.info(req.method + ' ' + req.originalUrl);
		next();
	})

	app.use(session({
		secret: 'super secret key',
		resave: false,
		saveUninitialized: true
	}));
};

export default apply;

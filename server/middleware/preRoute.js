import bodyParser from 'body-parser';
import session from 'express-session';

const apply = (app) => {
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	app.use(function(req, res, next) {
		const time = new Date();
		console.log(time.toString());
		console.log(req.ip);
		console.log(req.method + ' ' + req.originalUrl);
		console.log();
		next();
	})

	app.use(session({
		secret: 'super secret key',
		resave: false,
		saveUninitialized: true
	}));
};

export default apply;

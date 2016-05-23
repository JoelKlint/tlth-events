import winston from 'winston';
const errorHandler = (err, req, res, next) => {
	winston.error(err);

	let errorCode = 400;
	let errorMessage = [];

	switch(err.name) {
		case 'UnauthorizedError': {
			errorCode = 401;
			errorMessage = err.message
			break;
		}
		case 'ParameterError': {
			errorMessage = err.message;
			break;
		}
		case 'ValidationError': {
			if(Object.keys(err.errors).length > 1) {
				for( var key in err.errors ) {
					const path = err.errors[key].path;
					const kind = err.errors[key].kind;
					errorMessage.push(path + ' is ' + kind);
				}
			}
			else {
				for( var key in err.errors ) {
					const path = err.errors[key].path;
					const kind = err.errors[key].kind;
					errorMessage = path + ' is ' + kind;
				}
			}
			break;
		}
		case 'MongoError': {
			if(err.code === 11000) {
				errorMessage = 'Already exist';
			}
			break;
		}
		case 'CastError': {
			errorMessage = err.value + ' is of invalid type';
			break;
		}
		default: {
			errorCode = 500;
			errorMessage = 'Unknown error';
			break;
		}
	}
	res.status(errorCode).json( { error: errorMessage } );
}

export default errorHandler;

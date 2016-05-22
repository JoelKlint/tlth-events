import winston from 'winston';
const errorHandler = (err, req, res, next) => {
	winston.error(err);

	const errorMessage = [];

	switch(err.name) {
		case 'ParameterError': {
			errorMessage.push(err.message);
			break;
		}
		case 'ValidationError': {
			for( var key in err.errors ) {
				errorMessage.push(err.errors[key].message);
			}
			break;
		}
		case 'MongoError': {
			if(err.code === 11000) {
				errorMessage.push('Already exist');
			}
			break;
		}
		case 'CastError': {
			errorMessage.push(err.value + ' is of invalid type');
			break;
		}
		default: {
			errorMessage.push('Unknown error');
			break;
		}
	}
	res.status(500).json( { error: errorMessage } );
}

export default errorHandler;

import winston from 'winston';
const errorHandler = (err, req, res, next) => {
	winston.error(err);

	let errorCode = 400;
	let errorMessage = [];

	switch(err.name) {
    case 'SequelizeValidationError': {
      errorMessage = err.message
      break;
    }
    case 'DoesNotExistError': {
      errorCode = err.errorCode
      errorMessage = err.message
      break;
    }
		case 'UnauthorizedError': {
			errorCode = err.errorCode
			errorMessage = err.message
			break;
		}
		case 'ParameterError': {
      errorCode = err.errorCode
			errorMessage = err.message;
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

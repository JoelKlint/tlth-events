var ValidationError = require('mongoose').Error.ValidationError;
var ParameterError = require('./ParameterError.js');
// var MongoError = require('mongodb-core').MongoError;
var CastError = require('mongoose').Error.CastError;

var errorHandler = function(err, req, res, next) {
	console.log(err);

	var errorMessage = [];
	if(err instanceof ValidationError ) {
		for( var key in err.errors ) {
			errorMessage.push(err.errors[key].message);
		}
	}
	else if (err instanceof ParameterError) {
		errorMessage.push(err.message);
	}
	// else if (err instanceof MongoError && err.code === 11000) {
	// 	errorMessage = 'Already exist';
	// }
	else if (err instanceof CastError) {
		errorMessage.push(err.value + ' is of invalid type');
	}
	else {
		errorMessage = 'Unknown error';
	}
	console.log();
	res.status(500).json( { error: errorMessage } );
};

module.exports = errorHandler;

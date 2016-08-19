function ParameterError(message) {
	this.message = message
}
ParameterError.prototype = Object.create(Error.prototype);
ParameterError.prototype.name = 'ParameterError';
ParameterError.prototype.errorCode = 400

export default ParameterError;

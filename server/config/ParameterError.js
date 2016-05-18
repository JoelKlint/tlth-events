function ParameterError(message) {
	this.message = message
}
ParameterError.prototype = Object.create(Error.prototype);
ParameterError.prototype.name = 'ParameterError';

export default ParameterError;

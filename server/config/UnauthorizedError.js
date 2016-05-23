function UnauthorizedError() {
	this.message = 'Unauthorized'
}
UnauthorizedError.prototype = Object.create(Error.prototype);
UnauthorizedError.prototype.name = 'UnauthorizedError';

export default UnauthorizedError;

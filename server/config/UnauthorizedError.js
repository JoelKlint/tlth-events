function UnauthorizedError() {
	this.message = 'Unauthorized'
}
UnauthorizedError.prototype = Object.create(Error.prototype);
UnauthorizedError.prototype.name = 'UnauthorizedError';
UnauthorizedError.prototype.errorCode = 401

export default UnauthorizedError;

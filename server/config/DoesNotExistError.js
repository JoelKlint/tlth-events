function DoesNotExistError() {
  this.message = 'Entity does not exist'
}
DoesNotExistError.prototype = Object.create(Error.prototype);
DoesNotExistError.prototype.name = 'DoesNotExistError';
DoesNotExistError.prototype.errorCode = 404

export default DoesNotExistError;

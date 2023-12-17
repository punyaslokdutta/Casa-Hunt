function errorHandler(statusCode, message) {
  var error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
}

module.exports = errorHandler;
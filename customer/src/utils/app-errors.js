const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

class AppError extends Error {
  // name,statusCode,description, isOperational, errorStack, logingErrorResponse
  constructor(
    name,
    statusCode,
    description,
    isOperational,
    errorStack,
    logingErrorResponse,
  ) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errorStack = errorStack;
    this.logingErrorResponse = logingErrorResponse;
    Error.captureStackTrace(this);
  }
}

// api specific errors
export class APIError extends AppError {
  constructor(
    name,
    statusCode = STATUS_CODES.INTERNAL_SERVER_ERROR,
    description = "Internal Server Error",
    isOperational = true,
  ) {
    super(name, statusCode, description, isOperational);
  }
}

// bad request error
export class BadRequestError extends APIError {
  constructor(
    description = "Bad Request",
    statusCode = STATUS_CODES.BAD_REQUEST,
    loggingErrorResponse,
  ) {
    super(
      "Not Found",
      STATUS_CODES.BAD_REQUEST,
      description,
      true,
      false,
      loggingErrorResponse,
    );
  }
}

// 400 - Validation Error
export class ValidationError extends APIError {
  constructor(description = "Validation Error", errorStack) {
    super(
      "Bad Request",
      STATUS_CODES.BAD_REQUEST,
      description,
      true,
      errorStack,
    );
  }
}

export { AppError, APIError, BadRequestError, ValidationError, STATUS_CODES };

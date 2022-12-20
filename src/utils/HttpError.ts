class HttpError {
  status: number;
  message: string;
  error: string;

  constructor(status: number, message: string, error: string) {
    this.status = status;
    this.message = message;
    this.error = error;
  }

  static badRequest(message: string = "Bad request!") {
    return new HttpError(400, message, "Bad request!");
  }

  static toManyRequest(message: string = "Too many request!") {
    return new HttpError(429, message, "Too many request!");
  }

  static unauthorized(message: string = "Unauthorized!") {
    return new HttpError(401, message, "Unauthorized!");
  }

  static forbidden(message: string = "Forbidden!") {
    return new HttpError(403, message, "Forbidden!");
  }

  static notFound(message: string = "Not found!") {
    return new HttpError(404, message, "Not found!");
  }

  static internalServerError(
    message: string = "Something went wrong at our side, please try again later!"
  ) {
    return new HttpError(500, message, "Internal server error!!");
  }

  static notImplemented(message: string = "Not implemented!") {
    return new HttpError(501, message, "Not implemented!");
  }

  static unprocessableEntity(message: string = "Unprocessable entity!") {
    return new HttpError(422, message, "Unprocessable entity!");
  }
}

export default HttpError;
